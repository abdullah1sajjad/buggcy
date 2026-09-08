import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/seo/SEO";
import { useServicesQuery, useWhyChooseUsQuery } from "../../services/queries";
import { CtaSection, StatsGrid, SectionHeader, WhyChooseUs } from "../../components/shared";

export default function ServicesPage() {
  const [active, setActive] = useState(0);
  const { data: services = [], isLoading } = useServicesQuery();
  const { data: whyChooseUs = [] } = useWhyChooseUsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeService = services[active];

  return (
    <div className="bg-background min-h-screen">
      <SEO
        title="Our Services"
        description="Explore Buggcy's full range of software development services — web development, mobile apps, frontend engineering, DevOps, cloud infrastructure, and AI solutions for businesses worldwide."
        keywords="software development services, web development, mobile app development, frontend development, DevOps, cloud services, AI development, custom software"
        canonical="https://buggcy.com/services"
      />
      {/* ── Hero ── */}
      <section className="hero-section relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="label-pill"
              >
                Our Services
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
              >
                What we <span className="gradient-text">do best.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl"
              >
                Our focus areas of service cover a wide range of software and
                web development. From Big Data to DevOps to mobile, buggcy has
                you covered.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all active:scale-95 shadow-[0_0_25px_rgba(1,133,177,0.35)]"
                >
                  Get in Touch <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/success-stories"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 font-semibold text-sm hover:bg-muted transition-all"
                >
                  View Work
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Our Team"
                  className="w-full h-64 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Interactive Services List ── */}
      <section className="relative w-full py-12 md:py-20 border-t border-border">
        <div className="section-container">
          <div className="grid grid-cols-12 gap-6 md:gap-12">
            {/* Left: Service List */}
            <div className="col-span-12 lg:col-span-7">
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.04 }}
                  onMouseEnter={() => setActive(i)}
                  className={`group cursor-pointer border-b border-border py-6 md:py-7 transition-colors ${
                    active === i
                      ? "border-foreground/30"
                      : "hover:border-foreground/20"
                  }`}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    className="flex items-baseline gap-6 md:gap-10"
                  >
                    <span
                      className={`text-[11px] tracking-[0.2em] tabular-nums transition-colors ${
                        active === i ? "text-primary" : "text-foreground/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`text-2xl md:text-4xl font-extrabold tracking-tight transition-all duration-500 ${
                        active === i
                          ? "text-foreground translate-x-2"
                          : "text-foreground/60 group-hover:text-foreground"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right: Active Preview */}
            {activeService && (
            <div className="hidden lg:block col-span-5 sticky top-32 self-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={`/services/${activeService.slug}`}
                    className="block aspect-4/3 rounded-2xl overflow-hidden relative mb-5 group/card"
                  >
                    <img
                      src={activeService.imageUrl}
                      alt={activeService.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-white/70 text-[10px] tracking-widest uppercase">
                        {String(active + 1).padStart(2, "0")} / {services.length}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-white/15 grid place-items-center">
                        <ArrowRight className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-extrabold tracking-tight">
                        {activeService.title}
                      </h3>
                    </div>
                  </Link>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {activeService.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {activeService.technologies?.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] tracking-wider uppercase text-muted-foreground px-3 py-1.5 rounded-full border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-16 md:py-20 border-t border-border bg-muted/30">
        <div className="section-container">
          <SectionHeader label="Why Us" heading="Why" gradient="Choose Us" />
          <WhyChooseUs items={whyChooseUs} />
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="section-container">
          <SectionHeader label="Process" heading="Our" gradient="Process" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "We understand your goals, users, and technical requirements to create a clear roadmap.",
              },
              {
                step: "02",
                title: "Design",
                desc: "Wireframes, prototypes, and pixel-perfect designs validated with real users.",
              },
              {
                step: "03",
                title: "Develop",
                desc: "Agile sprints with working demos every 2 weeks. Frontend and backend in parallel.",
              },
              {
                step: "04",
                title: "Deliver",
                desc: "CI/CD, cloud deployment, monitoring setup, and 3 months of post-launch support.",
              },
            ].map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-extrabold text-primary/15 mb-4">
                  {p.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 md:py-20 border-t border-border bg-muted/30">
        <div className="section-container">
          <StatsGrid
            stats={[
              { label: "Projects Delivered", value: "50+" },
              { label: "Client Satisfaction", value: "98%" },
              { label: "Team Members", value: "40+" },
              { label: "Countries Served", value: "12+" },
            ]}
          />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="section-container">
          <CtaSection
            title="Let's Build Something"
            highlightText="Great Together"
            description="Whether you're launching a startup or modernizing an enterprise platform, our team is ready to help you move faster."
            buttons={[
              { label: "Contact Us", to: "/contact" },
              { label: "View Our Work", to: "/success-stories", variant: "outline" },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
