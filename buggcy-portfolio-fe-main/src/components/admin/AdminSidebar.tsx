import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Cpu,
  Globe,
  Trophy,
  Mail,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Home,
  Info,
  Newspaper,
  ExternalLink,
  ChevronDown,
  Shield,
  Sun,
  Moon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAdminStore, type Permission } from "../../store/adminStore";
import logo from "../../assets/black-logo.png";
import favicon from "../../assets/favicon.webp";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  permission?: Permission;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Blogs", href: "/admin/blogs", icon: FileText, permission: "blogs" },
      { label: "Careers", href: "/admin/careers", icon: Briefcase, permission: "careers" },
      { label: "Services", href: "/admin/services", icon: Cpu, permission: "services" },
      { label: "Industries", href: "/admin/industries", icon: Globe, permission: "industries" },
      { label: "Success Stories", href: "/admin/success-stories", icon: Trophy, permission: "success-stories" },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Submissions", href: "/admin/contact-submissions", icon: Mail, permission: "contact-submissions" },
      { label: "Project Leads", href: "/admin/project-leads", icon: FileText },
      { label: "Applications", href: "/admin/applications", icon: Users, permission: "applications" },
      { label: "Settings", href: "/admin/settings", icon: Settings, permission: "settings" },
    ],
  },
];

const websiteLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Services", href: "/services", icon: Cpu },
  { label: "Industries", href: "/industries", icon: Globe },
  { label: "Stories", href: "/success-stories", icon: Trophy },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "Careers", href: "/careers", icon: Briefcase },
  { label: "Contact", href: "/contact", icon: Mail },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const location = useLocation();
  const { logout, user, hasPermission } = useAdminStore();
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncTheme = () => setDarkMode(localStorage.getItem("theme") === "dark");
    window.addEventListener("theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);
    return () => {
      window.removeEventListener("theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [profileOpen]);

  const handleNavClick = () => {
    if (window.innerWidth < 768) onToggle();
  };

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

  const isActive = (href: string) =>
    href === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(href);

  return (
    <aside
      className={`h-full bg-card border-r border-border z-40 flex flex-col transition-all duration-300 ${
        collapsed ? "md:w-[72px]" : "w-64"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex items-center h-16 border-b border-border shrink-0 ${
          collapsed ? "justify-center px-2" : "justify-between px-4"
        }`}
      >
        {!collapsed ? (
          <Link to="/admin" className="flex items-center shrink-0" onClick={handleNavClick}>
            <img
              src={logo}
              alt="Buggcy"
              className={`h-10 w-auto object-contain ${darkMode ? "brightness-0 invert" : ""}`}
            />
          </Link>
        ) : (
          <Link to="/admin" className="flex items-center justify-center" onClick={handleNavClick} title="Buggcy Admin">
            <img src={favicon} alt="B" className="w-9 h-9 object-contain" />
          </Link>
        )}
        {!collapsed && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        {collapsed && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            title="Expand sidebar"
          >
            <ChevronLeft size={16} className="rotate-180" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-4 overflow-y-auto">
        {navGroups.map((group) => {
          const filteredItems = group.items.filter(
            (item) => !item.permission || hasPermission(item.permission),
          );
          if (filteredItems.length === 0) return null;

          return (
            <div key={group.title || "main"}>
              {group.title && !collapsed && (
                <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {group.title}
                </p>
              )}
              <div className="space-y-0.5">
                {filteredItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={handleNavClick}
                      className={`group flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
                      } ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon
                        size={18}
                        className={`shrink-0 transition-colors duration-200 ${
                          active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Users - admin only */}
        {user?.role === "admin" && (
          <div>
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                Admin
              </p>
            )}
            <div className="space-y-0.5">
              <Link
                to="/admin/users"
                onClick={handleNavClick}
                className={`group flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
                } ${
                  isActive("/admin/users")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                title={collapsed ? "Users" : undefined}
              >
                <Shield
                  size={18}
                  className={`shrink-0 ${
                    isActive("/admin/users") ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                {!collapsed && <span className="truncate">Users</span>}
              </Link>
            </div>
          </div>
        )}

        {/* Website Links */}
        {!collapsed ? (
          <div className="border-t border-border pt-3">
            <button
              onClick={() => setWebsiteOpen(!websiteOpen)}
              className="flex items-center gap-2 w-full px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${websiteOpen ? "" : "-rotate-90"}`}
              />
              Visit Pages
            </button>
            {websiteOpen && (
              <div className="mt-1 space-y-0.5">
                {websiteLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                  >
                    <item.icon size={16} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                    <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-50 shrink-0 transition-opacity" />
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="border-t border-border pt-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              title="Visit Website"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        )}
      </nav>

      {/* Profile Section */}
      <div className="p-2 border-t border-border shrink-0 relative" ref={profileRef}>
        {!collapsed ? (
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary">{user?.name?.charAt(0) || "A"}</span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name || "Admin"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
            <ChevronDown
              size={14}
              className={`shrink-0 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>
        ) : (
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center justify-center w-full p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            title="Profile"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">{user?.name?.charAt(0) || "A"}</span>
            </div>
          </button>
        )}

        {/* Profile Dropdown */}
        {profileOpen && (
          <div
            className={`absolute bottom-full mb-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50 ${
              collapsed ? "left-2 w-60" : "left-2 right-2"
            }`}
          >
            <div className="p-4 bg-muted/50 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{user?.name?.charAt(0) || "A"}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{user?.name || "Admin"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full">
                    {user?.role || "admin"}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-1.5">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                <ExternalLink size={16} />
                Visit Website
              </a>
              <div className="my-1 border-t border-border" />
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-all duration-200"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
