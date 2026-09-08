import { PermissionsGuard } from "../auth/guards/permissions.guard";
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  ParseUUIDPipe,
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { Throttle } from "@nestjs/throttler";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
} from "@nestjs/swagger";
import { ApplicationsService } from "./applications.service";
import type {
  CreateApplicationDto,
  UpdateApplicationStatusDto,
  ApplicationFilterDto,
} from "./dto/application.dto";
import {
  CreateApplicationSchema,
  UpdateApplicationStatusSchema,
  ApplicationFilterSchema,
} from "./schemas/application.schema";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { applicationFilesMulterOptions } from "../uploads/multer.config";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../common/enums/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { RequireModule } from "../common/enums/module.decorator";

@ApiTags("Applications")
@Controller("careers")
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // ── Public: candidate applies to an open job, resume goes to Cloudinary ──
  @Post(":id/apply")
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({
    summary: "Apply to a job posting with a resume upload (public)",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      required: ["fullName", "email", "resume"],
      properties: {
        fullName: { type: "string", example: "Jane Doe" },
        email: { type: "string", example: "jane@example.com" },
        phone: { type: "string", example: "+1 555 123 4567" },
        coverLetter: {
          type: "string",
          example: "I would love to join your team because...",
        },
        linkedinUrl: {
          type: "string",
          example: "https://linkedin.com/in/janedoe",
        },
        portfolioUrl: { type: "string", example: "https://janedoe.dev" },
        extraData: {
          type: "string",
          description:
            "JSON-stringified object with education, experience, skills, links, additionalQuestions, and customFields (answers to the career's Application Form Builder fields, keyed by field id).",
        },
        resume: {
          type: "string",
          format: "binary",
          description: "PDF or Word document",
        },
      },
    },
  })
  // AnyFilesInterceptor: a submission can include the fixed `resume` file
  // plus any number of dynamic custom "File Upload" fields defined by the
  // career's Application Form Builder (fieldname = the custom field's id).
  @UseInterceptors(AnyFilesInterceptor(applicationFilesMulterOptions))
  apply(
    @Param("id", ParseUUIDPipe) careerId: string,
    @Body(new ZodValidationPipe(CreateApplicationSchema))
    dto: CreateApplicationDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.applicationsService.apply(careerId, dto, files || []);
  }

  // ── ADMIN/HR: view & manage applications ──
  @Get("applications")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("applications")
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List all job applications, optionally filtered [ADMIN, HR, BD]",
  })
  findAll(
    @Query(new ZodValidationPipe(ApplicationFilterSchema))
    filters: ApplicationFilterDto,
  ) {
    return this.applicationsService.findAll(filters);
  }

  @Get("applications/:id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("applications")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a single application by id [ADMIN, HR, BD]" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.applicationsService.findOne(id);
  }

  @Patch("applications/:id/status")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("applications")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update an application status [ADMIN, HR, BD]" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["pending", "reviewing", "shortlisted", "rejected", "hired"],
          example: "reviewing",
        },
      },
    },
  })
  updateStatus(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateApplicationStatusSchema))
    dto: UpdateApplicationStatusDto,
  ) {
    return this.applicationsService.updateStatus(id, dto);
  }

  @Delete("applications/:id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("applications")
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Delete an application (and its resume from Cloudinary) [ADMIN, HR, BD]",
  })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.applicationsService.remove(id);
  }
}
