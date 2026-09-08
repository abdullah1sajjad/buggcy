import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Career, JobStatus } from './entities/career.entity';
import type { CreateCareerDto, UpdateCareerDto, CareerFilterDto } from './dto/career.dto';

export interface PaginatedCareers {
  data: Career[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(Career)
    private readonly careersRepo: Repository<Career>,
  ) {}

  async create(dto: CreateCareerDto): Promise<Career> {
    const career = this.careersRepo.create(dto);
    return this.careersRepo.save(career);
  }

  async findAll(filters?: CareerFilterDto): Promise<PaginatedCareers> {
    const page = Math.max(1, Number(filters?.page) || DEFAULT_PAGE);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, Number(filters?.limit) || DEFAULT_LIMIT),
    );

    const query = this.careersRepo.createQueryBuilder('career');

    if (filters?.search) {
      query.andWhere(
        '(career.title ILIKE :search OR career.location ILIKE :search OR career.department ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }
    if (filters?.status)     query.andWhere('career.status = :status',       { status: filters.status });
    if (filters?.jobType)    query.andWhere('career.jobType = :jobType',     { jobType: filters.jobType });
    if (filters?.department) query.andWhere('career.department ILIKE :dept', { dept: `%${filters.department}%` });

    const [data, total] = await query
      .orderBy('career.createdAt', 'DESC')
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

  /** Public: only open positions */
  async findPublic(filters?: CareerFilterDto): Promise<Career[]> {
    const query = this.careersRepo
      .createQueryBuilder('career')
      .where('career.status = :status', { status: JobStatus.OPEN });

    if (filters?.jobType)    query.andWhere('career.jobType = :jobType',     { jobType: filters.jobType });
    if (filters?.department) query.andWhere('career.department ILIKE :dept', { dept: `%${filters.department}%` });

    return query.orderBy('career.createdAt', 'DESC').getMany();
  }

  async findOne(id: string): Promise<Career> {
    const career = await this.careersRepo.findOne({ where: { id } });
    if (!career) throw new NotFoundException(`Career #${id} not found`);
    return career;
  }

  async update(id: string, dto: UpdateCareerDto): Promise<Career> {
    const career = await this.findOne(id);
    Object.assign(career, dto);
    return this.careersRepo.save(career);
  }

  async remove(id: string): Promise<{ message: string }> {
    const career = await this.findOne(id);
    await this.careersRepo.remove(career);
    return { message: `Career #${id} deleted` };
  }
}
