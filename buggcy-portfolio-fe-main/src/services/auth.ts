import { httpClient } from "./httpClient";
import {
  setStoredToken,
  clearStoredToken,
  getStoredToken,
} from "./tokenStorage";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "hr" | "bd";
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  user: AuthUser;
}

export const loginRequest = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const { data } = await httpClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return data as unknown as LoginResponse;
};

export const fetchProfile = async (): Promise<AuthUser> => {
  const { data } = await httpClient.get<AuthUser>("/auth/me");
  return data as unknown as AuthUser;
};

export const forgotPassword = async (
  email: string,
): Promise<{ message: string }> => {
  const { data } = await httpClient.post<{ message: string }>(
    "/auth/forgot-password",
    { email },
  );
  return data as unknown as { message: string };
};

export const resetPassword = async (
  token: string,
  newPassword: string,
): Promise<{ message: string }> => {
  const { data } = await httpClient.post<{ message: string }>(
    "/auth/reset-password",
    { token, newPassword },
  );
  return data as unknown as { message: string };
};

export { setStoredToken, clearStoredToken, getStoredToken };
