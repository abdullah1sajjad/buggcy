import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactSubmission } from './entities/contact-submission.entity';
import type {
  CreateContactDto,
  UpdateContactStatusDto,
  ContactFilterDto,
} from './dto/contact.dto';

export interface PaginatedContactSubmissions {
  data: ContactSubmission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactSubmission)
    private readonly contactRepo: Repository<ContactSubmission>,
  ) {}

  async create(dto: CreateContactDto, ipAddress?: string): Promise<ContactSubmission> {
    const submission = this.contactRepo.create({
      name: dto.name.trim(),
      email: dto.email.trim().toLowerCase(),
      company: dto.company || undefined,
      phone: dto.phone || undefined,
      service: dto.service || undefined,
      message: dto.message.trim(),
      ipAddress,
    });

    return this.contactRepo.save(submission);
  }

  async findAll(filters?: ContactFilterDto): Promise<PaginatedContactSubmissions> {
    const page = Math.max(1, Number(filters?.page) || DEFAULT_PAGE);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, Number(filters?.limit) || DEFAULT_LIMIT),
    );

    const query = this.contactRepo.createQueryBuilder('submission');

    if (filters?.search) {
      query.andWhere(
        '(submission.name ILIKE :search OR submission.email ILIKE :search OR submission.service ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }
    if (filters?.status) {
      query.andWhere('submission.status = :status', { status: filters.status });
    }

    const [data, total] = await query
      .orderBy('submission.createdAt', 'DESC')
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

  async findOne(id: string): Promise<ContactSubmission> {
    const submission = await this.contactRepo.findOne({ where: { id } });
    if (!submission) throw new NotFoundException(`Contact submission #${id} not found`);
    return submission;
  }

  async updateStatus(id: string, dto: UpdateContactStatusDto): Promise<ContactSubmission> {
    const submission = await this.findOne(id);
    submission.status = dto.status;
    return this.contactRepo.save(submission);
  }

  async remove(id: string): Promise<{ message: string }> {
    const submission = await this.findOne(id);
    await this.contactRepo.remove(submission);
    return { message: `Contact submission #${id} deleted` };
  }
}