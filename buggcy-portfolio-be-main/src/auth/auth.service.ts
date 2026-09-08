import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { MailService } from "../mail/mail.service";
import type {
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from "./dto/auth.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException("Invalid credentials");
    if (!user.isActive) throw new UnauthorizedException("Account is disabled");

    const valid = await user.validatePassword(dto.password);
    if (!valid) throw new UnauthorizedException("Invalid credentials");

    return this.buildTokenResponse(user);
  }

  async getProfile(user: User) {
    return user;
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(dto.email);
    // Always return success to prevent email enumeration
    if (!user) {
      return {
        message:
          "If an account exists with this email, you will receive a password reset link.",
      };
    }

    const resetToken = this.jwtService.sign(
      { sub: user.id, email: user.email, purpose: "password-reset" },
      { expiresIn: "15m" },
    );

    const frontendUrl = this.config.get<string>(
      "FRONTEND_URL",
      "http://localhost:5173",
    );
    const resetUrl = `${frontendUrl}/admin/reset-password?token=${resetToken}`;

    try {
      await this.mailService.sendPasswordResetEmail(user.email, resetUrl);
    } catch (error) {
      // Log error but don't reveal to user (security: prevent email enumeration)
      console.error(`Failed to send reset email to ${user.email}:`, error);
    }

    return {
      message:
        "If an account exists with this email, you will receive a password reset link.",
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    let payload: { sub: string; email: string; purpose: string };
    try {
      payload = this.jwtService.verify(dto.token) as {
        sub: string;
        email: string;
        purpose: string;
      };
    } catch {
      throw new BadRequestException("Invalid or expired reset token");
    }

    if (payload.purpose !== "password-reset") {
      throw new BadRequestException("Invalid reset token");
    }

    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new BadRequestException("Invalid reset token");
    }

    await this.usersService.updatePassword(user.id, dto.newPassword);

    return {
      message:
        "Password reset successful. You can now log in with your new password.",
    };
  }

  private buildTokenResponse(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      tokenType: "Bearer",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      },
    };
  }
}
