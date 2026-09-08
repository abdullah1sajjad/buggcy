import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import b_logo from "../../assets/black-logo.png";
import { usePublicSettingsQuery } from "../../services/queries";

const footerLinks = {
  Services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile Apps", href: "/services/mobile-development" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "AI & ML", href: "/services/ai-ml" },
    { label: "DevOps & Cloud", href: "/services/devops" },
    { label: "QA & Testing", href: "/services/qa-testing" },
  ],
  Industries: [
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Education & EdTech", href: "/industries/education-edtech" },
    { label: "Finance & Fintech", href: "/industries/fintech" },
    { label: "E-commerce & Retail", href: "/industries/ecommerce-retail" },
    { label: "Logistics", href: "/industries/logistics-supply-chain" },
    { label: "Real Estate", href: "/industries/real-estate-proptech" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialIcons: Record<string, React.JSX.Element> = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .595 23.406 0 22.675 0z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a2.994 2.994 0 00-2.107-2.12C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.391.521A2.994 2.994 0 00.502 6.186 31.09 31.09 0 000 12a31.09 31.09 0 00.502 5.814 2.994 2.994 0 002.107 2.12c1.886.521 9.391.521 9.391.521s7.505 0 9.391-.521a2.994 2.994 0 002.107-2.12A31.09 31.09 0 0024 12a31.09 31.09 0 00-.502-5.814zM9.75 15.568V8.432L15.818 12l-6.068 3.568z" />
    </svg>
  ),
};

export default function Footer() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );
  const { data: settings } = usePublicSettingsQuery();

  useEffect(() => {
    const syncTheme = () => {
      setDarkMode(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const siteName = settings?.siteName || "Buggcy";
  const logoSrc =
    (darkMode && settings?.darkLogoUrl) || settings?.logoUrl || b_logo;
  const email = settings?.email;
  const phone = settings?.phone;
  const workingHours = settings?.workingHours;
  const address = settings?.address;
  const cityCountry = [settings?.city, settings?.country]
    .filter(Boolean)
    .join(", ");

  const socialLinks = [
    { key: "facebook", href: settings?.facebookUrl },
    { key: "twitter", href: settings?.twitterUrl },
    { key: "linkedin", href: settings?.linkedinUrl },
    { key: "instagram", href: settings?.instagramUrl },
    { key: "youtube", href: settings?.youtubeUrl },
  ].filter((s) => !!s.href);

  return (
    <footer className="border-t border-border bg-card">
      {/* Main Footer */}
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 space-y-5">
            <Link to="/">
              <img
                src={logoSrc}
                className={`h-14 w-auto max-w-[140px] object-contain ${darkMode && !settings?.logoUrl && !settings?.darkLogoUrl ? "brightness-0 invert" : ""}`}
                alt={siteName}
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Building scalable software products that drive business growth and
              digital transformation. Your trusted technology partner.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-200"
                    aria-label={social.key}
                  >
                    {socialIcons[social.key]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group} className="col-span-1 md:col-span-2">
              <h4 className="text-sm font-bold text-foreground mb-5 uppercase tracking-wider">
                {group}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="text-sm font-bold text-foreground mb-5 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-4">
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Mail
                      size={16}
                      className="mt-0.5 shrink-0 text-primary/60 group-hover:text-primary"
                    />
                    <span>{email}</span>
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Phone
                      size={16}
                      className="mt-0.5 shrink-0 text-primary/60 group-hover:text-primary"
                    />
                    <span>{phone}</span>
                  </a>
                </li>
              )}
              {(address || cityCountry) && (
                <li>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-primary/60"
                    />
                    <span className="leading-relaxed">
                      {address}
                      {address && cityCountry && <br />}
                      {cityCountry}
                    </span>
                  </div>
                </li>
              )}
              {workingHours && (
                <li>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Clock
                      size={16}
                      className="mt-0.5 shrink-0 text-primary/60"
                    />
                    <span className="leading-relaxed">{workingHours}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="section-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link
              to="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies-policy"
              className="hover:text-primary transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
