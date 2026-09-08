import { z } from 'zod';

const resultSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const CreateSuccessStorySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  client: z.string().min(1, 'Client is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  problem: z.string().min(1, 'Problem is required'),
  solution: z.string().min(1, 'Solution is required'),
  results: z.array(resultSchema).optional().default([]),
  technologies: z.array(z.string()).optional().default([]),
  imageUrl: z.string().optional().or(z.literal('')),
  laptopImageUrl: z.string().optional().or(z.literal('')),
  mobileImageUrl: z.string().optional().or(z.literal('')),
  tabletImageUrl: z.string().optional().or(z.literal('')),
  desktopImageUrl: z.string().optional().or(z.literal('')),
  liveUrl: z.string().optional().or(z.literal('')),
});

export type CreateSuccessStoryDto = z.infer<typeof CreateSuccessStorySchema>;

export const UpdateSuccessStorySchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  slug: z.string().min(1, 'Slug is required').optional(),
  client: z.string().min(1, 'Client is required').optional(),
  category: z.string().min(1, 'Category is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  problem: z.string().min(1, 'Problem is required').optional(),
  solution: z.string().min(1, 'Solution is required').optional(),
  results: z.array(resultSchema).optional().nullable(),
  technologies: z.array(z.string()).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  laptopImageUrl: z.string().optional().nullable(),
  mobileImageUrl: z.string().optional().nullable(),
  tabletImageUrl: z.string().optional().nullable(),
  desktopImageUrl: z.string().optional().nullable(),
  liveUrl: z.string().optional().nullable(),
});
export type UpdateSuccessStoryDto = z.infer<typeof UpdateSuccessStorySchema>;

export const SuccessStoryFilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export type SuccessStoryFilterDto = z.infer<typeof SuccessStoryFilterSchema>;
