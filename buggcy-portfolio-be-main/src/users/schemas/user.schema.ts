import { z } from 'zod';
import { Role } from '../../common/enums/role.enum';
import { PERMISSION_MODULES } from '../../common/enums/permission-module.enum';

const RoleSchema = z.enum(Role, {
  message: `Role must be one of: ${Object.values(Role).join(', ')}`,
});

// De-dupe so re-saving the same permission set from the frontend twice is a no-op.
const PermissionsSchema = z
  .array(
    z.enum(PERMISSION_MODULES, {
      message: `Invalid permission. Allowed: ${PERMISSION_MODULES.join(', ')}`,
    }),
  )
  .transform((permissions) => Array.from(new Set(permissions)));

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Must be a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: RoleSchema.optional().default(Role.HR),
  permissions: PermissionsSchema.optional().default([]),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

// NOTE: intentionally NOT `CreateUserSchema.partial()`. Zod's `.optional()`
// short-circuits on `undefined` before running the inner schema, but a
// `.partial()` field still carries CreateUserSchema's `.default(...)` beneath
// that optional wrapper. Omitting `role`/`permissions` from an edit payload
// would silently reset the user to `role: 'hr', permissions: []` on save.
// Defining Update fields with no defaults keeps unspecified fields untouched.
export const UpdateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().min(1, 'Email is required').email('Must be a valid email address').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  role: RoleSchema.optional(),
  permissions: PermissionsSchema.optional(),
});
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;

export const UserFilterSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export type UserFilterDto = z.infer<typeof UserFilterSchema>;
