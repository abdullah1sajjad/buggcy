import { z } from 'zod';

const processStepSchema = z.object({
  step: z.string(),
  title: z.string(),
  description: z.string(),
});

const statSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const whyChooseUsSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const CreateServiceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().optional(),
  imageUrl: z.string().optional().or(z.literal('')),
  secondaryImageUrl: z.string().optional().or(z.literal('')),
  features: z.array(z.string().min(1)).min(1, 'At least one feature is required'),
  technologies: z.array(z.string()).optional().default([]),
  detailedContent: z.string().optional(),
  process: z.array(processStepSchema).optional().default([]),
  stats: z.array(statSchema).optional().default([]),
  whyChooseUs: z.array(whyChooseUsSchema).optional().default([]),
  faqs: z.array(faqSchema).optional().default([]),
  useCases: z.array(z.string()).optional().default([]),
});

export type CreateServiceDto = z.infer<typeof CreateServiceSchema>;

export const UpdateServiceSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  icon: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  secondaryImageUrl: z.string().optional().nullable(),
  features: z.array(z.string()).optional().nullable(),
  technologies: z.array(z.string()).optional().nullable(),
  detailedContent: z.string().optional().nullable(),
  process: z.array(processStepSchema).optional().nullable(),
  stats: z.array(statSchema).optional().nullable(),
  whyChooseUs: z.array(whyChooseUsSchema).optional().nullable(),
  faqs: z.array(faqSchema).optional().nullable(),
  useCases: z.array(z.string()).optional().nullable(),
});
export type UpdateServiceDto = z.infer<typeof UpdateServiceSchema>;

export const ServiceFilterSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});
export type ServiceFilterDto = z.infer<typeof ServiceFilterSchema>;
