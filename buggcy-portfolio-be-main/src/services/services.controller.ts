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
  UploadedFiles,
  ParseUUIDPipe,
  BadRequestException,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiConsumes,
} from "@nestjs/swagger";
import { ServicesService } from "./services.service";
import type {
  CreateServiceDto,
  UpdateServiceDto,
  ServiceFilterDto,
} from "./dto/service.dto";
import {
  CreateServiceSchema,
  UpdateServiceSchema,
  ServiceFilterSchema,
} from "./schemas/service.schema";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { normalizeServiceBody } from "../common/utils/normalize-service-body";
import { imageMulterOptions } from "../uploads/multer.config";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../common/enums/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { RequireModule } from "../common/enums/module.decorator";
import { PermissionsGuard } from "../auth/guards/permissions.guard";

const serviceImageFields = [
  { name: "image", maxCount: 1 },
  { name: "secondaryImage", maxCount: 1 },
];

@ApiTags("Services")
@Controller("services")
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get("public")
  @ApiOperation({ summary: "Get all active services (public)" })
  findPublic() {
    return this.servicesService.findPublic();
  }

  @Get("public/slug/:slug")
  @ApiOperation({ summary: "Get active service by slug (public)" })
  findBySlug(@Param("slug") slug: string) {
    return this.servicesService.findBySlug(slug);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("services")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all services [ADMIN, HR, BD]" })
  findAll(
    @Query(new ZodValidationPipe(ServiceFilterSchema))
    filters: ServiceFilterDto,
  ) {
    return this.servicesService.findAll(filters);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("services")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get service by id [ADMIN, HR, BD]" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.servicesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("services")
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create a service, optionally with image files [ADMIN]",
  })
  @ApiConsumes("multipart/form-data", "application/json")
  @ApiBody({
    schema: {
      type: "object",
      required: ["title", "slug", "description"],
      properties: {
        title: { type: "string", example: "Web Development" },
        slug: { type: "string", example: "web-development" },
        description: {
          type: "string",
          example: "Short summary of the service",
        },
        icon: { type: "string", example: "code" },
        image: {
          type: "string",
          format: "binary",
          description:
            'Primary image file. Alternatively send "imageUrl" string.',
        },
        secondaryImage: {
          type: "string",
          format: "binary",
          description:
            'Secondary image file. Alternatively send "secondaryImageUrl" string.',
        },
        features: {
          type: "array",
          items: { type: "string" },
          example: ["Responsive design", "SEO optimized"],
        },
        technologies: {
          type: "array",
          items: { type: "string" },
          example: ["React", "Node.js"],
        },
        detailedContent: { type: "string", example: "Full description" },
        process: {
          type: "array",
          items: { type: "object" },
          example: [{ step: "01", title: "Discover", description: "..." }],
        },
        stats: {
          type: "array",
          items: { type: "object" },
          example: [{ label: "Projects", value: "120+" }],
        },
        whyChooseUs: {
          type: "array",
          items: { type: "object" },
          example: [{ title: "Experience", description: "..." }],
        },
        faqs: {
          type: "array",
          items: { type: "object" },
          example: [{ question: "How long?", answer: "4-6 weeks" }],
        },
        useCases: {
          type: "array",
          items: { type: "string" },
          example: ["Startups", "Enterprises"],
        },
        isActive: { type: "boolean", example: true },
        order: { type: "number", example: 0 },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor(serviceImageFields, imageMulterOptions),
  )
  async create(
    @Body() rawBody: Record<string, any>,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      secondaryImage?: Express.Multer.File[];
    },
  ) {
    const body = normalizeServiceBody(rawBody);

    const parsed = CreateServiceSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({
        message: parsed.error.issues.map(
          (i) => `${i.path.join(".") || "value"}: ${i.message}`,
        ),
        error: "Validation failed",
        statusCode: 400,
      });
    }

    const data = parsed.data as CreateServiceDto;

    if (files?.image?.[0]) {
      const result = await this.cloudinaryService.uploadBuffer(
        files.image[0].buffer,
        {
          folder: "website/service-images",
          resourceType: "image",
          filename: files.image[0].originalname,
        },
      );
      data.imageUrl = result.url;
    }

    if (files?.secondaryImage?.[0]) {
      const result = await this.cloudinaryService.uploadBuffer(
        files.secondaryImage[0].buffer,
        {
          folder: "website/service-images",
          resourceType: "image",
          filename: files.secondaryImage[0].originalname,
        },
      );
      data.secondaryImageUrl = result.url;
    }

    return this.servicesService.create(data);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("services")
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Update a service, optionally replacing image files [ADMIN]",
  })
  @ApiConsumes("multipart/form-data", "application/json")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        slug: { type: "string" },
        description: { type: "string" },
        icon: { type: "string" },
        image: { type: "string", format: "binary" },
        secondaryImage: { type: "string", format: "binary" },
        features: { type: "array", items: { type: "string" } },
        technologies: { type: "array", items: { type: "string" } },
        detailedContent: { type: "string" },
        process: { type: "array", items: { type: "object" } },
        stats: { type: "array", items: { type: "object" } },
        whyChooseUs: { type: "array", items: { type: "object" } },
        faqs: { type: "array", items: { type: "object" } },
        useCases: { type: "array", items: { type: "string" } },
        isActive: { type: "boolean" },
        order: { type: "number" },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor(serviceImageFields, imageMulterOptions),
  )
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() rawBody: Record<string, any>,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      secondaryImage?: Express.Multer.File[];
    },
  ) {
    const body = normalizeServiceBody(rawBody);

    const parsed = UpdateServiceSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({
        message: parsed.error.issues.map(
          (i) => `${i.path.join(".") || "value"}: ${i.message}`,
        ),
        error: "Validation failed",
        statusCode: 400,
      });
    }

    const data = parsed.data as UpdateServiceDto;

    if (files?.image?.[0]) {
      const result = await this.cloudinaryService.uploadBuffer(
        files.image[0].buffer,
        {
          folder: "website/service-images",
          resourceType: "image",
          filename: files.image[0].originalname,
        },
      );
      data.imageUrl = result.url;
    }

    if (files?.secondaryImage?.[0]) {
      const result = await this.cloudinaryService.uploadBuffer(
        files.secondaryImage[0].buffer,
        {
          folder: "website/service-images",
          resourceType: "image",
          filename: files.secondaryImage[0].originalname,
        },
      );
      data.secondaryImageUrl = result.url;
    }

    return this.servicesService.update(id, data);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("services")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a service [ADMIN]" })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.servicesService.remove(id);
  }
}
