import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdminStore } from "../../store/adminStore";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import ToastContainer from "../../components/ui/ToastContainer";
export default function AdminLayout() {
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated);
  const hasHydrated = useAdminStore((s) => s.hasHydrated);
  const hydrate = useAdminStore((s) => s.hydrate);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close mobile sidebar on route change (via popstate)
  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Wait for the fresh permission check to come back from the backend
  // before rendering any permission-gated nav/content. Rendering early
  // here is what caused modules to flash into view (using stale cached
  // permissions from localStorage) and then disappear/403 once the real
  // permissions loaded or the underlying data request came back Forbidden.
  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ToastContainer />
      {/* Desktop sidebar - fixed */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-40">
        <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <AdminSidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
      </div>

      {/* Header - fixed at top, starts after sidebar */}
      <div
        className={`fixed top-0 right-0 z-30 transition-all duration-300 ${collapsed ? "left-[80px]" : "left-64"
          }`}
      >
        <AdminHeader onMenuToggle={() => setMobileOpen(!mobileOpen)} />
      </div>

      <div
        className={`transition-all duration-300 pt-14 sm:pt-16 ${collapsed ? "md:ml-[80px]" : "md:ml-64"
          }`}
      >
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
