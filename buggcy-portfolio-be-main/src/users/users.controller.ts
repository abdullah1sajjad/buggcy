import {
  Controller, Get, Post, Put, Delete, Patch,
  Body, Param, Query, UseGuards, ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import type { CreateUserDto, UpdateUserDto, ChangePasswordDto, UserFilterDto } from './dto/user.dto';
import {
  CreateUserSchema,
  UpdateUserSchema,
  ChangePasswordSchema,
  UserFilterSchema,
} from './schemas/user.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/enums/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { PERMISSION_MODULES } from '../common/enums/permission-module.enum';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create user [ADMIN]' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name:     { type: 'string', example: 'John Doe' },
        email:    { type: 'string', example: 'john@company.com' },
        password: { type: 'string', example: 'Pass@1234' },
        role:     { type: 'string', enum: ['admin', 'hr', 'bd'], example: 'hr' },
        permissions: {
          type: 'array',
          items: { type: 'string', enum: [...PERMISSION_MODULES] },
          example: ['blogs', 'careers'],
        },
      },
    },
  })
  create(
    @Body(new ZodValidationPipe(CreateUserSchema)) dto: CreateUserDto,
  ) {
    return this.usersService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users [ADMIN]' })
  findAll(
    @Query(new ZodValidationPipe(UserFilterSchema)) filters: UserFilterDto,
  ) {
    return this.usersService.findAll(filters);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get user by id [ADMIN]' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update user [ADMIN]' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name:     { type: 'string', example: 'John Doe' },
        email:    { type: 'string', example: 'john@company.com' },
        password: { type: 'string', example: 'NewPass@1234' },
        role:     { type: 'string', enum: ['admin', 'hr', 'bd'], example: 'hr' },
        permissions: {
          type: 'array',
          items: { type: 'string', enum: [...PERMISSION_MODULES] },
          example: ['blogs', 'careers'],
        },
      },
    },
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateUserSchema)) dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto);
  }

  @Patch(':id/change-password')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Change user's password [ADMIN]" })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['currentPassword', 'newPassword'],
      properties: {
        currentPassword: { type: 'string', example: 'OldPass@123' },
        newPassword:     { type: 'string', example: 'NewPass@123' },
      },
    },
  })
  changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(ChangePasswordSchema)) dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(id, dto);
  }

  @Patch(':id/toggle-active')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Toggle user active status [ADMIN]' })
  toggleActive(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.toggleActive(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete user [ADMIN]' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
