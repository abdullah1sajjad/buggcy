import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../../components/seo/SEO";
import { useSuccessStoriesQuery } from "../../services/queries";
import { CtaSection } from "../../components/shared";

const categories = ["All", "Healthcare", "Education & EdTech", "Finance", "E-Commerce", "Logistics", "Real Estate"];

export default function SuccessStoriesPage() {
  const { data: stories = [], isLoading } = useSuccessStoriesQuery();
  const [active, setActive] = useState("All");
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered =
    active === "All"
      ? stories
      : stories.filter((s) => s.category === active);

  return (
    <main className="bg-background min-h-screen">
      <SEO
        title="Success Stories"
        description="See how Buggcy has delivered results for clients across healthcare, fintech, e-commerce, and more. Explore our portfolio of custom software projects."
        keywords="software development portfolio, client success stories, case studies, project portfolio, buggcy projects"
        canonical="https://buggcy.com/success-stories"
      />
      {/* Hero */}
      <section className="hero-section relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/10" />
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="label-pill"
            >
              Success Stories
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
            >
              Projects We're{" "}
              <span className="gradient-text">Proud Of</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-muted-foreground leading-relaxed"
            >
              A selection of work spanning healthcare, finance, e-commerce and more. Each project is a partnership built on craft and care.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters + View Toggle */}
      <section className="relative w-full border-y border-border">
        <div className="section-container py-6 md:py-8 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mr-4">
              Filter
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  active === cat
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 rounded-md text-xs tracking-wider uppercase transition-all duration-300 ${
                view === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1.5 rounded-md text-xs tracking-wider uppercase transition-all duration-300 ${
                view === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </section>

      {/* List View */}
      {view === "list" && (
        <section className="relative w-full">
          <div className="section-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {isLoading ? (
                  [...Array(4)].map((_, i) => (
                    <div key={i} className="py-8 md:py-10 border-t border-border animate-pulse">
                      <div className="grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-12 md:col-span-1">
                          <div className="h-4 bg-muted rounded w-8" />
                        </div>
                        <div className="col-span-12 md:col-span-5">
                          <div className="h-8 bg-muted rounded w-3/4" />
                        </div>
                        <div className="col-span-6 md:col-span-2">
                          <div className="h-4 bg-muted rounded w-24" />
                        </div>
                        <div className="col-span-6 md:col-span-3">
                          <div className="flex gap-2">
                            <div className="h-6 bg-muted rounded-full w-16" />
                            <div className="h-6 bg-muted rounded-full w-16" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : filtered.length === 0 ? (
                  <div className="py-20 text-center">
                    <p className="text-muted-foreground text-lg">No stories found in this category.</p>
                  </div>
                ) : (
                  filtered.map((story, i) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: i * 0.04 }}
                    >
                      <Link
                        to={`/success-stories/${story.slug}`}
                        className="group grid grid-cols-12 gap-6 py-8 md:py-10 border-t border-border hover:border-primary/20 transition-colors items-center"
                      >
                        <div className="col-span-12 md:col-span-1">
                          <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="col-span-12 md:col-span-5">
                          <h3 className="text-lg md:text-xl font-semibold text-foreground tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-500">
                            {story.title}
                          </h3>
                        </div>
                        <div className="col-span-6 md:col-span-2">
                          <span className="text-muted-foreground text-sm">
                            {story.client}
                          </span>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[10px] tracking-wider uppercase text-muted-foreground px-2.5 py-1 rounded-full border border-border">
                              {story.category}
                            </span>
                            {(story.technologies || []).slice(0, 2).map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] tracking-wider uppercase text-muted-foreground px-2.5 py-1 rounded-full border border-border"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-1 flex md:justify-end">
                          <div className="w-10 h-10 rounded-full border border-border grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:border-primary/30">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-foreground">
                              <path d="M5 19L19 5M19 5H8M19 5V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Grid View */}
      {view === "grid" && (
        <section className="relative w-full py-16 md:py-24">
          <div className="section-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {isLoading ? (
                  [...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[4/3] rounded-2xl bg-muted mb-6" />
                      <div className="h-4 bg-muted rounded w-24 mb-3" />
                      <div className="h-8 bg-muted rounded w-3/4 mb-3" />
                      <div className="h-4 bg-muted rounded w-full" />
                    </div>
                  ))
                ) : filtered.length === 0 ? (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-muted-foreground text-lg">No stories found in this category.</p>
                  </div>
                ) : (
                  filtered.map((story, i) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: i * 0.06 }}
                      className={`group ${i % 3 === 0 ? "md:mt-12" : ""}`}
                    >
                      <Link to={`/success-stories/${story.slug}`}>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-6">
                          <img
                            src={story.imageUrl}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                              {story.category}
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">
                              {story.title}
                            </h3>
                            <p className="text-white/80 text-sm">{story.client}</p>
                          </div>
                          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-white">
                              <path d="M5 19L19 5M19 5H8M19 5V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[11px] tracking-[0.25em] uppercase text-primary">
                            {story.category}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight mb-3">
                          {story.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-md line-clamp-2">
                          {story.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {(story.technologies || []).map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] tracking-wider uppercase text-muted-foreground px-2.5 py-1 rounded-full border border-border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </Link>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* CTA */}
      <CtaSection
        badge="Ready to Start?"
        title="Let's Build"
        highlightText="Something Great Together"
        description="Have a project in mind? We'd love to hear about it."
        buttons={[
          { label: "Get in Touch", to: "/contact" },
          { label: "View Our Work", to: "/success-stories", variant: "outline" },
        ]}
      />
    </main>
  );
}
