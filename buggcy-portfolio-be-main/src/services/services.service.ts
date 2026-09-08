import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import type { CreateServiceDto, UpdateServiceDto, ServiceFilterDto } from './dto/service.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

export interface PaginatedServices {
  data: Service[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepo: Repository<Service>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(dto: CreateServiceDto): Promise<Service> {
    const existing = await this.servicesRepo.findOne({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException('Slug already in use');

    const service = this.servicesRepo.create(dto);
    return this.servicesRepo.save(service);
  }

  async findAll(filters?: ServiceFilterDto): Promise<PaginatedServices> {
    const page = Math.max(1, Number(filters?.page) || DEFAULT_PAGE);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, Number(filters?.limit) || DEFAULT_LIMIT),
    );

    const query = this.servicesRepo.createQueryBuilder('service');

    if (filters?.search) {
      query.andWhere(
        '(service.title ILIKE :search OR service.slug ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }
    if (filters?.isActive !== undefined) {
      query.andWhere('service.isActive = :isActive', { isActive: filters.isActive });
    }

    const [data, total] = await query
      .orderBy('service.order', 'ASC')
      .addOrderBy('service.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /** Public: only active services */
  async findPublic(): Promise<Service[]> {
    return this.servicesRepo.find({
      where: { isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.servicesRepo.findOne({ where: { id } });
    if (!service) throw new NotFoundException(`Service #${id} not found`);
    return service;
  }

  async findBySlug(slug: string): Promise<Service> {
    const service = await this.servicesRepo.findOne({ where: { slug, isActive: true } });
    if (!service) throw new NotFoundException(`Service "${slug}" not found`);
    return service;
  }

  async update(id: string, dto: UpdateServiceDto): Promise<Service> {
    const service = await this.findOne(id);

    if (dto.slug && dto.slug !== service.slug) {
      const exists = await this.servicesRepo.findOne({ where: { slug: dto.slug } });
      if (exists) throw new ConflictException('Slug already in use');
    }

    Object.assign(service, dto);
    return this.servicesRepo.save(service);
  }

  async remove(id: string): Promise<{ message: string }> {
    const service = await this.findOne(id);
    await Promise.all([
      this.cloudinary.destroyByUrl(service.imageUrl),
      this.cloudinary.destroyByUrl(service.secondaryImageUrl),
    ]);
    await this.servicesRepo.remove(service);
    return { message: `Service #${id} deleted` };
  }
}
