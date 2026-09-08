import { create } from "zustand";
import {
  loginRequest,
  fetchProfile,
  setStoredToken,
  clearStoredToken,
  getStoredToken,
} from "../services/auth";
import type { AuthUser as BackendAuthUser } from "../services/auth";

// Permissions are a frontend-only concept layered on top of the backend's
// roles (admin / hr / bd). Admin gets everything; HR and BD get a
// read-focused subset relevant to their function, based on granted permissions.
export type Permission =
  | "blogs"
  | "careers"
  | "services"
  | "industries"
  | "success-stories"
  | "contact-submissions"
  | "applications"
  | "settings";

export type Role = "admin" | "hr" | "bd";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  permissions: Permission[];
}

const ALL_PERMISSIONS: Permission[] = [
  "blogs",
  "careers",
  "services",
  "industries",
  "success-stories",
  "contact-submissions",
  "applications",
  "settings",
];

// const HR_PERMISSIONS: Permission[] = ["dashboard", "careers", "applications"];

// function permissionsForRole(role: Role): Permission[] {
//   return role === "admin" ? ALL_PERMISSIONS : HR_PERMISSIONS;
// }

function toAuthUser(
  u: BackendAuthUser & { permissions?: Permission[] },
): AuthUser {
  const role = (u.role as Role) || "hr";
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    role,
    permissions: role === "admin" ? ALL_PERMISSIONS : (u.permissions ?? []),
  };
}

interface AdminState {
  isAuthenticated: boolean;
  isLoading: boolean;
  /** True once hydrate() has resolved at least once for this page load.
   *  Consumers should avoid rendering permission-gated content/making
   *  data requests until this is true, otherwise stale cached permissions
   *  from localStorage can briefly show content the user no longer has
   *  access to (or the request goes out before fresh permissions load). */
  hasHydrated: boolean;
  user: AuthUser | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  /** Re-validate the stored token against the backend on app load */
  hydrate: () => Promise<void>;
  hasPermission: (permission: Permission) => boolean;
}

function loadStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("buggcy_auth_user");
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export const useAdminStore = create<AdminState>((set, get) => ({
  isAuthenticated: !!getStoredToken(),
  isLoading: false,
  hasHydrated: !getStoredToken(), // nothing to hydrate if not logged in
  user: loadStoredUser(),

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const res = await loginRequest(email, password);
      setStoredToken(res.accessToken);
      const authUser = toAuthUser(res.user);
      localStorage.setItem("buggcy_auth_user", JSON.stringify(authUser));
      set({ isAuthenticated: true, user: authUser, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      return {
        success: false,
        error: err instanceof Error ? err.message : "Login failed",
      };
    }
  },

  logout: () => {
    clearStoredToken();
    localStorage.removeItem("buggcy_auth_user");
    set({ isAuthenticated: false, user: null });
  },

  hydrate: async () => {
    const token = getStoredToken();
    if (!token) {
      set({ hasHydrated: true });
      return;
    }
    try {
      const profile = await fetchProfile();
      const authUser = toAuthUser(profile);
      localStorage.setItem("buggcy_auth_user", JSON.stringify(authUser));
      set({ isAuthenticated: true, user: authUser, hasHydrated: true });
    } catch {
      // Token expired/invalid
      clearStoredToken();
      localStorage.removeItem("buggcy_auth_user");
      set({ isAuthenticated: false, user: null, hasHydrated: true });
    }
  },

  hasPermission: (permission) => {
    const user = get().user;
    if (!user) return false;
    if (user.role === "admin") return true;
    return user.permissions.includes(permission);
  },
}));

export const ROLE_LABELS: Record<Role, string> = {
  admin: "Admin",
  hr: "HR",
  bd: "BD",
};

/**
 * Default module permissions applied when a role is selected/changed on the
 * Admin User Creation/Edit forms. These are only a starting point — an admin
 * can still check/uncheck individual modules for HR and BD users afterwards.
 *
 * NOTE: this project doesn't yet have dedicated "Leads"/"Clients" modules.
 * Until those exist, BD defaults map to the closest available modules:
 * "contact-submissions" (inbound leads) and "success-stories" (client wins).
 * Update this map if/when dedicated BD modules are added.
 */
export const ROLE_DEFAULT_PERMISSIONS: Record<Role, Permission[]> = {
  admin: ALL_PERMISSIONS,
  hr: ["careers", "blogs", "applications"],
  bd: ["contact-submissions", "success-stories"],
};

export const PERMISSION_LABELS: Record<Permission, string> = {
  blogs: "Blogs",
  careers: "Careers",
  services: "Services",
  industries: "Industries",
  "success-stories": "Success Stories",
  "contact-submissions": "Contact Submissions",
  applications: "Applications",
  settings: "Settings",
};

export const ALL_PERMISSIONS_LIST = ALL_PERMISSIONS;
