export enum Role {
  ADMIN = 'admin',
  HR    = 'hr',
  BD    = 'bd',
}

/** Non-admin roles that are granted access module-by-module via `user.permissions`. */
export const STAFF_ROLES = [Role.HR, Role.BD] as const;
