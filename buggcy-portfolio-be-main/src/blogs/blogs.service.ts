import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Blog, BlogStatus } from "./entities/blog.entity";
import type {
  CreateBlogDto,
  UpdateBlogDto,
  BlogFilterDto,
} from "./dto/blog.dto";
import { User } from "../users/entities/user.entity";
import { sanitizeRichText } from "../common/utils/sanitize-rich-text";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

// Added: shape of the paginated response returned by findAll / findPublic
export interface PaginatedBlogs {
  data: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Added: pagination defaults/guardrails
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogsRepo: Repository<Blog>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(dto: CreateBlogDto, author: User): Promise<Blog> {
    const existing = await this.blogsRepo.findOne({
      where: { slug: dto.slug },
    });
    if (existing) throw new ConflictException("Slug already in use");

    const blog = this.blogsRepo.create({
      ...dto,
      content: sanitizeRichText(dto.content),
      authorId: author.id,
    });
    if (dto.status === BlogStatus.PUBLISHED && !dto.publishedAt) {
      blog.publishedAt = new Date();
    }
    return this.blogsRepo.save(blog);
  }

  // Changed: return type is now Promise<PaginatedBlogs> instead of a bare array
  async findAll(filters?: BlogFilterDto): Promise<PaginatedBlogs> {
    // Added: read/normalize page & limit from filters, with sane defaults and a hard cap
    const page = Math.max(1, Number(filters?.page) || DEFAULT_PAGE);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, Number(filters?.limit) || DEFAULT_LIMIT),
    );

    const query = this.blogsRepo
      .createQueryBuilder("blog")
      .leftJoinAndSelect("blog.author", "author");

    if (filters?.search) {
      query.andWhere(
        '(blog.title ILIKE :search OR blog.excerpt ILIKE :search OR blog.category ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }
    if (filters?.status)
      query.andWhere("blog.status = :status", { status: filters.status });
    if (filters?.category)
      query.andWhere("blog.category ILIKE :cat", {
        cat: `%${filters.category}%`,
      });
    if (filters?.tag)
      query.andWhere(":tag = ANY(blog.tags)", { tag: filters.tag });

    // Changed: getMany() -> getManyAndCount() with skip/take for pagination
    const [data, total] = await query
      .orderBy("blog.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    // Added: wrap paginated data + metadata into the response
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /** Public: only published blogs */
  // Changed: return type is now Promise<PaginatedBlogs> instead of a bare array
  async findPublic(filters?: BlogFilterDto): Promise<PaginatedBlogs> {
    // Added: read/normalize page & limit from filters, with sane defaults and a hard cap
    const page = Math.max(1, Number(filters?.page) || DEFAULT_PAGE);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, Number(filters?.limit) || DEFAULT_LIMIT),
    );

    const query = this.blogsRepo
      .createQueryBuilder("blog")
      .leftJoinAndSelect("blog.author", "author")
      .where("blog.status = :status", { status: BlogStatus.PUBLISHED });

    if (filters?.category)
      query.andWhere("blog.category ILIKE :cat", {
        cat: `%${filters.category}%`,
      });
    if (filters?.tag)
      query.andWhere(":tag = ANY(blog.tags)", { tag: filters.tag });

    // Changed: getMany() -> getManyAndCount() with skip/take for pagination
    const [data, total] = await query
      .orderBy("blog.publishedAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    // Added: wrap paginated data + metadata into the response
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogsRepo.findOne({
      where: { id },
      relations: ["author"],
    });
    if (!blog) throw new NotFoundException(`Blog #${id} not found`);
    return blog;
  }

  async findBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogsRepo.findOne({
      where: { slug, status: BlogStatus.PUBLISHED },
      relations: ["author"],
    });
    if (!blog) throw new NotFoundException(`Blog "${slug}" not found`);
    return blog;
  }

  async update(id: string, dto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.findOne(id);

    if (dto.slug && dto.slug !== blog.slug) {
      const exists = await this.blogsRepo.findOne({
        where: { slug: dto.slug },
      });
      if (exists) throw new ConflictException("Slug already in use");
    }

    // Auto set publishedAt when first published
    if (dto.status === BlogStatus.PUBLISHED && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    if (dto.content !== undefined) {
      dto = { ...dto, content: sanitizeRichText(dto.content) };
    }

    Object.assign(blog, dto);
    return this.blogsRepo.save(blog);
  }

  async remove(id: string): Promise<{ message: string }> {
    const blog = await this.findOne(id);
    await this.cloudinary.destroyByUrl(blog.coverImage);
    await this.blogsRepo.remove(blog);
    return { message: `Blog #${id} deleted` };
  }
}
