import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query, UseGuards, ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CareersService } from './careers.service';
import type { CreateCareerDto, UpdateCareerDto, CareerFilterDto } from './dto/career.dto';
import {
  CreateCareerSchema,
  UpdateCareerSchema,
  CareerFilterSchema,
} from './schemas/career.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/enums/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { RequireModule } from '../common/enums/module.decorator';
import { PermissionsGuard } from '../auth/guards/permissions.guard';

@ApiTags('Careers')
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Get('public')
  @ApiOperation({ summary: 'Get all open job listings (public)' })
  findPublic(@Query(new ZodValidationPipe(CareerFilterSchema)) filters: CareerFilterDto) {
    return this.careersService.findPublic(filters);
  }

  @Get('public/:id')
  @ApiOperation({ summary: 'Get single open job (public)' })
  findOnePublic(@Param('id', ParseUUIDPipe) id: string) {
    return this.careersService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule('careers')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all careers with filters [ADMIN, HR, BD]' })
  findAll(@Query(new ZodValidationPipe(CareerFilterSchema)) filters: CareerFilterDto) {
    return this.careersService.findAll(filters);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule('careers')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get career by id [ADMIN, HR, BD]' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.careersService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule('careers')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create career posting [ADMIN, HR, BD]' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'department', 'location', 'description', 'requirements'],
      properties: {
        title:            { type: 'string', example: 'Frontend Developer' },
        department:       { type: 'string', example: 'Engineering' },
        location:         { type: 'string', example: 'Remote' },
        description:      { type: 'string', example: 'We are looking for...' },
        requirements:     { type: 'string', example: '3+ years React experience' },
        responsibilities: { type: 'string', example: 'Build and maintain UI components' },
        jobType:          { type: 'string', enum: ['full_time', 'part_time', 'contract', 'internship', 'remote'], example: 'full_time' },
        status:           { type: 'string', enum: ['open', 'closed', 'draft'], example: 'draft' },
        salaryRange:      { type: 'string', example: '60,000 - 90,000' },
        salaryCurrency:   { type: 'string', example: 'USD' },
        deadline:         { type: 'string', example: '2026-12-31T00:00:00.000Z' },
        applicationFormSchema: {
          type: 'array',
          description: 'Custom fields designed via the Application Form Builder',
          items: {
            type: 'object',
            properties: {
              id:          { type: 'string', example: 'years_of_experience' },
              label:       { type: 'string', example: 'Years of Experience' },
              fieldType:   { type: 'string', enum: ['text', 'email', 'phone', 'number', 'textarea', 'select', 'radio', 'checkbox', 'date', 'url', 'file'], example: 'number' },
              placeholder: { type: 'string', example: 'Enter years of experience' },
              required:    { type: 'boolean', example: true },
              order:       { type: 'number', example: 0 },
              options:     { type: 'array', items: { type: 'string' }, example: [] },
            },
          },
        },
      },
    },
  })
  create(@Body(new ZodValidationPipe(CreateCareerSchema)) dto: CreateCareerDto) {
    return this.careersService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule('careers')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update career posting [ADMIN, HR, BD]' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title:            { type: 'string', example: 'Senior Frontend Developer' },
        department:       { type: 'string', example: 'Engineering' },
        location:         { type: 'string', example: 'Remote' },
        description:      { type: 'string', example: 'Updated description...' },
        requirements:     { type: 'string', example: '5+ years React experience' },
        responsibilities: { type: 'string', example: 'Lead UI development' },
        jobType:          { type: 'string', enum: ['full_time', 'part_time', 'contract', 'internship', 'remote'], example: 'full_time' },
        status:           { type: 'string', enum: ['open', 'closed', 'draft'], example: 'open' },
        salaryRange:      { type: 'string', example: '80,000 - 120,000' },
        salaryCurrency:   { type: 'string', example: 'USD' },
        deadline:         { type: 'string', example: '2026-12-31T00:00:00.000Z' },
        applicationFormSchema: {
          type: 'array',
          description: 'Custom fields designed via the Application Form Builder',
          items: { type: 'object' },
        },
      },
    },
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateCareerSchema)) dto: UpdateCareerDto,
  ) {
    return this.careersService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.HR, Role.BD)
  @RequireModule('careers')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete career posting [ADMIN, HR, BD]' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.careersService.remove(id);
  }
}