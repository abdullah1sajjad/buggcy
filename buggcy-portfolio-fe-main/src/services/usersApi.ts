import { httpClient } from "./httpClient";

export interface BackendUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "hr" | "bd";
  permissions: string[];
  isActive: boolean;
  createdAt: string;
}

export interface PaginatedUsers {
  data: BackendUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedUsers> => {
  const { data } = await httpClient.get("/users", { params });
  return data;
};

export const getUser = async (id: string): Promise<BackendUser> => {
  const { data } = await httpClient.get(`/users/${id}`);
  return data;
};

export const createUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: "admin" | "hr" | "bd";
  permissions: string[];
}): Promise<BackendUser> => {
  const { data } = await httpClient.post("/users", payload);
  return data;
};

export const updateUser = async (
  id: string,
  payload: Partial<{
    name: string;
    email: string;
    password: string;
    role: "admin" | "hr" | "bd";
    permissions: string[];
  }>,
): Promise<BackendUser> => {
  const { data } = await httpClient.put(`/users/${id}`, payload);
  return data;
};

export const toggleUserActive = async (id: string): Promise<BackendUser> => {
  const { data } = await httpClient.patch(`/users/${id}/toggle-active`);
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await httpClient.delete(`/users/${id}`);
};
