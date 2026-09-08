import { Controller, Get, Patch, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { SettingsService } from "./settings.service";
import type { UpdateSiteSettingDto } from "./dto/site-setting.dto";
import { UpdateSiteSettingSchema } from "./schemas/site-setting.schema";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../common/enums/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { RequireModule } from "../common/enums/module.decorator";
import { PermissionsGuard } from "../auth/guards/permissions.guard";

@ApiTags("Settings")
@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // ── Public: used by footer/navbar/contact page on the website ──
  @Get("public")
  @ApiOperation({ summary: "Get application settings (public)" })
  findPublic() {
    return this.settingsService.getSettings();
  }

  // ── ADMIN/HR: used by the admin settings page ──
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("settings")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get application settings [ADMIN, HR, BD]" })
  findOne() {
    return this.settingsService.getSettings();
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("settings")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update application settings [ADMIN, HR, BD]" })
  update(
    @Body(new ZodValidationPipe(UpdateSiteSettingSchema))
    dto: UpdateSiteSettingDto,
  ) {
    return this.settingsService.updateSettings(dto);
  }
}
