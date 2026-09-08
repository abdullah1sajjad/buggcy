import { z } from 'zod';
import { JobType, JobStatus } from '../entities/career.entity';
import { ApplicationFieldType, OPTION_BASED_FIELD_TYPES } from '../types/application-form-field';

export const ApplicationFieldTypeSchema = z.nativeEnum(ApplicationFieldType);

export const ApplicationFormFieldSchema = z
  .object({
    id: z.string().min(1, 'Field id is required'),
    label: z.string().min(1, 'Field label is required'),
    fieldType: ApplicationFieldTypeSchema,
    placeholder: z.string().optional(),
    required: z.boolean().optional().default(false),
    order: z.number().int().optional().default(0),
    options: z.array(z.string().min(1)).optional(),
  })
  .refine(
    (field) =>
      !OPTION_BASED_FIELD_TYPES.includes(field.fieldType) ||
      (field.options && field.options.length > 0),
    {
      message: 'Select and Radio fields require at least one option',
      path: ['options'],
    },
  );

export type ApplicationFormFieldDto = z.infer<typeof ApplicationFormFieldSchema>;

export const CreateCareerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  department: z.string().min(1, 'Department is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  requirements: z.string().min(1, 'Requirements are required'),
  responsibilities: z.string().optional(),
  jobType: z.nativeEnum(JobType).optional().default(JobType.FULL_TIME),
  status: z.nativeEnum(JobStatus).optional().default(JobStatus.DRAFT),
  salaryRange: z.string().optional(),
  salaryCurrency: z.string().optional(),
  deadline: z.string().datetime({ message: 'deadline must be a valid ISO 8601 date-time' }).transform((v) => new Date(v)).optional(),
  // Custom fields designed via the Application Form Builder (in addition
  // to the fixed name/email/phone/resume/cover-letter fields).
  applicationFormSchema: z.array(ApplicationFormFieldSchema).optional().default([]),
});

export type CreateCareerDto = z.infer<typeof CreateCareerSchema>;

export const UpdateCareerSchema = CreateCareerSchema.partial();
export type UpdateCareerDto = z.infer<typeof UpdateCareerSchema>;

export const CareerFilterSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(JobStatus).optional(),
  jobType: z.nativeEnum(JobType).optional(),
  department: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export type CareerFilterDto = z.infer<typeof CareerFilterSchema>;