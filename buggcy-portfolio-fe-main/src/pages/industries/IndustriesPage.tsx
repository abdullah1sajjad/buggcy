import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  GraduationCap,
  Landmark,
  ShoppingCart,
  Truck,
  Factory,
  Gamepad2,
  Building,
  ArrowRight,
  Target,
  Lightbulb,
  Handshake,
  Shield,
} from "lucide-react";
import SEO from "../../components/seo/SEO";
import { useIndustriesQuery } from "../../services/queries";
import { EmptyState } from "../../components/shared";

const iconMap: Record<string, React.ElementType> = {
  HeartPulse,
  GraduationCap,
  Landmark,
  ShoppingCart,
  Truck,
  Factory,
  Gamepad2,
  Building,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const processSteps = [
  {
    icon: Target,
    title: "Discovery",
    desc: "We dive deep into your industry challenges, regulations, and market dynamics.",
  },
  {
    icon: Lightbulb,
    title: "Strategy",
    desc: "Custom technology roadmap tailored to your industry's specific needs and goals.",
  },
  {
    icon: Handshake,
    title: "Build",
    desc: "Agile development with continuous feedback from your domain experts.",
  },
  {
    icon: Shield,
    title: "Launch & Scale",
    desc: "Production-ready deployment with ongoing support and scaling.",
  },
];

export default function IndustriesPage() {
  const { data: industries = [], isLoading } = useIndustriesQuery();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO
        title="Industries We Serve"
        description="Buggcy builds custom software for healthcare, education, finance, e-commerce, logistics, and real estate industries. Industry-specific solutions for global businesses."
        keywords="healthcare software, edtech development, fintech solutions, e-commerce development, logistics software, industry software solutions"
        canonical="https://buggcy.com/industries"
      />
      {/* ==================== HERO — SERVICE DETAIL STYLE ==================== */}
      <section className="hero-section relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/10" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="label-pill"
              >
                Industries
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              >
                Solutions Built for{" "}
                <span className="gradient-text">Your Industry</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-muted-foreground leading-relaxed"
              >
                We combine deep domain expertise with cutting-edge technology to
                solve the unique challenges of your industry.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 sm:px-7 sm:py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all active:scale-95 shadow-[0_0_25px_rgba(1,133,177,0.35)]"
                >
                  Discuss Your Project <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/success-stories"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 sm:px-7 sm:py-3 font-semibold text-sm hover:bg-muted transition-all"
                >
                  View Our Work
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-border">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                    alt="Industries"
                    className="w-full h-56 lg:h-72 object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-24 rounded-xl overflow-hidden border border-border shadow-lg hidden md:block">
                  <img
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80"
                    alt="Modern office workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="py-12 border-y border-border">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "8+", label: "Industries" },
              { value: "50+", label: "Projects Delivered" },
              { value: "22+", label: "Team Members" },
              { value: "10+", label: "Countries Served" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-primary" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INDUSTRIES GRID ==================== */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="label-pill mx-auto">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-6" style={{ fontFamily: "var(--font-display)" }}>
              Industries We <span className="gradient-text">Serve</span>
            </h2>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-6 md:p-8 animate-pulse">
                  <div className="h-48 bg-muted rounded-xl mb-4" />
                  <div className="h-6 bg-muted rounded w-1/2 mb-3" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : industries.length === 0 ? (
            <EmptyState title="No Industries Found" message="No industries available yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {industries.map((industry, i) => {
                const Icon = iconMap[industry.icon || "Building"] || Building;
                const img = industry.imageUrl || "";
                return (
                  <motion.div
                    key={industry.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    <Link
                      to={`/industries/${industry.slug}`}
                      className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative h-48 md:h-56 overflow-hidden">
                        <img
                          src={img}
                          alt={industry.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <div className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                            {industry.title}
                          </h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-8">
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                          {industry.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {(industry.features ?? []).slice(0, 3).map((f) => (
                            <span
                              key={f}
                              className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                          Explore Solutions <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ==================== PROCESS ==================== */}
      <section className="py-16 md:py-24 border-y border-border">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="label-pill mx-auto">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-6" style={{ fontFamily: "var(--font-display)" }}>
              How We <span className="gradient-text">Work</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative group"
              >
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 h-full hover:border-primary/30 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-card border border-border rounded-3xl p-8 md:p-14 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Don't See Your Industry?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                We work across diverse sectors. Contact us to discuss how we can
                help with your specific industry needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/25">
                  Get in Touch
                  <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="inline-flex items-center gap-3 border border-border px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-muted transition-all">
                  View All Services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
