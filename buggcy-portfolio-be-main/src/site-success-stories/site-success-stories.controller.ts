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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from "@nestjs/swagger";
import { SiteSuccessStoriesService } from "./site-success-stories.service";
import type {
  CreateSuccessStoryDto,
  UpdateSuccessStoryDto,
  SuccessStoryFilterDto,
} from "./dto/success-story.dto";
import {
  CreateSuccessStorySchema,
  UpdateSuccessStorySchema,
  SuccessStoryFilterSchema,
} from "./schemas/success-story.schema";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../common/enums/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { RequireModule } from "../common/enums/module.decorator";
import { PermissionsGuard } from "../auth/guards/permissions.guard";

@ApiTags("Site Success Stories")
@Controller("site-success-stories")
export class SiteSuccessStoriesController {
  constructor(private readonly storiesService: SiteSuccessStoriesService) {}

  @Get("public")
  @ApiOperation({ summary: "Get all success stories (public)" })
  findAllPublic(@Query("category") category?: string) {
    return this.storiesService.findAllPublic(category);
  }

  @Get("public/slug/:slug")
  @ApiOperation({ summary: "Get success story by slug (public)" })
  findBySlug(@Param("slug") slug: string) {
    return this.storiesService.findBySlug(slug);
  }

  @Get("public/:id")
  @ApiOperation({ summary: "Get success story by id (public)" })
  findOnePublic(@Param("id", ParseUUIDPipe) id: string) {
    return this.storiesService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("success-stories")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all success stories [ADMIN, HR]" })
  findAll(
    @Query(new ZodValidationPipe(SuccessStoryFilterSchema)) filters: SuccessStoryFilterDto,
  ) {
    return this.storiesService.findAll(filters);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("success-stories")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get success story by id [ADMIN, HR, BD]" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.storiesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("success-stories")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create success story [ADMIN]" })
  @ApiBody({
    schema: {
      type: "object",
      required: [
        "title",
        "slug",
        "client",
        "category",
        "description",
        "problem",
        "solution",
      ],
      properties: {
        title: { type: "string", example: "E-commerce Platform Redesign" },
        slug: { type: "string", example: "ecommerce-redesign" },
        client: { type: "string", example: "Acme Corp" },
        category: { type: "string", example: "Web Development" },
        description: {
          type: "string",
          example: "A complete redesign of the e-commerce platform...",
        },
        problem: {
          type: "string",
          example: "The client had an outdated platform...",
        },
        solution: {
          type: "string",
          example: "We built a modern Next.js application...",
        },
        results: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string", example: "Conversion Rate" },
              value: { type: "string", example: "+45%" },
            },
          },
        },
        technologies: {
          type: "array",
          items: { type: "string" },
          example: ["Next.js", "PostgreSQL"],
        },
        imageUrl: { type: "string" },
        laptopImageUrl: { type: "string" },
        mobileImageUrl: { type: "string" },
        tabletImageUrl: { type: "string" },
        desktopImageUrl: { type: "string" },
        liveUrl: { type: "string" },
      },
    },
  })
  create(
    @Body(new ZodValidationPipe(CreateSuccessStorySchema))
    dto: CreateSuccessStoryDto,
  ) {
    return this.storiesService.create(dto);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("success-stories")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update success story [ADMIN]" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: { type: "string", example: "E-commerce Platform Redesign" },
        slug: { type: "string", example: "ecommerce-redesign" },
        client: { type: "string", example: "Acme Corp" },
        category: { type: "string", example: "Web Development" },
        description: {
          type: "string",
          example: "A complete redesign of the e-commerce platform...",
        },
        problem: {
          type: "string",
          example: "The client had an outdated platform...",
        },
        solution: {
          type: "string",
          example: "We built a modern Next.js application...",
        },
        results: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string", example: "Conversion Rate" },
              value: { type: "string", example: "+45%" },
            },
          },
        },
        technologies: {
          type: "array",
          items: { type: "string" },
          example: ["Next.js", "PostgreSQL"],
        },
        imageUrl: { type: "string" },
        laptopImageUrl: { type: "string" },
        mobileImageUrl: { type: "string" },
        tabletImageUrl: { type: "string" },
        desktopImageUrl: { type: "string" },
        liveUrl: { type: "string" },
      },
    },
  })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateSuccessStorySchema))
    dto: UpdateSuccessStoryDto,
  ) {
    return this.storiesService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("success-stories")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete success story [ADMIN]" })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.storiesService.remove(id);
  }
}
