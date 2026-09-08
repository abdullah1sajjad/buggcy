import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Plane,
  UtensilsCrossed,
  Landmark,
  GraduationCap,
  Car
} from "lucide-react";

const industries = [
  {
    icon: ShoppingCart,
    title: "E-commerce & Retail",
    slug: "ecommerce-retail",
    tag: "Retail Tech",
    stat: "150%",
    statDesc: "increase in conversion rates",
    desc: "Fast, scalable commerce platforms that improve buyer journeys and streamline operations.",
    color: "from-primary/80 to-surface",
  },
  {
    icon: Plane,
    title: "Travel & Tourism",
    slug: "",
    tag: "Booking",
    stat: "35%",
    statDesc: "faster booking processing",
    desc: "Booking systems, customer portals, and operational tools for modern travel businesses.",
    color: "from-accent/80 to-surface",
  },
  {
    icon: UtensilsCrossed,
    title: "Food & Grocery",
    slug: "",
    tag: "Delivery",
    stat: "2.5x",
    statDesc: "faster delivery routing",
    desc: "End-to-end delivery and inventory platforms powering modern grocery ecosystems.",
    color: "from-primary/60 to-surface",
  },
  {
    icon: Landmark,
    title: "Finance & Banking",
    slug: "fintech",
    tag: "Fintech",
    stat: "99.9%",
    statDesc: "uptime for transactions",
    desc: "Secure, scalable financial systems with high-performance APIs and compliance.",
    color: "from-accent/60 to-surface",
  },
  {
    icon: GraduationCap,
    title: "Education",
    slug: "education-edtech",
    tag: "E-learning",
    stat: "10x",
    statDesc: "student engagement",
    desc: "Learning platforms that enable scalable, accessible, and structured digital education.",
    color: "from-primary/40 to-surface",
  },
  {
    icon: Car,
    title: "On-Demand Services",
    slug: "",
    tag: "Marketplace",
    stat: "50%",
    statDesc: "reduction in wait times",
    desc: "Marketplace and service platforms powering real-time delivery and service economies.",
    color: "from-accent/40 to-surface",
  },
];

export default function Industries() {
  return (
    <section className="section-pad relative overflow-hidden">
      {/* Background glow */}
      <div className="hero-glow glow-violet w-96 h-96 -top-20 -left-20" />
      <div className="hero-glow glow-cyan w-80 h-80 bottom-0 right-0" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="label-pill mb-5">Industries</span>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
            We build for real-world scale
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Through custom software development, we help companies across
            multiple industries design systems that are scalable, reliable,
            and performance-driven.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <Link
                key={industry.title}
                to={industry.slug ? `/industries/${industry.slug}` : "/industries"}
                className="group relative p-8 rounded-[2rem] overflow-hidden bg-surface border border-border transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-lg cursor-pointer block"
              >
                {/* Large Background Watermark Icon */}
                <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none">
                  <Icon size={160} className="text-foreground" />
                </div>
                
                {/* Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Top: Icon & Tag */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center group-hover:border-primary/40 transition-colors duration-500 shadow-sm">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-background border border-border text-xs text-muted-foreground font-semibold tracking-wide">
                      {industry.tag}
                    </span>
                  </div>

                  {/* Middle: Stat */}
                  <div className="mb-8">
                    <h3 className="text-5xl font-extrabold text-foreground tracking-tighter mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {industry.stat}
                    </h3>
                    <p className="text-sm font-bold text-primary tracking-wider">{industry.statDesc}</p>
                  </div>

                  {/* Bottom: Title & Desc */}
                  <div className="mt-auto pt-6 border-t border-border/50">
                    <h4 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
                      {industry.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {industry.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}