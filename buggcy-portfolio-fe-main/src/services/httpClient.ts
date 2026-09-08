import axios, { AxiosError } from "axios";
import { TOKEN_KEY } from "./tokenStorage";
import { useToastStore, ToastTypeEnum } from "../store/toastStore";

export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ||
  "http://localhost:3000/api/v1";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT (if present) to every outgoing request
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Every NestJS response is wrapped as { success, data, message, timestamp }.
// Unwrap it here so callers just get the payload.
httpClient.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toLowerCase();
    const isMutation = ["post", "put", "patch", "delete"].includes(
      method || "",
    );
    const resData = response.data;

    if (resData && typeof resData === "object") {
      if (isMutation && resData.success) {
        const msg =
          resData.message && resData.message !== "Success"
            ? resData.message
            : "Operation completed successfully";
        useToastStore.getState().addToast(ToastTypeEnum.SUCCESS, msg);
      }
      if ("data" in resData) {
        response.data = resData.data;
      }
    }
    return response;
  },
  (error: AxiosError<{ message?: string | string[]; error?: string }>) => {
    if (error.response?.status === 401) {
      import("../store/adminStore").then(({ useAdminStore }) => {
        useAdminStore.getState().logout();
      });
    }
    const payload = error.response?.data;
    const isValidation =
      error.response?.status === 400 && Array.isArray(payload?.message);

    // Validation errors from the backend look like "password: Password must
    // be at least 8 characters" — the field name is baked into the message
    // so per-field UIs (useFormErrors) can split on it. For flat display
    // (toasts, single-message banners) that field prefix is just noise, so
    // strip it here.
    const stripFieldPrefix = (m: string) => {
      const idx = m.indexOf(": ");
      return idx !== -1 ? m.slice(idx + 2) : m;
    };

    const rawMsg = Array.isArray(payload?.message)
      ? payload.message.map(stripFieldPrefix).join(", ")
      : payload?.message ||
        payload?.error ||
        error.message ||
        "Something went wrong";

    const msg = rawMsg.replace(/^[A-Za-z]+Exception:\s*/, "");

    error.message = msg;
    const method = error.config?.method?.toLowerCase() || "";
    const isMutation = ["post", "put", "patch", "delete"].includes(method);

    if (!isValidation && !(error.config as any)?._noToast && isMutation) {
      useToastStore.getState().addToast(ToastTypeEnum.ERROR, msg);
    }

    return Promise.reject(error);
  },
);
