import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import SEO, { serviceJsonLd, faqJsonLd } from "../../components/seo/SEO";
import { useServiceBySlugQuery, useSuccessStoriesQuery } from "../../services/queries";
import { useWhyChooseUsQuery } from "../../services/queries";
import { CtaSection, StatsGrid, SectionHeader, WhyChooseUs, StoryCard } from "../../components/shared";

/* ── FAQ Accordion ── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-lg font-semibold pr-4 group-hover:text-primary transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Page ── */
export default function ServiceSlugDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading, error } = useServiceBySlugQuery(slug || "");
  const { data: stories = [] } = useSuccessStoriesQuery();
  const { data: whyChooseUs = [] } = useWhyChooseUsQuery();
  const [activeStep, setActiveStep] = useState(0);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="section-container pt-32 pb-16">
          <div className="animate-pulse space-y-4">
            <div className="h-5 bg-muted rounded w-28" />
            <div className="h-12 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-full max-w-2xl" />
            <div className="h-80 bg-muted rounded-2xl mt-6" />
          </div>
        </div>
      </main>
    );
  }

  if (!service || error) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
          >
            Back to Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO
        title={`${service.title} Services`}
        description={service.description || `Professional ${service.title} services by Buggcy. Custom solutions for startups and enterprises.`}
        keywords={`${service.title}, ${service.title} development, ${service.title} services, custom ${service.title}`}
        canonical={`https://buggcy.com/services/${service.slug}`}
        image={service.imageUrl}
        jsonLd={[
          serviceJsonLd({ name: service.title, description: service.description, slug: service.slug }),
          ...(service.faqs?.length ? [faqJsonLd(service.faqs)] : []),
        ]}
      />
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="hero-section relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/10" />
        <div className="section-container relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="label-pill">Our Service</span>
              <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {service.title} <span className="gradient-text">Services</span>
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 sm:px-7 sm:py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all active:scale-95 shadow-[0_0_25px_rgba(1,133,177,0.35)]"
                >
                  Start a Project <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/success-stories"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 sm:px-7 sm:py-3 font-semibold text-sm hover:bg-muted transition-all"
                >
                  View Our Work
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-56 lg:h-72 object-cover"
                />
              </div>
              {service.secondaryImageUrl && (
                <div className="absolute -bottom-4 -right-4 w-32 h-24 rounded-xl overflow-hidden border border-border shadow-lg hidden md:block">
                  <img
                    src={service.secondaryImageUrl}
                    alt={`${service.title} additional view`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3 KEY SERVICES (icon + title + desc)
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {(service.features ?? []).slice(0, 3).map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <span className="text-primary font-bold text-xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{f}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OUR APPROACH — Horizontal Steps + Detail
      ═══════════════════════════════════════════ */}
      {service.process && (
        <section className="py-16 md:py-24 border-t border-border">
          <div className="section-container">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="label-pill mb-4 block w-fit">How We Work</span>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Our <span className="gradient-text">Approach</span>
              </h2>
            </motion.div>

            {/* Steps - Mobile: Vertical dots | Desktop: Horizontal tabs */}
            <div className="relative mb-12">
              {/* Mobile: Vertical step indicators */}
              <div className="flex md:hidden items-center justify-center gap-3 mb-6">
                {service.process.map((p, i) => (
                  <button
                    key={p.step}
                    onClick={() => setActiveStep(i)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      activeStep === i
                        ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {/* Desktop: Horizontal scrollable tabs */}
              <div className="hidden md:block">
                <div className="flex overflow-x-auto gap-0 pb-4 scrollbar-hide border-b border-border">
                {(service.process ?? []).map((p, i) => (
                    <button
                      key={p.step}
                      onClick={() => setActiveStep(i)}
                      className={`flex items-center gap-2 px-5 py-3 whitespace-nowrap text-sm font-semibold transition-all shrink-0 ${
                        activeStep === i
                          ? "text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span>{p.title}</span>
                      {i < service.process!.length - 1 && (
                        <ChevronRight className="h-4 w-4 opacity-30 ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start"
              >
                <div>
                  <div className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary/15 mb-3 md:mb-4">
                    {String(activeStep + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-5">
                    {service.process![activeStep].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                    {service.process![activeStep].description}
                  </p>
                </div>

                <div className="bg-muted/40 rounded-2xl p-5 md:p-8 border border-border">
                  <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider">
                    Outcome
                  </span>
                  <p className="mt-2 md:mt-3 text-muted-foreground leading-relaxed text-sm md:text-base">
                    A well-defined deliverable with clear success metrics, ready
                    for the next phase of development.
                  </p>
                  <div className="mt-4 md:mt-6 flex gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-semibold hover:opacity-90 transition-all"
                    >
                      Discuss This Step <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Step navigation arrows */}
            <div className="flex gap-3 mt-6 md:mt-8 justify-center md:justify-start">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() =>
                  setActiveStep(
                    Math.min(service.process!.length - 1, activeStep + 1),
                  )
                }
                disabled={activeStep === service.process!.length - 1}
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          WHY CHOOSE US — clean inline style
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 border-t border-border bg-muted/30">
        <div className="section-container">
          <SectionHeader label="Why Us" heading="Why" gradient="Choose Us" />
          <WhyChooseUs items={whyChooseUs} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TECH MARQUEE
      ═══════════════════════════════════════════ */}
      {service.technologies && (
        <section className="py-12 md:py-16 border-t border-border overflow-hidden">
          <div className="section-container mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-center"
            >
              Technologies We Use
            </motion.h2>
          </div>
          {/* Row 1 */}
          <div className="relative w-full overflow-hidden flex border-y border-border py-5 bg-surface/30">
            <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="flex w-max animate-marquee">
              {[
                ...service.technologies,
                ...service.technologies,
                ...service.technologies,
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-10 text-muted-foreground hover:text-primary transition-colors cursor-default"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                  <span className="font-bold text-xl whitespace-nowrap">
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 reverse */}
          <div className="relative w-full overflow-hidden flex border-b border-border py-5 bg-surface/30">
            <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="flex w-max animate-marquee-reverse">
              {[
                ...service.technologies,
                ...service.technologies,
                ...service.technologies,
              ]
                .reverse()
                .map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-10 text-muted-foreground hover:text-primary transition-colors cursor-default"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                    <span className="font-bold text-xl whitespace-nowrap">
                      {t}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          USE CASES
      ═══════════════════════════════════════════ */}
      {service.useCases && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-extrabold mb-6"
                >
                  Use <span className="gradient-text">Cases</span>
                </motion.h2>
                <p className="text-muted-foreground leading-relaxed max-w-lg">
                  {service.detailedContent}
                </p>
              </div>
              <div className="space-y-0">
                {(service.useCases ?? []).map((uc, i) => (
                  <motion.div
                    key={uc}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-4 py-4 border-b border-border last:border-0 group"
                  >
                    <span className="text-sm font-bold text-primary/40 w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {uc}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SUCCESS STORIES
      ═══════════════════════════════════════════ */}
      {stories.length > 0 && (
        <section className="py-16 md:py-24 border-t border-border bg-muted/30">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="label-pill mb-4 block w-fit">Results</span>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Proven <span className="gradient-text">Results</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                Real success stories from our engagements.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.slice(0, 4).map((story, i) => (
                <StoryCard key={story.id} story={story} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════ */}
      {service.stats && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="section-container">
            <StatsGrid stats={service.stats.map(s => ({ label: s.label, value: s.value }))} />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════ */}
      {service.faqs && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="section-container max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Frequently Asked{" "}
                <span className="gradient-text">Questions</span>
              </h2>
            </motion.div>
            <div>
              {service.faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <FaqItem question={faq.question} answer={faq.answer} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          LET'S COLLABORATE (CTA)
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="section-container">
          <CtaSection
            badge="Let's Collaborate"
            title="Ready to Build Something"
            highlightText="Great?"
            description="Tell us about your project and we'll get back with a clear roadmap and team recommendation."
            buttons={[
              { label: "Get in Touch", to: "/contact" },
              { label: "View Our Work", to: "/success-stories", variant: "outline" },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
