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
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiConsumes,
} from "@nestjs/swagger";
import { BlogsService } from "./blogs.service";
import type {
  CreateBlogDto,
  UpdateBlogDto,
  BlogFilterDto,
} from "./dto/blog.dto";
import {
  CreateBlogSchema,
  UpdateBlogSchema,
  BlogFilterSchema,
} from "./schemas/blog.schema";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { normalizeMultipartBody } from "../common/utils/normalize-multipart-body";
import { imageMulterOptions } from "../uploads/multer.config";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../common/enums/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { User } from "../users/entities/user.entity";
import { RequireModule } from "../common/enums/module.decorator";
import { PermissionsGuard } from "../auth/guards/permissions.guard";

@ApiTags("Blogs")
@Controller("blogs")
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get("public")
  @ApiOperation({ summary: "Get published blogs (public)" })
  findPublic(
    @Query(new ZodValidationPipe(BlogFilterSchema)) filters: BlogFilterDto,
  ) {
    return this.blogsService.findPublic(filters);
  }

  @Get("public/slug/:slug")
  @ApiOperation({ summary: "Get published blog by slug (public)" })
  findBySlug(@Param("slug") slug: string) {
    return this.blogsService.findBySlug(slug);
  }

  @Get("public/:id")
  @ApiOperation({ summary: "Get published blog by id (public)" })
  findOnePublic(@Param("id", ParseUUIDPipe) id: string) {
    return this.blogsService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule('blogs')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all blogs [ADMIN, HR, BD]" })
  findAll(
    @Query(new ZodValidationPipe(BlogFilterSchema)) filters: BlogFilterDto,
  ) {
    return this.blogsService.findAll(filters);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule('blogs')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get blog by id [ADMIN, HR, BD]" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.blogsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("blogs")
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create blog post, optionally with a cover image file [ADMIN]",
  })
  @ApiConsumes("multipart/form-data", "application/json")
  @ApiBody({
    schema: {
      type: "object",
      required: ["title", "slug", "excerpt", "content", "category"],
      properties: {
        title: { type: "string", example: "My First Blog" },
        slug: { type: "string", example: "my-first-blog" },
        excerpt: { type: "string", example: "Short summary here" },
        content: { type: "string", example: "<p>Full content here</p>" },
        category: { type: "string", example: "Technology" },
        coverImage: {
          type: "string",
          format: "binary",
          description:
            'Cover image file (jpg, png, webp, gif, svg). Alternatively, send a "coverImage" string URL in JSON if you already have one hosted.',
        },
        tags: {
          type: "array",
          items: { type: "string" },
          example: ["nestjs", "api"],
        },
        status: {
          type: "string",
          enum: ["draft", "published", "archived"],
          example: "draft",
        },
        readTimeMinutes: { type: "number", example: 5 },
        publishedAt: { type: "string", example: "2026-06-29T00:00:00.000Z" },
      },
    },
  })
  @UseInterceptors(FileInterceptor("coverImage", imageMulterOptions))
  async create(
    @Body() rawBody: Record<string, any>,
    @UploadedFile() coverImageFile: Express.Multer.File | undefined,
    @CurrentUser() user: User,
  ) {
    const body = normalizeMultipartBody(rawBody);

    if (coverImageFile) {
      const result = await this.cloudinaryService.uploadBuffer(
        coverImageFile.buffer,
        {
          folder: "website/blog-covers",
          resourceType: "image",
          filename: coverImageFile.originalname,
        },
      );
      body.coverImage = result.url;
    }

    const parsed = CreateBlogSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({
        message: parsed.error.issues.map(
          (i) => `${i.path.join(".") || "value"}: ${i.message}`,
        ),
        error: "Validation failed",
        statusCode: 400,
      });
    }

    return this.blogsService.create(parsed.data as CreateBlogDto, user);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("blogs")
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Update blog post, optionally replacing the cover image file [ADMIN]",
  })
  @ApiConsumes("multipart/form-data", "application/json")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: { type: "string", example: "Updated Title" },
        slug: { type: "string", example: "updated-title" },
        excerpt: { type: "string", example: "Updated summary" },
        content: { type: "string", example: "<p>Updated content</p>" },
        category: { type: "string", example: "Technology" },
        coverImage: {
          type: "string",
          format: "binary",
          description:
            'New cover image file. Alternatively, send a "coverImage" string URL in JSON.',
        },
        tags: { type: "array", items: { type: "string" }, example: ["nestjs"] },
        status: {
          type: "string",
          enum: ["draft", "published", "archived"],
          example: "published",
        },
        readTimeMinutes: { type: "number", example: 5 },
        publishedAt: { type: "string", example: "2026-06-29T00:00:00.000Z" },
      },
    },
  })
  @UseInterceptors(FileInterceptor("coverImage", imageMulterOptions))
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() rawBody: Record<string, any>,
    @UploadedFile() coverImageFile: Express.Multer.File | undefined,
  ) {
    const body = normalizeMultipartBody(rawBody);

    if (coverImageFile) {
      const result = await this.cloudinaryService.uploadBuffer(
        coverImageFile.buffer,
        {
          folder: "website/blog-covers",
          resourceType: "image",
          filename: coverImageFile.originalname,
        },
      );
      body.coverImage = result.url;
    }

    const parsed = UpdateBlogSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({
        message: parsed.error.issues.map(
          (i) => `${i.path.join(".") || "value"}: ${i.message}`,
        ),
        error: "Validation failed",
        statusCode: 400,
      });
    }

    return this.blogsService.update(id, parsed.data as UpdateBlogDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("blogs")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete blog post [ADMIN]" })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.blogsService.remove(id);
  }
}
