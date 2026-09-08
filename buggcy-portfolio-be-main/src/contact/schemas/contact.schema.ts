import { z } from 'zod';
import { ContactStatus } from '../entities/contact-submission.entity';

export const CreateContactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('A valid email is required').max(150),
  company: z.string().max(150).optional().or(z.literal('')),
  phone: z.string().max(30).optional().or(z.literal('')),
  service: z.string().max(100).optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  // Honeypot field: real users never fill this in, bots usually do.
  website: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
});

export type CreateContactDto = z.infer<typeof CreateContactSchema>;

export const UpdateContactStatusSchema = z.object({
  status: z.nativeEnum(ContactStatus),
});

export type UpdateContactStatusDto = z.infer<typeof UpdateContactStatusSchema>;

export const ContactFilterSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(ContactStatus).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export type ContactFilterDto = z.infer<typeof ContactFilterSchema>;
