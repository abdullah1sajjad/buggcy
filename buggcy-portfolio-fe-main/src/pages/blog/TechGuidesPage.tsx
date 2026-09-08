import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User, Calendar, ArrowRight } from "lucide-react";
import SEO from "../../components/seo/SEO";
import { useBlogsQuery } from "../../services/queries";
import { EmptyState } from "../../components/shared";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function TechGuidesPage() {
  const { data: blogs = [], isLoading } = useBlogsQuery("AI Guide");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO
        title="AI & Tech Guides"
        description="Expert guides on AI, machine learning, cloud architecture, and modern software development. Stay ahead with Buggcy's technical insights."
        keywords="AI guide, machine learning tutorial, cloud computing guide, tech guides, software development tutorials"
        canonical="https://buggcy.com/blog/ai-guides"
      />
      {/* Hero */}
      <section className="hero-section relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="section-container relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-pill"
          >
            AI & Tech Guides
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            AI & Tech <span className="gradient-text">Guides</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Expert guides on AI, machine learning, and modern technology
            to help you stay ahead of the curve.
          </motion.p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="section-pad">
        <div className="section-container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card-base animate-pulse">
                  <div className="h-48 bg-muted rounded-t-xl" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-20" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <EmptyState title="No Tech Guides Found" message="No tech guides available yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, i) => (
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
                    className="card-base block overflow-hidden group hover:border-primary/30 transition-all duration-300"
                  >
                    {blog.imageUrl && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        AI Guide
                      </span>
                      <h3 className="text-lg font-bold mt-2 mb-3 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {blog.excerpt}
                      </p>
                      {blog.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" /> {typeof blog.author === "string" ? blog.author : blog.author?.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {blog.date}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary mt-4 group-hover:gap-2.5 transition-all">
                        Read Guide <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
