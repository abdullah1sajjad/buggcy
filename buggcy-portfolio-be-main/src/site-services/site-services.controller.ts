import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query, UseGuards, ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';
import { SiteServicesService } from './site-services.service';
import type { CreateServiceDto, UpdateServiceDto, ServiceFilterDto } from './dto/service.dto';
import { CreateServiceSchema, UpdateServiceSchema, ServiceFilterSchema } from './schemas/service.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/enums/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Site Services')
@Controller('site-services')
export class SiteServicesController {
  constructor(private readonly servicesService: SiteServicesService) {}

  @Get('public')
  @ApiOperation({ summary: 'Get all services (public)' })
  findAllPublic() {
    return this.servicesService.findAllPublic();
  }

  @Get('public/slug/:slug')
  @ApiOperation({ summary: 'Get service by slug (public)' })
  findBySlug(@Param('slug') slug: string) {
    return this.servicesService.findBySlug(slug);
  }

  @Get('public/:id')
  @ApiOperation({ summary: 'Get service by id (public)' })
  findOnePublic(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicesService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.HR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all services [ADMIN, HR]' })
  findAll(
    @Query(new ZodValidationPipe(ServiceFilterSchema)) filters: ServiceFilterDto,
  ) {
    return this.servicesService.findAll(filters);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.HR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get service by id [ADMIN, HR]' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create service [ADMIN]' })
  create(@Body(new ZodValidationPipe(CreateServiceSchema)) dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update service [ADMIN]' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateServiceSchema)) dto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete service [ADMIN]' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicesService.remove(id);
  }
}
