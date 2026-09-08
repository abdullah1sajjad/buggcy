import { z } from "zod";

export const UpdateSiteSettingSchema = z.object({
  siteName: z.string().min(1).max(150).optional(),
  logoUrl: z.string().max(500).optional().or(z.literal("")),
  darkLogoUrl: z.string().max(500).optional().or(z.literal("")),
  faviconUrl: z.string().max(500).optional().or(z.literal("")),
  address: z.string().max(300).optional().or(z.literal("")),
  city: z.string().max(100).optional().or(z.literal("")),
  country: z.string().max(100).optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  secondaryPhone: z.string().max(30).optional().or(z.literal("")),
  email: z
    .string()
    .email("A valid email is required")
    .max(150)
    .optional()
    .or(z.literal("")),
  supportEmail: z
    .string()
    .email("A valid email is required")
    .max(150)
    .optional()
    .or(z.literal("")),
  workingHours: z.string().max(150).optional().or(z.literal("")),
  officeTwoCity: z.string().max(100).optional().or(z.literal("")),
  officeTwoCountry: z.string().max(100).optional().or(z.literal("")),
  officeTwoAddress: z.string().max(300).optional().or(z.literal("")),
  officeTwoPhone: z.string().max(30).optional().or(z.literal("")),
  facebookUrl: z.string().max(300).optional().or(z.literal("")),
  twitterUrl: z.string().max(300).optional().or(z.literal("")),
  linkedinUrl: z.string().max(300).optional().or(z.literal("")),
  instagramUrl: z.string().max(300).optional().or(z.literal("")),
  youtubeUrl: z.string().max(300).optional().or(z.literal("")),
  metaDescription: z.string().max(500).optional().or(z.literal("")),
});

export type UpdateSiteSettingDto = z.infer<typeof UpdateSiteSettingSchema>;
