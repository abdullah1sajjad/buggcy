import { Navigate } from "react-router-dom";
import { useAdminStore, type Permission } from "../../store/adminStore";

interface RequirePermissionProps {
  permission: Permission;
  children: React.ReactNode;
}

/**
 * Wrap an admin route element with this to keep HR users from landing on
 * (and firing failing API calls against) a module the Admin hasn't granted
 * them access to. Admin role always passes. Should be rendered under
 * AdminLayout, which already waits for hasHydrated before rendering routes,
 * so `user`/`hasPermission` here reflect the freshly-fetched permissions.
 */
export default function RequirePermission({
  permission,
  children,
}: RequirePermissionProps) {
  const hasPermission = useAdminStore((s) => s.hasPermission);

  if (!hasPermission(permission)) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
