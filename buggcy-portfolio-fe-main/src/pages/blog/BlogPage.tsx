import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, User, Calendar, Search, BookOpen, TrendingUp, Lightbulb } from "lucide-react";
import SEO from "../../components/seo/SEO";
import { useBlogsQuery } from "../../services/queries";
import { FilterPills, EmptyState } from "../../components/shared";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function BlogPage() {
  const { data: blogs = [], isLoading, isError } = useBlogsQuery();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !blogs) {
    return (
      <div className="section-pad text-center text-destructive">
        Failed to load blogs.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO
        title="Blog & Insights"
        description="Read the latest insights on software development, AI, cloud technology, and digital transformation from Buggcy's engineering team."
        keywords="software development blog, tech insights, AI guides, cloud computing, digital transformation, engineering blog"
        canonical="https://buggcy.com/blog"
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
                Blog & Insights
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              >
                Our{" "}
                <span className="gradient-text">Insights</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-muted-foreground leading-relaxed"
              >
                Read about engineering, product, and design topics from our team.
                Stay updated with the latest trends and best practices.
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
                  Subscribe to Newsletter <ArrowRight className="h-4 w-4" />
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
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"
                    alt="Blog"
                    className="w-full h-56 lg:h-72 object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-24 rounded-xl overflow-hidden border border-border shadow-lg hidden md:block">
                  <img
                    src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=80"
                    alt="Content writing workspace"
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
              { icon: BookOpen, value: blogs.length.toString(), label: "Articles" },
              { icon: TrendingUp, value: "10K+", label: "Monthly Readers" },
              { icon: User, value: "15+", label: "Authors" },
              { icon: Lightbulb, value: "50+", label: "Topics Covered" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-extrabold text-primary" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SEARCH & FILTERS ==================== */}
      <section className="py-12 border-b border-border">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            {/* Categories */}
            <FilterPills
              categories={["All", "Case Study", "Tech Guide", "Product", "Engineering"]}
              active={activeCategory}
              onChange={setActiveCategory}
              showAllLabel="All Articles"
            />
          </div>
        </div>
      </section>

      {/* ==================== BLOG GRID ==================== */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-20" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <EmptyState title="No Blogs Found" message="No articles found in this category." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Link
                    to={`/blog/${blog.id}`}
                    className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                          {blog.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-bold text-white line-clamp-2" style={{ fontFamily: "var(--font-display)" }}>
                          {blog.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" /> {typeof blog.author === "string" ? blog.author : blog.author?.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {blog.date}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                          Read <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="section-container">
          <div className="bg-primary rounded-3xl px-6 py-12 md:px-20 md:py-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground">
                Stay Updated with{" "}
                <span className="text-primary-foreground/70">Our Latest Insights</span>
              </h2>
              <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
                Subscribe to our newsletter and never miss the latest engineering
                insights, product breakdowns, and startup playbooks.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 rounded-full font-semibold hover:bg-background/90 transition-all"
                >
                  Subscribe Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-full hover:bg-primary-foreground/10 transition-all"
                >
                  View All Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
