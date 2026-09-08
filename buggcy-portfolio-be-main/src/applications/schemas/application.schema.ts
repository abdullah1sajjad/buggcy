import { z } from 'zod';
import { ApplicationStatus } from '../entities/job-application.entity';

// multipart/form-data always arrives as strings, so we validate against that
export const CreateApplicationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('A valid email is required'),
  phone: z.string().optional(),
  coverLetter: z.string().optional(),
  linkedinUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  portfolioUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  // Optional JSON-stringified rich profile (education, experience, skills, links, etc.)
  extraData: z
    .string()
    .optional()
    .transform((v) => {
      if (!v) return undefined;
      try {
        return JSON.parse(v);
      } catch {
        return undefined;
      }
    }),
});

export type CreateApplicationDto = z.infer<typeof CreateApplicationSchema>;

export const UpdateApplicationStatusSchema = z.object({
  status: z.nativeEnum(ApplicationStatus),
});

export type UpdateApplicationStatusDto = z.infer<typeof UpdateApplicationStatusSchema>;

export const ApplicationFilterSchema = z.object({
  search: z.string().optional(),
  careerId: z.string().uuid().optional(),
  status: z.nativeEnum(ApplicationStatus).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export type ApplicationFilterDto = z.infer<typeof ApplicationFilterSchema>;
