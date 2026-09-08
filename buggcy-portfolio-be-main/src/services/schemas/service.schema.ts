import { z } from 'zod';

const ProcessStepSchema = z.object({
  step: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const ServiceStatSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const WhyChooseUsItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const ServiceFaqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const CreateServiceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().optional(),
  imageUrl: z.string().url('imageUrl must be a valid URL').optional(),
  secondaryImageUrl: z.string().url('secondaryImageUrl must be a valid URL').optional(),
  features: z.array(z.string().min(1)).optional().default([]),
  technologies: z.array(z.string().min(1)).optional().default([]),
  detailedContent: z.string().optional(),
  process: z.array(ProcessStepSchema).optional().default([]),
  stats: z.array(ServiceStatSchema).optional().default([]),
  whyChooseUs: z.array(WhyChooseUsItemSchema).optional().default([]),
  faqs: z.array(ServiceFaqSchema).optional().default([]),
  useCases: z.array(z.string().min(1)).optional().default([]),
  isActive: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
});

export type CreateServiceDto = z.infer<typeof CreateServiceSchema>;

export const UpdateServiceSchema = CreateServiceSchema.partial();
export type UpdateServiceDto = z.infer<typeof UpdateServiceSchema>;

export const ServiceFilterSchema = z.object({
  search: z.string().optional(),
  isActive: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((v) => (typeof v === 'string' ? v === 'true' : v)),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export type ServiceFilterDto = z.infer<typeof ServiceFilterSchema>;
