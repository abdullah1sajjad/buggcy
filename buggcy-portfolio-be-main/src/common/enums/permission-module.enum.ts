/**
 * Every module key that can be granted to a non-admin user via `user.permissions`.
 * Must stay in sync with the `@RequireModule(...)` keys used across controllers -
 * PermissionsGuard checks membership in this exact set.
 */
export const PERMISSION_MODULES = [
  'blogs',
  'careers',
  'services',
  'industries',
  'success-stories',
  'contact-submissions',
  'applications',
  'settings',
] as const;

export type PermissionModule = (typeof PERMISSION_MODULES)[number];
