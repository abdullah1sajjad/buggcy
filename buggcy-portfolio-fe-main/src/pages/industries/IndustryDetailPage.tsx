import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import SEO from "../../components/seo/SEO";
import { useIndustryBySlugQuery, useSuccessStoriesQuery } from "../../services/queries";
import { NotFoundHero, WhyChooseUs, StoryCard } from "../../components/shared";

export default function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: industry, isLoading } = useIndustryBySlugQuery(slug || "");
  const { data: allStories = [] } = useSuccessStoriesQuery();
  const [activeApproach, setActiveApproach] = useState(0);

  // Filter success stories by industry category
  const stories = allStories.filter(
    (s) => s.category?.toLowerCase() === industry?.title?.toLowerCase()
  );

  const whyChooseUs = industry?.challengesDetailed?.map((c) => ({
    title: c.title,
    description: c.description,
  })) || [];

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

  if (!industry) {
    return (
      <NotFoundHero
        title="Industry Not Found"
        message="The industry you're looking for doesn't exist."
        backTo="/industries"
        backLabel="Back to Industries"
      />
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO
        title={`${industry.title} Industry Solutions`}
        description={industry.description || `Custom software solutions for the ${industry.title} industry. Buggcy builds scalable, reliable technology for ${industry.title} businesses.`}
        keywords={`${industry.title} software, ${industry.title} development, ${industry.title} technology solutions`}
        canonical={`https://buggcy.com/industries/${industry.slug}`}
        image={industry.imageUrl}
      />

      {/* ═══════════════════════════════════════════
          HERO — 2-col: text left, image right
      ═══════════════════════════════════════════ */}
      <section className="hero-section relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="section-container relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="label-pill">{industry.title}</span>
              <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {industry.heroSubtitle || `${industry.title} Solutions`}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {industry.description}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 sm:px-7 sm:py-3 rounded-full font-semibold text-xs sm:text-sm hover:opacity-90 transition-all active:scale-95 shadow-[0_0_25px_rgba(1,133,177,0.35)]"
                >
                  {industry.heroCta || "Get My Free Review"} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/success-stories"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 sm:px-7 sm:py-3 font-semibold text-xs sm:text-sm hover:bg-muted transition-all"
                >
                  View Our Work
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src={industry.imageUrl}
                  alt={industry.title}
                  className="w-full h-56 lg:h-72 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          WHY THIS INDUSTRY IS HARD — Long intro + detailed subsections
      ═══════════════════════════════════════════ */}
      {industry.challengesDetailed && industry.challengesDetailed.length > 0 && (
        <section className="py-16 md:py-24 border-t border-border">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                Why{" "}
                <span className="gradient-text">{industry.title}</span>{" "}
                Is Harder Than It Looks
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {industry.detailedContent || industry.description}
              </p>
            </motion.div>

            <div className="space-y-12">
              {industry.challengesDetailed.map((challenge, i) => (
                <motion.div
                  key={challenge.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                  <div className="lg:col-span-1">
                    <h3 className="text-xl font-bold">{challenge.title}</h3>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-muted-foreground leading-relaxed">
                      {challenge.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ═══════════════════════════════════════════
          FULL PRODUCT LIFECYCLE — Vertical numbered list
      ═══════════════════════════════════════════ */}
      {industry.lifecycle && industry.lifecycle.length > 0 && (
        <section className="py-16 md:py-24 border-t border-border bg-muted/30">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                {industry.title}{" "}
                <span className="gradient-text">Across the Full Product Lifecycle</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Whether you are validating a concept, rebuilding for scale, or modernizing
                a platform that has outgrown its original architecture, we cover every phase.
              </p>
            </motion.div>

            <div className="space-y-0">
              {industry.lifecycle.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 border-b border-border last:border-0"
                >
                  <div className="lg:col-span-1">
                    <span className="text-3xl font-extrabold text-primary/20">{p.step}</span>
                  </div>
                  <div className="lg:col-span-3">
                    <h3 className="text-xl font-bold">{p.title}</h3>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ═══════════════════════════════════════════
          OUR APPROACH — 4 steps with long descriptions
      ═══════════════════════════════════════════ */}
      {industry.approach && industry.approach.length > 0 && (
        <section className="py-16 md:py-24 border-t border-border">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-10 md:mb-16"
            >
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6">
                Architecture Decisions Made Early{" "}
                <span className="gradient-text">Save Rebuilds Later</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                The most expensive conversations happen when a founder says their first
                enterprise client needs features the architecture cannot support. We prevent
                that by making the right decisions before the first sprint.
              </p>
            </motion.div>

            {/* Steps - Mobile: Vertical dots | Desktop: Horizontal tabs */}
            <div className="relative mb-12">
              {/* Mobile: Vertical step indicators */}
              <div className="flex md:hidden items-center justify-center gap-3 mb-6">
                {industry.approach.map((p, i) => (
                  <button
                    key={p.step}
                    onClick={() => setActiveApproach(i)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      activeApproach === i
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
                  {industry.approach.map((p, i) => (
                    <button
                      key={p.step}
                      onClick={() => setActiveApproach(i)}
                      className={`flex items-center gap-2 px-5 py-3 whitespace-nowrap text-sm font-semibold transition-all shrink-0 ${
                        activeApproach === i
                          ? "text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span>{p.title}</span>
                      {i < industry.approach!.length - 1 && (
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
                key={activeApproach}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
              >
                <div>
                  <div className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary/15 mb-3 md:mb-4">
                    {industry.approach![activeApproach].step}
                  </div>
                  <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-5">
                    {industry.approach![activeApproach].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                    {industry.approach![activeApproach].description}
                  </p>
                </div>

                <div className="bg-muted/40 rounded-2xl p-5 md:p-8 border border-border">
                  <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider">
                    Outcome
                  </span>
                  <p className="mt-2 md:mt-3 text-muted-foreground leading-relaxed text-sm md:text-base">
                    A structured deliverable with clear success metrics,
                    ready for the next phase of development.
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

            {/* Step navigation */}
            <div className="flex gap-3 mt-6 md:mt-8 justify-center md:justify-start">
              <button
                onClick={() => setActiveApproach(Math.max(0, activeApproach - 1))}
                disabled={activeApproach === 0}
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() =>
                  setActiveApproach(
                    Math.min(industry.approach!.length - 1, activeApproach + 1)
                  )
                }
                disabled={activeApproach === industry.approach!.length - 1}
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      )}


      {/* ═══════════════════════════════════════════
          SUCCESS STORIES (from API)
      ═══════════════════════════════════════════ */}
      {whyChooseUs.length > 0 && (
        <section className="py-16 md:py-24 border-t border-border">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="label-pill mb-4 block w-fit">Why Us</span>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Why Choose <span className="gradient-text">Us</span>
              </h2>
            </motion.div>
            <WhyChooseUs items={whyChooseUs} />
          </div>
        </section>
      )}

      {stories.length > 0 && (
        <section className="py-16 md:py-24 border-t border-border bg-muted/30">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Proven <span className="gradient-text">Results</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                Real success stories from our {industry.title.toLowerCase()} engagements.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map((story, i) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <StoryCard story={story} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ═══════════════════════════════════════════
          RELATED SERVICES — Enhanced cards
      ═══════════════════════════════════════════ */}
      {industry.relatedServices && industry.relatedServices.length > 0 && (
        <section className="py-16 md:py-24 border-t border-border">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="label-pill mb-4 block w-fit">Services</span>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Related <span className="gradient-text">Services</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {industry.relatedServices.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={service.href}
                    className="group block p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-[0_0_30px_rgba(1,133,177,0.1)] transition-all duration-300 h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Explore how our {service.title.toLowerCase()} solutions can accelerate your {industry.title.toLowerCase()} projects.
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ═══════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════ */}
      {industry.stats && industry.stats.length > 0 && (
        <section className="py-16 md:py-20 border-t border-border bg-muted/30">
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {industry.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-extrabold text-primary">
                    {s.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ═══════════════════════════════════════════
          TESTIMONIALS — Enhanced quote cards
      ═══════════════════════════════════════════ */}
      {industry.testimonials && industry.testimonials.length > 0 && (
        <section className="py-16 md:py-24 border-t border-border bg-muted/30">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="label-pill mb-4 block w-fit">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                What Our <span className="gradient-text">Clients Say</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {industry.testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-8 rounded-2xl border border-border bg-background hover:border-primary/20 transition-colors"
                >
                  {/* Quote mark */}
                  <div className="absolute top-6 right-8 text-6xl font-serif text-primary/10 leading-none select-none">
                    "
                  </div>

                  <p className="text-muted-foreground leading-relaxed italic mb-8 relative z-10">
                    {t.quote}
                  </p>

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <img
                        src={`https://picsum.photos/seed/avatar${i}/100/100`}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.role}
                      </p>
                      <p className="text-xs text-primary font-medium">
                        {t.company}
                      </p>
                      {t.location && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t.location}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="section-container">
          <div className="bg-cta rounded-3xl px-6 py-12 md:px-20 md:py-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-cta-foreground">
                Ready to Build{" "}
                <span className="text-cta-foreground/70">{industry.title} Solutions?</span>
              </h2>
              <p className="mt-4 text-cta-foreground/80 max-w-lg mx-auto">
                Tell us about your project and we'll get back with a clear
                roadmap and team recommendation.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 rounded-full font-semibold hover:bg-background/90 transition-all"
                >
                  Get in Touch <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/success-stories"
                  className="inline-flex items-center justify-center gap-2 border border-cta-foreground/30 text-cta-foreground px-8 py-4 rounded-full hover:bg-cta-foreground/10 transition-all"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
