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
  Req,
  ParseUUIDPipe,
} from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from "@nestjs/swagger";
import type { Request } from "express";
import { ContactService } from "./contact.service";
import type {
  CreateContactDto,
  UpdateContactStatusDto,
  ContactFilterDto,
} from "./dto/contact.dto";
import {
  CreateContactSchema,
  UpdateContactStatusSchema,
  ContactFilterSchema,
} from "./schemas/contact.schema";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../common/enums/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { RequireModule } from "../common/enums/module.decorator";
import { PermissionsGuard } from "../auth/guards/permissions.guard";

@ApiTags("Contact")
@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // ── Public: anyone can submit the contact form ──
  // Extra-strict throttle on top of the global rate limiter, since this is an
  // unauthenticated write endpoint and a prime spam target.
  @Post()
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @ApiOperation({ summary: "Submit the contact form (public)" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["name", "email", "message"],
      properties: {
        name: { type: "string", example: "Jane Doe" },
        email: { type: "string", example: "jane@example.com" },
        company: { type: "string", example: "Acme Inc." },
        phone: { type: "string", example: "+1 555 123 4567" },
        service: { type: "string", example: "web" },
        message: {
          type: "string",
          example: "I would like to discuss a project...",
        },
      },
    },
  })
  create(
    @Body(new ZodValidationPipe(CreateContactSchema)) dto: CreateContactDto,
    @Req() req: Request,
  ) {
    const forwarded = req.headers["x-forwarded-for"];

    const ipAddress =
      (Array.isArray(forwarded)
        ? forwarded[0]
        : typeof forwarded === "string"
          ? forwarded
          : undefined
      )
        ?.split(",")[0]
        ?.trim() ||
      req.socket?.remoteAddress ||
      undefined;

    return this.contactService.create(dto, ipAddress);
  }

  // ── ADMIN/HR: view & manage submissions ──
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("contact-submissions")
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List all contact submissions, optionally filtered [ADMIN, HR, BD]",
  })
  findAll(
    @Query(new ZodValidationPipe(ContactFilterSchema))
    filters: ContactFilterDto,
  ) {
    return this.contactService.findAll(filters);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("contact-submissions")
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get a single contact submission by id [ADMIN, HR, BD]",
  })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.contactService.findOne(id);
  }

  @Patch(":id/status")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("contact-submissions")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a contact submission status [ADMIN, HR, BD]" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["new", "read", "archived"],
          example: "read",
        },
      },
    },
  })
  updateStatus(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateContactStatusSchema))
    dto: UpdateContactStatusDto,
  ) {
    return this.contactService.updateStatus(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule("contact-submissions")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a contact submission [ADMIN, HR, BD]" })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.contactService.remove(id);
  }
}
