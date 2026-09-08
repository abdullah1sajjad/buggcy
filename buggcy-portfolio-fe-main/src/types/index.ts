import type { ApplicationFormField } from "./applicationForm";

export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
}

export interface Blog {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;

  author: string | BlogAuthor;

  date: string;

  imageUrl?: string;

  coverImage?: string | null;

  tags?: string[];
  category?: string;

  status?: "draft" | "published";

  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;

  readTimeMinutes?: number;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  requirements: string[];
  department?: string;
  category?: string;
  responsibilities?: string;
  status?: string;
  salaryRange?: string;
  salaryCurrency?: string;
  deadline?: string;
  /** Custom fields designed via the Application Form Builder for this job */
  applicationFormSchema?: ApplicationFormField[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon?: string;
  imageUrl?: string;
  secondaryImageUrl?: string;
  features: string[];
  technologies?: string[];
  detailedContent?: string;
  process?: { step: string; title: string; description: string }[];
  stats?: { label: string; value: string }[];
  whyChooseUs?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  useCases?: string[];
}

export interface Industry {
  id: string;
  title: string;
  slug: string;
  description: string;
  heroSubtitle?: string;
  heroCta?: string;
  icon?: string;
  imageUrl?: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  technologies?: string[];
  detailedContent?: string;
  challengesDetailed?: { title: string; description: string }[];
  lifecycle?: { step: string; title: string; description: string }[];
  approach?: { step: string; title: string; description: string }[];
  stats?: { label: string; value: string }[];
  relatedServices?: { title: string; href: string }[];
  testimonials?: {
    quote: string;
    name: string;
    role: string;
    company: string;
    location?: string;
  }[];
  successStories?: {
    slug?: string;
    title: string;
    problem: string;
    solution: string;
    results: { label: string; value: string }[];
  }[];
}

export interface SuccessStory {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  results: { label: string; value: string }[];
  technologies?: string[];
  imageUrl?: string;
  laptopImageUrl?: string;
  mobileImageUrl?: string;
  tabletImageUrl?: string;
  desktopImageUrl?: string;
  liveUrl?: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  status?: "new" | "read" | "archived";
  createdAt?: string;
}

export interface SiteSettings {
  id: string;
  siteName: string;
  logoUrl: string;
  darkLogoUrl: string;
  faviconUrl: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  supportEmail: string;
  workingHours: string;
  officeTwoCity: string;
  officeTwoCountry: string;
  officeTwoAddress: string;
  officeTwoPhone: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  metaDescription: string;
}
export interface PolicySection {
  title: string;
  content: string;
}

export interface PolicyPage {
  icon: string;
  label: string;
  heading: string;
  headingAccent: string;
  description: string;
  effectiveDate: string;
  sections: PolicySection[];
}
