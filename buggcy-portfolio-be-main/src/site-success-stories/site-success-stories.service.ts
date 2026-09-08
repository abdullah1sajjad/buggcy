import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSuccessStory } from './entities/success-story.entity';
import type { CreateSuccessStoryDto, UpdateSuccessStoryDto, SuccessStoryFilterDto } from './dto/success-story.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

export interface PaginatedSuccessStories {
  data: SiteSuccessStory[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

@Injectable()
export class SiteSuccessStoriesService {
  constructor(
    @InjectRepository(SiteSuccessStory)
    private readonly storiesRepo: Repository<SiteSuccessStory>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(dto: CreateSuccessStoryDto): Promise<SiteSuccessStory> {
    const existing = await this.storiesRepo.findOne({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException('Slug already in use');
    const story = this.storiesRepo.create(dto);
    return this.storiesRepo.save(story);
  }

  async findAll(filters?: SuccessStoryFilterDto): Promise<PaginatedSuccessStories> {
    const page = Math.max(1, Number(filters?.page) || DEFAULT_PAGE);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, Number(filters?.limit) || DEFAULT_LIMIT),
    );

    const query = this.storiesRepo.createQueryBuilder('story');

    if (filters?.search) {
      query.andWhere(
        '(story.title ILIKE :search OR story.client ILIKE :search OR story.category ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }
    if (filters?.category) {
      query.andWhere('story.category ILIKE :cat', { cat: `%${filters.category}%` });
    }

    const [data, total] = await query
      .orderBy('story.createdAt', 'DESC')
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

  /** Public: all success stories (no pagination) */
  async findAllPublic(category?: string): Promise<SiteSuccessStory[]> {
    const query = this.storiesRepo.createQueryBuilder('story');
    if (category) query.andWhere('story.category ILIKE :cat', { cat: `%${category}%` });
    return query.orderBy('story.createdAt', 'DESC').getMany();
  }

  async findOne(id: string): Promise<SiteSuccessStory> {
    const story = await this.storiesRepo.findOne({ where: { id } });
    if (!story) throw new NotFoundException(`Success story #${id} not found`);
    return story;
  }

  async findBySlug(slug: string): Promise<SiteSuccessStory> {
    const story = await this.storiesRepo.findOne({ where: { slug } });
    if (!story) throw new NotFoundException(`Success story "${slug}" not found`);
    return story;
  }

  async update(id: string, dto: UpdateSuccessStoryDto): Promise<SiteSuccessStory> {
    const story = await this.findOne(id);
    if (dto.slug && dto.slug !== story.slug) {
      const exists = await this.storiesRepo.findOne({ where: { slug: dto.slug } });
      if (exists) throw new ConflictException('Slug already in use');
    }
    Object.assign(story, dto);
    return this.storiesRepo.save(story);
  }

  async remove(id: string): Promise<{ message: string }> {
    const story = await this.findOne(id);
    await Promise.all([
      this.cloudinary.destroyByUrl(story.imageUrl),
      this.cloudinary.destroyByUrl(story.laptopImageUrl),
      this.cloudinary.destroyByUrl(story.mobileImageUrl),
      this.cloudinary.destroyByUrl(story.tabletImageUrl),
      this.cloudinary.destroyByUrl(story.desktopImageUrl),
    ]);
    await this.storiesRepo.remove(story);
    return { message: `Success story #${id} deleted` };
  }
}
