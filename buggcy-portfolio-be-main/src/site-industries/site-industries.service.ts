import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteIndustry } from './entities/industry.entity';
import type { CreateIndustryDto, UpdateIndustryDto, IndustryFilterDto } from './dto/industry.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

export interface PaginatedIndustries {
  data: SiteIndustry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

@Injectable()
export class SiteIndustriesService {
  constructor(
    @InjectRepository(SiteIndustry)
    private readonly industriesRepo: Repository<SiteIndustry>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(dto: CreateIndustryDto): Promise<SiteIndustry> {
    const existing = await this.industriesRepo.findOne({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException('Slug already in use');
    const industry = this.industriesRepo.create(dto);
    return this.industriesRepo.save(industry);
  }

  async findAll(filters?: IndustryFilterDto): Promise<PaginatedIndustries> {
    const page = Math.max(1, Number(filters?.page) || DEFAULT_PAGE);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, Number(filters?.limit) || DEFAULT_LIMIT),
    );

    const query = this.industriesRepo.createQueryBuilder('industry');

    if (filters?.search) {
      query.andWhere(
        '(industry.title ILIKE :search OR industry.slug ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    const [data, total] = await query
      .orderBy('industry.createdAt', 'DESC')
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

  /** Public: all industries (no pagination) */
  async findAllPublic(): Promise<SiteIndustry[]> {
    return this.industriesRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<SiteIndustry> {
    const industry = await this.industriesRepo.findOne({ where: { id } });
    if (!industry) throw new NotFoundException(`Industry #${id} not found`);
    return industry;
  }

  async findBySlug(slug: string): Promise<SiteIndustry> {
    const industry = await this.industriesRepo.findOne({ where: { slug } });
    if (!industry) throw new NotFoundException(`Industry "${slug}" not found`);
    return industry;
  }

  async update(id: string, dto: UpdateIndustryDto): Promise<SiteIndustry> {
    const industry = await this.findOne(id);
    if (dto.slug && dto.slug !== industry.slug) {
      const exists = await this.industriesRepo.findOne({ where: { slug: dto.slug } });
      if (exists) throw new ConflictException('Slug already in use');
    }
    Object.assign(industry, dto);
    return this.industriesRepo.save(industry);
  }

  async remove(id: string): Promise<{ message: string }> {
    const industry = await this.findOne(id);
    await this.cloudinary.destroyByUrl(industry.imageUrl);
    await this.industriesRepo.remove(industry);
    return { message: `Industry #${id} deleted` };
  }
}
