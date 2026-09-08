import { z } from 'zod';

const stepSchema = z.object({ step: z.string(), title: z.string(), description: z.string() });
const statSchema = z.object({ label: z.string(), value: z.string() });
const challengeDetailSchema = z.object({ title: z.string(), description: z.string() });
const relatedServiceSchema = z.object({ title: z.string(), href: z.string() });
const testimonialSchema = z.object({
  quote: z.string(),
  name: z.string(),
  role: z.string(),
  company: z.string(),
  location: z.string().optional(),
});
const successStorySchema = z.object({
  slug: z.string().optional(),
  title: z.string(),
  problem: z.string(),
  solution: z.string(),
  results: z.array(z.object({ label: z.string(), value: z.string() })),
});

export const CreateIndustrySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
  description: z.string().min(1, 'Description is required'),
  heroSubtitle: z.string().optional(),
  heroCta: z.string().optional(),
  icon: z.string().optional(),
  imageUrl: z.string().optional().or(z.literal('')),
  features: z.array(z.string().min(1)).min(1, 'At least one feature is required'),
  challenges: z.array(z.string()).optional().default([]),
  solutions: z.array(z.string()).optional().default([]),
  technologies: z.array(z.string()).optional().default([]),
  detailedContent: z.string().optional(),
  challengesDetailed: z.array(challengeDetailSchema).optional().default([]),
  lifecycle: z.array(stepSchema).optional().default([]),
  approach: z.array(stepSchema).optional().default([]),
  stats: z.array(statSchema).optional().default([]),
  relatedServices: z.array(relatedServiceSchema).optional().default([]),
  testimonials: z.array(testimonialSchema).optional().default([]),
  successStories: z.array(successStorySchema).optional().default([]),
});

export type CreateIndustryDto = z.infer<typeof CreateIndustrySchema>;

export const UpdateIndustrySchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  heroSubtitle: z.string().optional().nullable(),
  heroCta: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  features: z.array(z.string()).optional().nullable(),
  challenges: z.array(z.string()).optional().nullable(),
  solutions: z.array(z.string()).optional().nullable(),
  technologies: z.array(z.string()).optional().nullable(),
  detailedContent: z.string().optional().nullable(),
  challengesDetailed: z.array(challengeDetailSchema).optional().nullable(),
  lifecycle: z.array(stepSchema).optional().nullable(),
  approach: z.array(stepSchema).optional().nullable(),
  stats: z.array(statSchema).optional().nullable(),
  relatedServices: z.array(relatedServiceSchema).optional().nullable(),
  testimonials: z.array(testimonialSchema).optional().nullable(),
  successStories: z.array(successStorySchema).optional().nullable(),
});
export type UpdateIndustryDto = z.infer<typeof UpdateIndustrySchema>;

export const IndustryFilterSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export type IndustryFilterDto = z.infer<typeof IndustryFilterSchema>;
