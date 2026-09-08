import { ExternalLink, Menu, Sun, Moon } from "lucide-react";
import { useAdminStore, ROLE_LABELS } from "../../store/adminStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/blogs": "Blogs",
  "/admin/careers": "Careers",
  "/admin/services": "Services",
  "/admin/industries": "Industries",
  "/admin/success-stories": "Success Stories",
  "/admin/contact-submissions": "Contact Submissions",
  "/admin/applications": "Applications",
  "/admin/users": "Admin Users",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/admin/blogs")) return "Blog";
  if (pathname.startsWith("/admin/careers")) return "Career";
  if (pathname.startsWith("/admin/services")) return "Service";
  if (pathname.startsWith("/admin/industries")) return "Industry";
  if (pathname.startsWith("/admin/success-stories")) return "Success Story";
  if (pathname.startsWith("/admin/users")) return "User";
  return "Admin";
}

interface AdminHeaderProps {
  onMenuToggle?: () => void;
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const user = useAdminStore((s) => s.user);
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const syncTheme = () => setDarkMode(localStorage.getItem("theme") === "dark");
    window.addEventListener("theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);
    return () => {
      window.removeEventListener("theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(new Event("theme-change"));
  };

  return (
    <header className="h-14 sm:h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors md:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-foreground">
          {getPageTitle(location.pathname)}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-200"
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {/* Visit Website */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-200"
        >
          <ExternalLink size={16} />
          <span className="hidden lg:inline">Visit Website</span>
        </a>
        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-border">
          <div className="w-9 h-9 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-primary">
              {user?.name?.charAt(0) || "A"}
            </span>
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">
              {user?.role ? ROLE_LABELS[user.role] : user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
