import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Moon,
  Sun,
  ChevronDown,
  Code2,
  Smartphone,
  Globe,
  Brain,
  ShieldCheck,
  Database,
  BarChart3,
  Cloud,
  Palette,
  TestTube2,
  Settings,
  Layers,
  Building2,
  HeartPulse,
  GraduationCap,
  ShoppingCart,
  Banknote,
  Truck,
  Factory,
  Gamepad2,
  BookOpen,
  TrendingUp,
  X,
  Menu,
  ArrowRight,
} from "lucide-react";

import b_logo from "../../assets/black-logo.png";
import { usePublicSettingsQuery } from "../../services/queries";
/* ─────────────── NAV DATA ─────────────── */
const services = {
  label: "Services",
  href: "/services",
  columns: [
    {
      heading: "Development",
      items: [
        {
          icon: Code2,
          label: "Web Development",
          desc: "Custom full-stack web apps",
          href: "/services/web-development",
        },
        {
          icon: Smartphone,
          label: "Mobile App Development",
          desc: "iOS & Android solutions",
          href: "/services/mobile-development",
        },
        {
          icon: Globe,
          label: "Frontend Development",
          desc: "Pixel-perfect React & Next.js",
          href: "/services/frontend",
        },
        {
          icon: Settings,
          label: "Backend Development",
          desc: "Scalable APIs & microservices",
          href: "/services/backend",
        },
        {
          icon: Layers,
          label: "Full-Stack Development",
          desc: "End-to-end product delivery",
          href: "/services/fullstack",
        },
      ],
    },
    {
      heading: "Design & QA",
      items: [
        {
          icon: Palette,
          label: "UI/UX Design",
          desc: "Intuitive, beautiful interfaces",
          href: "/services/ui-ux-design",
        },
        {
          icon: TestTube2,
          label: "QA & Testing",
          desc: "Bug-free product assurance",
          href: "/services/qa-testing",
        },
        {
          icon: Smartphone,
          label: "Product Design",
          desc: "From concept to clickable",
          href: "/services/product-design",
        },
      ],
    },
    {
      heading: "Emerging Tech",
      items: [
        {
          icon: Brain,
          label: "AI & Machine Learning",
          desc: "Intelligent automation & agents",
          href: "/services/ai-ml",
        },
        {
          icon: Database,
          label: "Big Data & Analytics",
          desc: "Structured & unstructured data",
          href: "/services/big-data",
        },
        {
          icon: ShieldCheck,
          label: "Cybersecurity & IoT",
          desc: "Cryptography-based solutions",
          href: "/services/cybersecurity",
        },
        {
          icon: Cloud,
          label: "DevOps & Cloud",
          desc: "CI/CD, AWS, GCP, Azure",
          href: "/services/devops",
        },
        {
          icon: BarChart3,
          label: "Data Scraping",
          desc: "Reliable datasets at scale",
          href: "/services/data-scraping",
        },
      ],
    },
  ],
  featured: {
    title: "Custom Software Solutions",
    desc: "From startup MVPs to enterprise platforms — we turn your digital dreams into reality.",
    cta: "Explore All Services",
    href: "/services",
  },
};

const industries = {
  label: "Industries",
  href: "/industries",
  columns: [
    {
      heading: "Core Sectors",
      items: [
        {
          icon: HeartPulse,
          label: "Healthcare",
          desc: "HIPAA-compliant health tech",
          href: "/industries/healthcare",
        },
        {
          icon: GraduationCap,
          label: "Education & EdTech",
          desc: "Learning platforms & LMS",
          href: "/industries/education-edtech",
        },
        {
          icon: Banknote,
          label: "FinTech",
          desc: "Payments, lending & DeFi",
          href: "/industries/fintech",
        },
        {
          icon: ShoppingCart,
          label: "E-Commerce & Retail",
          desc: "Scalable commerce solutions",
          href: "/industries/ecommerce-retail",
        },
      ],
    },
    {
      heading: "More Industries",
      items: [
        {
          icon: Truck,
          label: "Logistics & Supply Chain",
          desc: "Fleet & inventory systems",
          href: "/industries/logistics-supply-chain",
        },
        {
          icon: Factory,
          label: "Manufacturing",
          desc: "Industrial automation & ERP",
          href: "/industries/manufacturing",
        },
        {
          icon: Gamepad2,
          label: "Gaming & Entertainment",
          desc: "NFT, Web3 & social platforms",
          href: "/industries/gaming-entertainment",
        },
        {
          icon: Building2,
          label: "Real Estate & PropTech",
          desc: "Property management tech",
          href: "/industries/real-estate-proptech",
        },
      ],
    },
  ],
  featured: {
    title: "Industry-Focused Technology",
    desc: "We bring deep domain knowledge to every engagement — not just code, but context.",
    cta: "View All Industries",
    href: "/industries",
  },
};

const insights = {
  label: "Insights",
  href: "/blog",
  columns: [
    {
      heading: "Resources",
      items: [
        {
          icon: BookOpen,
          label: "Blog & Articles",
          desc: "Tech trends & deep dives",
          href: "/blog",
        },
        {
          icon: TrendingUp,
          label: "Case Studies",
          desc: "Real results, real clients",
          href: "/blog/case-studies",
        },
        {
          icon: Brain,
          label: "AI & Tech Guides",
          desc: "Engineering best practices",
          href: "/blog/ai-guides",
        },
      ],
    },
  ],
  featured: {
    title: "Latest From Our Team",
    desc: "Stay ahead with engineering insights, product breakdowns, and startup playbooks.",
    cta: "Read the Blog",
    href: "/blog",
  },
};

const simpleLinks = [
  { label: "About Us", href: "/about" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Careers", href: "/careers" },
];

const megaMenuItems = [services, industries, insights];

/* ─────────────── TYPES ─────────────── */
type MegaMenu = typeof services;

/* ─────────────── MEGA DROPDOWN ─────────────── */
function MegaDropdown({
  menu,
  arrowLeft,
}: {
  menu: MegaMenu;
  arrowLeft: number;
}) {
  const colCount = menu.columns.length;
  return (
    <>
      {/* Arrow */}
      <div
        className="fixed z-50"
        style={{
          top: "64px",
          left: `${arrowLeft}px`,
          transform: "translateX(-50%)",
        }}
      >
        <div className="w-3 h-3 bg-background border-l border-t border-border rotate-45" />
      </div>

      <div
        className="fixed left-1/2 -translate-x-1/2 z-50"
        style={{
          top: "68px",
          width: colCount === 3 ? "1000px" : colCount === 2 ? "750px" : "580px",
        }}
      >
        <div className="bg-background dark:bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
          <div className="flex">
            {/* Columns */}
            <div
              className={`flex-1 p-6 grid gap-x-10 gap-y-0`}
              style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
            >
              {menu.columns.map((col) => (
                <div key={col.heading}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 px-1">
                    {col.heading}
                  </p>
                  <ul className="space-y-0.5">
                    {col.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.label}>
                          <Link
                            to={item.href}
                            className="group flex items-start gap-3 rounded-xl px-2 py-2.5 hover:bg-surface transition-all duration-150"
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                              <Icon size={15} />
                            </span>
                            <span>
                              <span className="block text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                                {item.label}
                              </span>
                              <span className="block text-[11px] text-muted-foreground leading-snug mt-0.5">
                                {item.desc}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Featured Panel */}
            <div className="w-60 shrink-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
              </div>
              <div className="relative z-10">
                <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-violet-200 mb-3">
                  Featured
                </span>
                <h4 className="text-white font-bold text-sm leading-snug mb-2">
                  {menu.featured.title}
                </h4>
                <p className="text-violet-200 text-[11px] leading-relaxed">
                  {menu.featured.desc}
                </p>
              </div>
              <Link
                to={menu.featured.href}
                className="relative z-10 mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-white/20 hover:bg-white/30 rounded-lg px-3 py-2 transition-all"
              >
                {menu.featured.cta}
                <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────── NAVBAR ─────────────── */
export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [arrowLeft, setArrowLeft] = useState(0);
  const { data: settings } = usePublicSettingsQuery();

  /* scroll + theme sync */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener("scroll", onScroll);
    const syncTheme = () =>
      setDarkMode(localStorage.getItem("theme") === "dark");
    window.addEventListener("theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  /* apply dark class on mount */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("theme-change"));
  };

  /* hover handlers */
  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    const btn = tabRefs.current.get(label);
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setArrowLeft(rect.left + rect.width / 2);
    }
    setActiveMenu(label);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const isScrolledOrOpen = scrolled || open;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolledOrOpen
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[68px]">
          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center shrink-0"
            onClick={() => setOpen(false)}
          >
            <img
              src={
                (darkMode && settings?.darkLogoUrl) ||
                settings?.logoUrl ||
                b_logo
              }
              alt={settings?.siteName || "Buggcy"}
              className={`h-16 lg:h-20 w-auto max-w-[140px] sm:max-w-[180px] object-contain cursor-pointer ${darkMode && !settings?.logoUrl && !settings?.darkLogoUrl ? "brightness-0 invert" : ""}`}
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav
            className="hidden lg:flex items-center gap-1.5"
            onMouseLeave={handleMouseLeave}
          >
            {megaMenuItems.map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(menu.label)}
              >
                <button
                  ref={(el) => {
                    if (el) tabRefs.current.set(menu.label, el);
                  }}
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-150 ${
                    activeMenu === menu.label
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface"
                  }`}
                >
                  {menu.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${activeMenu === menu.label ? "rotate-180 text-primary" : ""}`}
                  />
                </button>

                {activeMenu === menu.label && (
                  <div onMouseEnter={() => handleMouseEnter(menu.label)}>
                    <MegaDropdown menu={menu} arrowLeft={arrowLeft} />
                  </div>
                )}
              </div>
            ))}

            {/* Simple links */}
            {simpleLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`relative px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-150 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Actions ── */}
          <div className="flex items-center gap-2">
            {/* Theme toggle – desktop */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-surface transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/project-assistant"
                className="btn-primary shadow-lg shadow-primary/30 text-sm px-5 py-2"
              >
                Discover Project
              </Link>
              <Link
                to="/contact"
                className="btn-ghost text-sm px-5 py-2"
              >
                Let's Talk
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-surface transition-colors duration-200"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu (outside header) ── */}
      {open && (
        <div className="md:hidden fixed inset-0 top-[68px] z-40 bg-background overflow-y-auto">
          <div className="px-5 py-6 space-y-2">
            {/* Mega menu items mobile */}
            {megaMenuItems.map((menu) => (
              <div
                key={menu.label}
                className="border border-border rounded-2xl overflow-hidden bg-card"
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-foreground hover:bg-surface transition-colors"
                  onClick={() =>
                    setMobileExpanded((v) =>
                      v === menu.label ? null : menu.label,
                    )
                  }
                >
                  <span>{menu.label}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 text-muted-foreground ${
                      mobileExpanded === menu.label
                        ? "rotate-180 text-primary"
                        : ""
                    }`}
                  />
                </button>

                {mobileExpanded === menu.label && (
                  <div className="px-4 pb-4 space-y-4 border-t border-border">
                    {menu.columns.map((col) => (
                      <div key={col.heading}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary px-1 mb-2 mt-3">
                          {col.heading}
                        </p>
                        <div className="space-y-1">
                          {col.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.label}
                                to={item.href}
                                onClick={() => {
                                  setOpen(false);
                                  setMobileExpanded(null);
                                }}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface transition-colors group"
                              >
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                                  <Icon size={16} />
                                </span>
                                <div>
                                  <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                    {item.label}
                                  </span>
                                  <span className="block text-xs text-muted-foreground mt-0.5">
                                    {item.desc}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Simple links mobile */}
            <div className="border border-border rounded-2xl overflow-hidden bg-card">
              {simpleLinks.map((link, idx) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-5 py-4 text-sm font-semibold transition-colors ${
                    idx !== simpleLinks.length - 1
                      ? "border-b border-border"
                      : ""
                  } ${
                    location.pathname === link.href
                      ? "text-primary bg-primary/5"
                      : "text-foreground hover:text-primary hover:bg-surface"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile bottom actions */}
            <div className="pt-4 space-y-3">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border border-border text-sm font-medium text-muted-foreground hover:bg-surface transition-colors"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
              >
                Let's Talk
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close menu when clicking outside */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-40"
          onMouseEnter={handleMouseLeave}
          onClick={() => setActiveMenu(null)}
        />
      )}
    </>
  );
}
