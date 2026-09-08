import { z } from 'zod';
import { BlogStatus } from '../entities/blog.entity';

export const CreateBlogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  coverImage: z.string().url('Cover image must be a valid URL').optional(),
  tags: z.array(z.string().min(1)).optional().default([]),
  category: z.string().min(1, 'Category is required'),
  status: z.nativeEnum(BlogStatus).optional().default(BlogStatus.DRAFT),
  publishedAt: z.string().datetime({ message: 'Must be a valid ISO 8601 date-time' }).transform((v) => new Date(v)).optional(),
  readTimeMinutes: z.number().int().nonnegative().optional().default(0),
});

export type CreateBlogDto = z.infer<typeof CreateBlogSchema>;

export const UpdateBlogSchema = CreateBlogSchema.partial();
export type UpdateBlogDto = z.infer<typeof UpdateBlogSchema>;

export const BlogFilterSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(BlogStatus).optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export type BlogFilterDto = z.infer<typeof BlogFilterSchema>;