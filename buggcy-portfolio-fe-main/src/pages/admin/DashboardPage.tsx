import { useNavigate } from "react-router-dom";
import {
  FileText,
  Briefcase,
  Cpu,
  Globe,
  Trophy,
  Mail,
  Users,
  ArrowRight,
  Plus,
} from "lucide-react";
import { useAdminStore } from "../../store/adminStore";
import { useAdminStatsQuery } from "../../services/queries";
import type { AdminStats } from "../../services/api";

interface StatDef {
  key: keyof AdminStats;
  label: string;
  icon: React.ElementType;
  color: string;
  href: string;
  addHref?: string;
}

const STAT_DEFS: StatDef[] = [
  { key: "blogs", label: "Blogs", icon: FileText, color: "text-blue-500 bg-blue-500/10", href: "/admin/blogs", addHref: "/admin/blogs/new" },
  { key: "careers", label: "Careers", icon: Briefcase, color: "text-green-500 bg-green-500/10", href: "/admin/careers", addHref: "/admin/careers/new" },
  { key: "services", label: "Services", icon: Cpu, color: "text-purple-500 bg-purple-500/10", href: "/admin/services", addHref: "/admin/services/new" },
  { key: "industries", label: "Industries", icon: Globe, color: "text-orange-500 bg-orange-500/10", href: "/admin/industries", addHref: "/admin/industries/new" },
  { key: "successStories", label: "Stories", icon: Trophy, color: "text-yellow-500 bg-yellow-500/10", href: "/admin/success-stories", addHref: "/admin/success-stories/new" },
  { key: "contacts", label: "Submissions", icon: Mail, color: "text-pink-500 bg-pink-500/10", href: "/admin/contact-submissions" },
  { key: "applications", label: "Applications", icon: Users, color: "text-cyan-500 bg-cyan-500/10", href: "/admin/applications" },
];

const SKELETON_COUNT = 4;

function StatCardSkeleton() {
  return (
    <div className="p-5 rounded-xl border border-border bg-card animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-muted" />
        <div className="space-y-2">
          <div className="h-6 w-16 rounded bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const user = useAdminStore((s) => s.user);
  const navigate = useNavigate();
  const { data: stats, isLoading } = useAdminStatsQuery();

  const visibleStats = STAT_DEFS.filter((def) => stats && stats[def.key] !== undefined);

  const totalItems = visibleStats.reduce((sum, def) => sum + (stats?.[def.key] ?? 0), 0);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            Welcome back, <span className="text-primary">{user?.name?.split(" ")[0] || "Admin"}</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Here's what's happening with your content.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <span>{totalItems} total items</span>
        </div>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      ) : visibleStats.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No modules have been assigned to your account yet. Contact an admin to get access.
        </p>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {visibleStats.map((def) => (
            <div
              key={def.key}
              className="rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-200 overflow-hidden"
            >
              <button
                onClick={() => navigate(def.href)}
                className="group w-full p-5 text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${def.color}`}>
                    <def.icon size={20} />
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-muted-foreground/0 group-hover:text-primary transition-all duration-200 mt-1"
                  />
                </div>
                <p className="text-2xl font-bold text-foreground">{stats?.[def.key] ?? 0}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{def.label}</p>
              </button>
              {def.addHref && (
                <>
                  <div className="border-t border-border" />
                  <button
                    onClick={() => navigate(def.addHref!)}
                    className="w-full px-5 py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-primary hover:bg-primary/5 transition-all duration-200"
                  >
                    <Plus size={14} />
                    New {def.label.replace(/s$/, "")}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
