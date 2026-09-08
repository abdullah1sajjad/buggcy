import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  getBlogById,
  getCareerById,
  getServiceById,
  getServiceBySlug,
  getIndustryBySlug,
  getSuccessStoryBySlug,
  getBlogs,
  getCareers,
  getServices,
  getAllBlogsAdmin,
  getAllCareersAdmin,
  getAllServicesAdmin,
  getAllIndustriesAdmin,
  getAllSuccessStoriesAdmin,
  getIndustries,
  getSuccessStories,
  submitContactForm,
  getWhyChooseUs,
  createBlog,
  updateBlog,
  deleteBlog,
  createCareer,
  updateCareer,
  deleteCareer,
  createService,
  updateService,
  deleteService,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
  getContactSubmissions,
  deleteContactSubmission,
  getJobApplications,
  updateJobApplicationStatus,
  deleteJobApplication,
  getIndustryById,
  getSuccessStoryById,
  getSettings,
  updateSettings,
  getPublicSettings,
  getAdminStats,
} from "./api";
import { getUsers } from "./usersApi";

// Blogs
export const useBlogsQuery = (category?: string) => {
  return useQuery({
    queryKey: ["blogs", category],
    queryFn: () => getBlogs(category),
  });
};

export const useBlogQuery = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });
};

/** Admin list page: returns every blog regardless of status */
export const useAdminBlogsQuery = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["blogs", "admin", params],
    queryFn: () => getAllBlogsAdmin(params),
    placeholderData: keepPreviousData,
  });
};

export const useCreateBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export const useUpdateBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updateBlog>[1];
    }) => updateBlog(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export const useDeleteBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

// Careers
export const useCareersQuery = () => {
  return useQuery({
    queryKey: ["careers"],
    queryFn: getCareers,
  });
};

export const useCareerQuery = (id: string) => {
  return useQuery({
    queryKey: ["career", id],
    queryFn: () => getCareerById(id),
    enabled: !!id,
  });
};

/** Admin list page: returns every career regardless of status */
export const useAdminCareersQuery = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["careers", "admin", params],
    queryFn: () => getAllCareersAdmin(params),
    placeholderData: keepPreviousData,
  });
};

export const useCreateCareer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCareer,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["careers"] }),
  });
};

export const useUpdateCareer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updateCareer>[1];
    }) => updateCareer(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["careers"] }),
  });
};

export const useDeleteCareer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCareer,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["careers"] }),
  });
};

// Services
export const useServicesQuery = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
};

export const useServiceQuery = (id: string) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });
};

export const useServiceBySlugQuery = (slug: string) => {
  return useQuery({
    queryKey: ["service", "slug", slug],
    queryFn: () => getServiceBySlug(slug),
    enabled: !!slug,
    retry: false,
  });
};

/** Admin list page: returns every service, active or not */
export const useAdminServicesQuery = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["services", "admin", params],
    queryFn: () => getAllServicesAdmin(params),
    placeholderData: keepPreviousData,
  });
};

export const useCreateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createService,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
};

export const useUpdateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updateService>[1];
    }) => updateService(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
};

export const useDeleteService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
};

// Industries
export const useIndustriesQuery = () => {
  return useQuery({
    queryKey: ["industries"],
    queryFn: getIndustries,
  });
};

export const useIndustryBySlugQuery = (slug: string) => {
  return useQuery({
    queryKey: ["industry", slug],
    queryFn: () => getIndustryBySlug(slug),
    enabled: !!slug,
  });
};

export const useIndustryQuery = (id: string) => {
  return useQuery({
    queryKey: ["industry", id],
    queryFn: () => getIndustryById(id),
    enabled: !!id,
  });
};

export const useCreateIndustry = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createIndustry,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["industries"] }),
  });
};

export const useUpdateIndustry = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updateIndustry>[1];
    }) => updateIndustry(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["industries"] }),
  });
};

export const useDeleteIndustry = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteIndustry,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["industries"] }),
  });
};

/** Admin list page: returns paginated industries */
export const useAdminIndustriesQuery = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["industries", "admin", params],
    queryFn: () => getAllIndustriesAdmin(params),
    placeholderData: keepPreviousData,
  });
};

// Success Stories
export const useSuccessStoriesQuery = (category?: string) => {
  return useQuery({
    queryKey: ["successStories", category],
    queryFn: () => getSuccessStories(category),
  });
};

export const useSuccessStoryBySlugQuery = (slug: string) => {
  return useQuery({
    queryKey: ["successStory", slug],
    queryFn: () => getSuccessStoryBySlug(slug),
    enabled: !!slug,
  });
};

export const useSuccessStoryQuery = (id: string) => {
  return useQuery({
    queryKey: ["successStory", id],
    queryFn: () => getSuccessStoryById(id),
    enabled: !!id,
  });
};

export const useCreateSuccessStory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createSuccessStory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["successStories"] }),
  });
};

export const useUpdateSuccessStory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updateSuccessStory>[1];
    }) => updateSuccessStory(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["successStories"] }),
  });
};

export const useDeleteSuccessStory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteSuccessStory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["successStories"] }),
  });
};

/** Admin list page: returns paginated success stories */
export const useAdminSuccessStoriesQuery = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["successStories", "admin", params],
    queryFn: () => getAllSuccessStoriesAdmin(params),
    placeholderData: keepPreviousData,
  });
};

// Contact
export const useContactMutation = () => {
  return useMutation({
    mutationFn: submitContactForm,
  });
};

export const useContactSubmissionsQuery = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["contactSubmissions", params],
    queryFn: () => getContactSubmissions(params),
    placeholderData: keepPreviousData,
  });
};

export const useDeleteContactSubmission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteContactSubmission,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contactSubmissions"] }),
  });
};

// Job Applications
export const useJobApplicationsQuery = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["jobApplications", params],
    queryFn: () => getJobApplications(params),
    placeholderData: keepPreviousData,
  });
};

export const useDeleteJobApplication = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteJobApplication,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobApplications"] }),
  });
};

export const useUpdateJobApplicationStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateJobApplicationStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobApplications"] }),
  });
};

// Why Choose Us
export const useWhyChooseUsQuery = () => {
  return useQuery({
    queryKey: ["whyChooseUs"],
    queryFn: getWhyChooseUs,
  });
};

// Settings
export const useSettingsQuery = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
};

// Public settings — used by Footer/Navbar/Contact page (no auth required)
export const usePublicSettingsQuery = () => {
  return useQuery({
    queryKey: ["settings", "public"],
    queryFn: getPublicSettings,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateSettings = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};

// Admin dashboard stats — server-scoped to the caller's permissions
export const useAdminStatsQuery = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
  });
};

/** Admin list page: returns paginated users */
export const useAdminUsersQuery = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["users", "admin", params],
    queryFn: () => getUsers(params),
    placeholderData: keepPreviousData,
  });
};
