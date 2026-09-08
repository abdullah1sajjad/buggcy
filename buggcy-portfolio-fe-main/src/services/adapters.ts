import type { Blog, Career, Service } from "../types";
import type { ApplicationFormField } from "../types/applicationForm";

interface BackendBlog {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  category?: string;
  status?: string;
  author?: { name?: string };
  authorName?: string;
  publishedAt?: string;
  createdAt?: string;
}

interface BackendCareer {
  id: string;
  title: string;
  description: string;
  location: string;
  jobType?: string;
  requirements?: string;
  department?: string;
  category?: string;
  responsibilities?: string;
  status?: string;
  salaryRange?: string;
  salaryCurrency?: string;
  deadline?: string | Date;
  applicationFormSchema?: ApplicationFormField[];
}

interface BackendService {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon?: string;
  imageUrl?: string;
  secondaryImageUrl?: string;
  features?: string[];
  technologies?: string[];
  detailedContent?: string;
  process?: { step: string; title: string; description: string }[];
  stats?: { label: string; value: string }[];
  whyChooseUs?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  useCases?: string[];
}

// ───────────────────────── Blogs ─────────────────────────
// Backend Blog: { id, title, slug, excerpt, content, coverImage, tags, category,
//                 status, author: { name }, publishedAt, createdAt, readTimeMinutes }
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/** Strips HTML tags and collapses whitespace — used to derive a plain-text excerpt from rich content. */
function htmlToPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function beBlogToFe(b: BackendBlog): Blog {
  return {
    id: b.id,
    title: b.title,
    slug: b.slug || "",
    excerpt: b.excerpt || "",
    content: b.content,
    author: b.author?.name || b.authorName || "Admin",
    date: (b.publishedAt || b.createdAt || "").slice(0, 10),
    imageUrl: b.coverImage || "",
    tags: b.tags || [],
    category: b.category || "Blog",
    status: (b.status || "published") as "draft" | "published",
  };
}

export function feBlogToBeCreate(data: Omit<Blog, "id">) {
  return {
    title: data.title,
    slug: data.slug?.trim() || slugify(data.title),
    excerpt: data.excerpt?.trim() || htmlToPlainText(data.content).slice(0, 160),
    content: data.content,
    coverImage: data.imageUrl || undefined,
    tags: data.tags || [],
    category: data.category || "Blog",
    status: data.status || "published",
  };
}

export function feBlogToBeUpdate(data: Partial<Blog>) {
  const body: Record<string, unknown> = {};
  if (data.title !== undefined) body.title = data.title;
  if (data.slug !== undefined)
    body.slug = data.slug.trim() || slugify(data.title || "");
  if (data.excerpt !== undefined) body.excerpt = data.excerpt;
  if (data.content !== undefined) {
    body.content = data.content;
    if (!data.excerpt) body.excerpt = htmlToPlainText(data.content).slice(0, 160);
  }
  if (data.imageUrl !== undefined) body.coverImage = data.imageUrl || undefined;
  if (data.tags !== undefined) body.tags = data.tags;
  if (data.category !== undefined) body.category = data.category;
  if (data.status !== undefined) body.status = data.status;
  return body;
}

// ───────────────────────── Careers ─────────────────────────
// Backend Career: { id, title, department, location, description, requirements: string,
//                    responsibilities, jobType, status, salaryRange, deadline }
const JOB_TYPE_TO_BE: Record<string, string> = {
  "Full-time": "full_time",
  "Part-time": "part_time",
  Contract: "contract",
  Internship: "internship",
  Remote: "remote",
};
const JOB_TYPE_TO_FE: Record<string, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  internship: "Internship",
  remote: "Remote",
};

// Added: keeps the raw deadline in "YYYY-MM-DD" so it's safe to bind
// directly to <input type="date"> without losing/blanking the value.
function toDateInputValue(deadline: string | Date | null | undefined): string {
  if (!deadline) return "";
  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

// Added: separate helper for human-readable display (e.g. public career page,
// admin list view) — NOT used for the edit form's date input.
export function formatDeadlineForDisplay(deadline: string | Date | null | undefined): string {
  if (!deadline) return "";
  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function beCareerToFe(c: BackendCareer): Career {
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    location: c.location,
    type: JOB_TYPE_TO_FE[c.jobType || ""] || "Full-time",
    requirements: c.requirements ? c.requirements.split("\n").filter(Boolean) : [],
    department: c.department || "",
    category: c.category || c.department || "Engineering",
    responsibilities: c.responsibilities || "",
    status: c.status || "open",
    salaryRange: c.salaryRange || "",
    salaryCurrency: c.salaryCurrency || "",
    // Changed: was formatted as a long display string ("December 31, 2026"),
    // which breaks <input type="date"> (requires strict "YYYY-MM-DD").
    // Now kept as "YYYY-MM-DD"; use formatDeadlineForDisplay() when showing
    // this to public/end users instead.
    deadline: toDateInputValue(c.deadline),
    applicationFormSchema: (c.applicationFormSchema || [])
      .slice()
      .sort((a, b) => a.order - b.order),
  };
}

export function feCareerToBeCreate(data: Omit<Career, "id">) {
  return {
    title: data.title,
    department: data.department || "General",
    location: data.location,
    description: data.description,
    requirements: (data.requirements || []).join("\n") || "N/A",
    responsibilities: data.responsibilities || undefined,
    jobType: JOB_TYPE_TO_BE[data.type] || "full_time",
    status: data.status || "open",
    salaryRange: data.salaryRange || undefined,
    salaryCurrency: data.salaryCurrency || undefined,
    deadline: data.deadline ? new Date(data.deadline).toISOString() : undefined,
    applicationFormSchema: (data.applicationFormSchema || []).map((f, i) => ({
      ...f,
      order: i,
    })),
  };
}

export function feCareerToBeUpdate(data: Partial<Career>) {
  const body: Record<string, unknown> = {};
  if (data.title !== undefined) body.title = data.title;
  if (data.department !== undefined) body.department = data.department;
  if (data.location !== undefined) body.location = data.location;
  if (data.description !== undefined) body.description = data.description;
  if (data.requirements !== undefined)
    body.requirements = data.requirements.join("\n");
  if (data.responsibilities !== undefined)
    body.responsibilities = data.responsibilities;
  if (data.type !== undefined)
    body.jobType = JOB_TYPE_TO_BE[data.type] || "full_time";
  if (data.status !== undefined) body.status = data.status;
  if (data.salaryRange !== undefined) body.salaryRange = data.salaryRange;
  if (data.salaryCurrency !== undefined) body.salaryCurrency = data.salaryCurrency;
  if (data.deadline !== undefined) {
    body.deadline = data.deadline
      ? new Date(data.deadline).toISOString()
      : undefined;
  }
  if (data.applicationFormSchema !== undefined) {
    body.applicationFormSchema = data.applicationFormSchema.map((f, i) => ({
      ...f,
      order: i,
    }));
  }
  return body;
}

// ───────────────────────── Services ─────────────────────────
// Backend Service maps almost 1:1 onto the frontend Service type.
export function beServiceToFe(s: BackendService): Service {
  return {
    id: s.id,
    title: s.title,
    description: s.description,
    slug: s.slug,
    icon: s.icon || "",
    imageUrl: s.imageUrl || "",
    secondaryImageUrl: s.secondaryImageUrl || "",
    features: s.features || [],
    technologies: s.technologies || [],
    detailedContent: s.detailedContent || "",
    process: s.process || [],
    stats: s.stats || [],
    whyChooseUs: s.whyChooseUs || [],
    faqs: s.faqs || [],
    useCases: s.useCases || [],
  };
}

export function feServiceToBe(data: Partial<Service>) {
  // Backend expects valid URLs (or omitted) for imageUrl / secondaryImageUrl.
  const body: Record<string, unknown> = { ...data };
  delete body.id;
  if (!data.imageUrl) delete body.imageUrl;
  if (!data.secondaryImageUrl) delete body.secondaryImageUrl;
  return body;
}