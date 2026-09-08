import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { SiteIndustriesService } from "./site-industries.service";
import type { CreateIndustryDto, UpdateIndustryDto, IndustryFilterDto } from "./dto/industry.dto";
import {
  CreateIndustrySchema,
  UpdateIndustrySchema,
  IndustryFilterSchema,
} from "./schemas/industry.schema";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../common/enums/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { RequireModule } from "../common/enums/module.decorator";
import { PermissionsGuard } from "../auth/guards/permissions.guard";

@ApiTags("Site Industries")
@Controller("site-industries")
export class SiteIndustriesController {
  constructor(private readonly industriesService: SiteIndustriesService) {}

  @Get("public")
  @ApiOperation({ summary: "Get all industries (public)" })
  findAllPublic() {
    return this.industriesService.findAllPublic();
  }

  @Get("public/slug/:slug")
  @ApiOperation({ summary: "Get industry by slug (public)" })
  findBySlug(@Param("slug") slug: string) {
    return this.industriesService.findBySlug(slug);
  }

  @Get("public/:id")
  @ApiOperation({ summary: "Get industry by id (public)" })
  findOnePublic(@Param("id", ParseUUIDPipe) id: string) {
    return this.industriesService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("industries")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all industries [ADMIN, HR]" })
  findAll(
    @Query(new ZodValidationPipe(IndustryFilterSchema)) filters: IndustryFilterDto,
  ) {
    return this.industriesService.findAll(filters);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("industries")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get industry by id [ADMIN, HR, BD]" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.industriesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("industries")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create industry [ADMIN, HR, BD]" })
  create(
    @Body(new ZodValidationPipe(CreateIndustrySchema)) dto: CreateIndustryDto,
  ) {
    return this.industriesService.create(dto);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("industries")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update industry [ADMIN, HR, BD]" })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateIndustrySchema)) dto: UpdateIndustryDto,
  ) {
    return this.industriesService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("industries")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete industry [ADMIN, HR, BD]" })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.industriesService.remove(id);
  }
}
