import { z } from 'zod';

export const leadFormSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  company_name: z.string().min(2, 'Company name is required'),
  business_email: z.string().email('Invalid email address'),
  contact_number: z.string().optional(),
  project_description: z.string().min(20, 'Please describe your project in more detail (min 20 characters)'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
