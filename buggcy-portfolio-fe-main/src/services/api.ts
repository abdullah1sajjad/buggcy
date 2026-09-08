import type {
  Blog,
  Career,
  Service,
  Industry,
  SuccessStory,
  ContactFormData,
  ContactSubmission,
  SiteSettings,
} from "../types";
import type { JobApplicationFormData } from "../types/application";
import { mockWhyChooseUs } from "../data/mockData";
import { httpClient } from "./httpClient";
import {
  beBlogToFe,
  feBlogToBeCreate,
  feBlogToBeUpdate,
  beCareerToFe,
  feCareerToBeCreate,
  feCareerToBeUpdate,
  beServiceToFe,
  feServiceToBe,
} from "./adapters";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Unwrap API response — handles bare arrays, { items }, and paginated { data, total } shapes */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function unwrapList(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.items)) return data.items;
  }
  return [];
}

// ============================================================
// Blogs — wired to the real backend (NestJS /blogs)
// ============================================================
export const getBlogs = async (category?: string): Promise<Blog[]> => {
  const { data } = await httpClient.get("/blogs/public", {
    params: category ? { category } : undefined,
  });
  return unwrapList(data).map(beBlogToFe);
};

export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  try {
    const { data } = await httpClient.get(`/blogs/public/${id}`);
    return beBlogToFe(data);
  } catch {
    return undefined;
  }
};

/** Used by admin list page — returns every blog regardless of status */
export const getAllBlogsAdmin = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse<Blog>> => {
  const { data } = await httpClient.get("/blogs", { params });

  return {
    data: (data.data ?? []).map(beBlogToFe),
    total: data.total ?? 0,
    page: data.page ?? 1,
    limit: data.limit ?? 10,
    totalPages: data.totalPages ?? 1,
  };
};

export const createBlog = async (data: Omit<Blog, "id">): Promise<Blog> => {
  const { data: created } = await httpClient.post(
    "/blogs",
    feBlogToBeCreate(data),
  );
  return beBlogToFe(created);
};

export const updateBlog = async (
  id: string,
  data: Partial<Blog>,
): Promise<Blog> => {
  const { data: updated } = await httpClient.put(
    `/blogs/${id}`,
    feBlogToBeUpdate(data),
  );
  return beBlogToFe(updated);
};

export const deleteBlog = async (id: string): Promise<void> => {
  await httpClient.delete(`/blogs/${id}`);
};

// ============================================================
// Careers — wired to the real backend (NestJS /careers)
// ============================================================
export const getCareers = async (): Promise<Career[]> => {
  const { data } = await httpClient.get("/careers/public");
  return unwrapList(data).map(beCareerToFe);
};

export const getCareerById = async (
  id: string,
): Promise<Career | undefined> => {
  try {
    const { data } = await httpClient.get(`/careers/public/${id}`);
    return beCareerToFe(data);
  } catch {
    return undefined;
  }
};

/** Used by admin list page — returns every career regardless of status */
export const getAllCareersAdmin = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse<Career>> => {
  const { data } = await httpClient.get("/careers", { params });
  return {
    data: (data.data ?? []).map(beCareerToFe),
    total: data.total ?? 0,
    page: data.page ?? 1,
    limit: data.limit ?? 10,
    totalPages: data.totalPages ?? 1,
  };
};

export const createCareer = async (
  data: Omit<Career, "id">,
): Promise<Career> => {
  const { data: created } = await httpClient.post(
    "/careers",
    feCareerToBeCreate(data),
  );
  return beCareerToFe(created);
};

export const updateCareer = async (
  id: string,
  data: Partial<Career>,
): Promise<Career> => {
  const { data: updated } = await httpClient.put(
    `/careers/${id}`,
    feCareerToBeUpdate(data),
  );
  return beCareerToFe(updated);
};

export const deleteCareer = async (id: string): Promise<void> => {
  await httpClient.delete(`/careers/${id}`);
};

// ============================================================
// Services — wired to the real backend (NestJS /services)
// ============================================================
export const getServices = async (): Promise<Service[]> => {
  const { data } = await httpClient.get("/services/public");
  return unwrapList(data).map(beServiceToFe);
};

export const getServiceById = async (id: string): Promise<Service> => {
  const { data } = await httpClient.get(`/services/${id}`);
  return beServiceToFe(data);
};

export const getServiceBySlug = async (slug: string): Promise<Service> => {
  const { data } = await httpClient.get("/services/public");
  const items = unwrapList(data);
  const found = items.find((s) => s.slug === slug);
  if (!found) throw new Error("Service not found");
  return beServiceToFe(found);
};

/** Used by admin list page — returns every service, active or not */
export const getAllServicesAdmin = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse<Service>> => {
  const { data } = await httpClient.get("/services", { params });
  return {
    data: (data.data ?? []).map(beServiceToFe),
    total: data.total ?? 0,
    page: data.page ?? 1,
    limit: data.limit ?? 10,
    totalPages: data.totalPages ?? 1,
  };
};

export const createService = async (
  data: Omit<Service, "id">,
): Promise<Service> => {
  const { data: created } = await httpClient.post(
    "/services",
    feServiceToBe(data),
  );
  return beServiceToFe(created);
};

export const updateService = async (
  id: string,
  data: Partial<Service>,
): Promise<Service> => {
  const { data: updated } = await httpClient.put(
    `/services/${id}`,
    feServiceToBe(data),
  );
  return beServiceToFe(updated);
};

export const deleteService = async (id: string): Promise<void> => {
  await httpClient.delete(`/services/${id}`);
};

// ============================================================
// Industries — wired to the real backend (NestJS /site-industries)
// ============================================================
export const getIndustries = async (): Promise<Industry[]> => {
  const { data } = await httpClient.get("/site-industries/public");
  return unwrapList(data) as Industry[];
};

export const getIndustryBySlug = async (
  slug: string,
): Promise<Industry | undefined> => {
  try {
    const { data } = await httpClient.get(
      `/site-industries/public/slug/${slug}`,
    );
    return data;
  } catch {
    return undefined;
  }
};

export const getIndustryById = async (
  id: string,
): Promise<Industry | undefined> => {
  try {
    const { data } = await httpClient.get(`/site-industries/public/${id}`);
    return data;
  } catch {
    return undefined;
  }
};

export const getAllIndustriesAdmin = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse<Industry>> => {
  const { data } = await httpClient.get("/site-industries", { params });
  return {
    data: (data.data ?? []) as Industry[],
    total: data.total ?? 0,
    page: data.page ?? 1,
    limit: data.limit ?? 10,
    totalPages: data.totalPages ?? 1,
  };
};

export const createIndustry = async (
  data: Omit<Industry, "id">,
): Promise<Industry> => {
  const { data: created } = await httpClient.post("/site-industries", data);
  return created;
};

export const updateIndustry = async (
  id: string,
  data: Partial<Industry>,
): Promise<Industry> => {
  const { data: updated } = await httpClient.put(
    `/site-industries/${id}`,
    data,
  );
  return updated;
};

export const deleteIndustry = async (id: string): Promise<void> => {
  await httpClient.delete(`/site-industries/${id}`);
};

// ============================================================
// Success Stories — wired to the real backend (NestJS /site-success-stories)
// ============================================================
export const getSuccessStories = async (
  category?: string,
): Promise<SuccessStory[]> => {
  const { data } = await httpClient.get("/site-success-stories/public", {
    params: category ? { category } : undefined,
  });
  return unwrapList(data) as SuccessStory[];
};

export const getSuccessStoryBySlug = async (
  slug: string,
): Promise<SuccessStory | undefined> => {
  try {
    const { data } = await httpClient.get(
      `/site-success-stories/public/slug/${slug}`,
    );
    return data;
  } catch {
    return undefined;
  }
};

export const getSuccessStoryById = async (
  id: string,
): Promise<SuccessStory | undefined> => {
  try {
    const { data } = await httpClient.get(`/site-success-stories/public/${id}`);
    return data;
  } catch {
    return undefined;
  }
};

export const getAllSuccessStoriesAdmin = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse<SuccessStory>> => {
  const { data } = await httpClient.get("/site-success-stories", { params });
  return {
    data: (data.data ?? []) as SuccessStory[],
    total: data.total ?? 0,
    page: data.page ?? 1,
    limit: data.limit ?? 10,
    totalPages: data.totalPages ?? 1,
  };
};

export const createSuccessStory = async (
  data: Omit<SuccessStory, "id">,
): Promise<SuccessStory> => {
  const { data: created } = await httpClient.post(
    "/site-success-stories",
    data,
  );
  return created;
};

export const updateSuccessStory = async (
  id: string,
  data: Partial<SuccessStory>,
): Promise<SuccessStory> => {
  const { data: updated } = await httpClient.put(
    `/site-success-stories/${id}`,
    data,
  );
  return updated;
};

export const deleteSuccessStory = async (id: string): Promise<void> => {
  await httpClient.delete(`/site-success-stories/${id}`);
};

// ============================================================
// Contact — wired to the real backend (NestJS /contact)
// ============================================================
export const submitContactForm = async (
  data: ContactFormData,
): Promise<{ success: boolean }> => {
  await httpClient.post("/contact", data);
  return { success: true };
};

/** Used by admin contact-submissions page — requires ADMIN/HR auth */
export const getContactSubmissions = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse<ContactSubmission>> => {
  const { data } = await httpClient.get("/contact", { params });
  return data as unknown as PaginatedResponse<ContactSubmission>;
};

export const deleteContactSubmission = async (id: string): Promise<void> => {
  await httpClient.delete(`/contact/${id}`);
};

// ============================================================
// Job Applications — wired to the real backend
// (NestJS POST /careers/:id/apply, GET/PATCH/DELETE /careers/applications)
// ============================================================
export const applyToCareer = async (
  careerId: string,
  form: JobApplicationFormData,
) => {
  const fd = new FormData();
  fd.append("fullName", `${form.firstName} ${form.lastName}`.trim());
  fd.append("email", form.email);
  if (form.phoneNumber) fd.append("phone", form.phoneNumber);
  if (form.coverLetter) fd.append("coverLetter", form.coverLetter);
  if (form.links?.linkedin) fd.append("linkedinUrl", form.links.linkedin);
  if (form.links?.portfolio) fd.append("portfolioUrl", form.links.portfolio);
  if (form.resume) fd.append("resume", form.resume);

  const {
    dateOfBirth,
    gender,
    nationality,
    country,
    state,
    city,
    postalCode,
    address,
    education,
    experience,
    skills,
    additionalQuestions,
    declaration,
  } = form;
  fd.append(
    "extraData",
    JSON.stringify({
      dateOfBirth,
      gender,
      nationality,
      country,
      state,
      city,
      postalCode,
      address,
      education,
      experience,
      skills,
      additionalQuestions,
      declaration,
    }),
  );

  const { data } = await httpClient.post(`/careers/${careerId}/apply`, fd, {
    headers: { "Content-Type": undefined },
  });
  return data;
};

export const getJobApplications = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { data } = await httpClient.get("/careers/applications", { params });
  return data as unknown as PaginatedResponse<Record<string, unknown>>;
};

export const updateJobApplicationStatus = async (
  id: string,
  status: string,
) => {
  const { data } = await httpClient.patch(
    `/careers/applications/${id}/status`,
    { status },
  );
  return data;
};

export const deleteJobApplication = async (id: string): Promise<void> => {
  await httpClient.delete(`/careers/applications/${id}`);
};

// ============================================================
// Why Choose Us — static content, not stored in DB
// ============================================================
export const getWhyChooseUs = async () => {
  await delay(400);
  return mockWhyChooseUs;
};

// ============================================================
// Uploads — generic image upload helper used by ImageUpload.tsx
// ============================================================
export const uploadImage = async (
  file: File,
  folder = "website/images",
): Promise<string> => {
  const fd = new FormData();
  fd.append("file", file);
  const { data } = await httpClient.post(
    `/uploads/image?folder=${encodeURIComponent(folder)}`,
    fd,
    {
      headers: { "Content-Type": undefined },
    },
  );
  return data?.url || data?.data?.url;
};

// ============================================================
// Settings — wired to the real backend (NestJS /settings)
// ============================================================

export const getSettings = async (): Promise<SiteSettings> => {
  const { data } = await httpClient.get("/settings");
  return data as SiteSettings;
};

export const getPublicSettings = async (): Promise<SiteSettings> => {
  const { data } = await httpClient.get("/settings/public");
  return data as SiteSettings;
};

export const updateSettings = async (
  data: Partial<Omit<SiteSettings, "id">>,
): Promise<SiteSettings> => {
  const { data: updated } = await httpClient.patch("/settings", data);
  return updated as SiteSettings;
};

// ============================================================
// Admin Stats — wired to the real backend (NestJS /admin/stats).
// Server scopes the response to the caller's permissions, so an HR user
// only gets counts back for the modules they were actually granted.
// ============================================================
export interface AdminStats {
  blogs?: number;
  careers?: number;
  services?: number;
  industries?: number;
  successStories?: number;
  contacts?: number;
  applications?: number;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  const { data } = await httpClient.get("/admin/stats");
  return data as AdminStats;
};
