import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUser, createUser, updateUser } from "../../../services/usersApi";
import { ROLE_LABELS, ROLE_DEFAULT_PERMISSIONS } from "../../../store/adminStore";
import {
  ALL_PERMISSIONS_LIST,
  PERMISSION_LABELS,
  type Permission,
} from "../../../store/adminStore";
import { PermissionsField } from "../../../components/admin/FormFields";

type RoleValue = "admin" | "hr" | "bd";

export default function AdminUserFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: existing } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id as string),
    enabled: isEdit,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RoleValue>("hr");
  const [error, setError] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([
    ...ROLE_DEFAULT_PERMISSIONS.hr,
  ]);

  useEffect(() => {
    if (existing) {
      setName(existing.name);
      setEmail(existing.email);
      setRole(existing.role);
      setPermissions((existing.permissions as Permission[]) ?? []);
    }
  }, [existing]);

  /**
   * Applies each role's default module permissions. Only called from the
   * role <select>'s onChange — i.e. only when the admin actively changes the
   * role — so it never clobbers permissions loaded from an existing user
   * record (that's handled separately by the effect above).
   */
  const handleRoleChange = (newRole: RoleValue) => {
    setRole(newRole);
    setPermissions([...ROLE_DEFAULT_PERMISSIONS[newRole]]);
  };

  const createMutation = useMutation({ mutationFn: createUser });
  const updateMutation = useMutation({
    mutationFn: (payload: Parameters<typeof updateUser>[1]) =>
      updateUser(id as string, payload),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      return;
    }
    if (!isEdit && !password.trim()) {
      setError("Password is required for new users");
      return;
    }

    try {
      if (isEdit) {
        const payload: Record<string, unknown> = {
          name: name.trim(),
          email: email.trim(),
          role,
          permissions,
        };
        if (password.trim()) payload.password = password.trim();
        await updateMutation.mutateAsync(payload);
      } else {
        await createMutation.mutateAsync({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
          role,
          permissions,
        });
      }
      navigate("/admin/users");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          {isEdit ? "Edit User" : "Add New User"}
        </h2>
        <p className="text-muted-foreground mt-1">
          {isEdit ? "Update user details" : "Create a new admin, HR, or BD user"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">Basic Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Password{" "}
              {isEdit && (
                <span className="text-muted-foreground font-normal">
                  (leave blank to keep current)
                </span>
              )}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isEdit ? "••••••••" : "Enter password"}
              required={!isEdit}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">Role</h3>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => handleRoleChange(e.target.value as RoleValue)}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            >
              {(Object.entries(ROLE_LABELS) as [RoleValue, string][]).map(
                ([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ),
              )}
            </select>
            {role !== "admin" && (
              <div className="pt-2">
                <PermissionsField
                  options={ALL_PERMISSIONS_LIST}
                  labels={PERMISSION_LABELS}
                  values={permissions}
                  onChange={setPermissions}
                  helperText={`Dashboard is always visible. Check the modules this ${ROLE_LABELS[role]} user should also access. Selecting a different role above resets these to that role's defaults — individual checks made here are kept otherwise, including after saving.`}
                />
              </div>
            )}
            {role === "admin" && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                Full access: content, careers, applications, and user management
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isPending ? "Saving..." : isEdit ? "Update User" : "Create User"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
