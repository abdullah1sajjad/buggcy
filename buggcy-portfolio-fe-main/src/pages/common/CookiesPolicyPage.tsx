import { motion } from "framer-motion";
import { Clock, CalendarDays } from "lucide-react";
import { mockCookiesPolicy } from "../../data/mockData";

export default function CookiesPolicyPage() {
  const data = mockCookiesPolicy;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/10" />
        <div className="hero-glow glow-cyan w-[500px] h-[500px] -top-40 -right-40 opacity-20" />
        <div className="hero-glow glow-violet w-[400px] h-[400px] -bottom-40 -left-40 opacity-15" />
        <div className="section-container relative z-10">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="label-pill">{data.label}</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-display)" }}>
            {data.heading} <span className="gradient-text">{data.headingAccent}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-6 text-lg leading-relaxed max-w-2xl">
            {data.description}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><CalendarDays size={14} className="text-primary" /> {data.effectiveDate}</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> {data.effectiveDate}</span>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-surface section-pad">
        <div className="section-container">
          <div className="max-w-3xl mx-auto space-y-1">
            {data.sections.map((section, idx) => (
              <motion.div key={section.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4 }}
                className="group">
                <div className="flex items-start gap-5 py-8 border-b border-border/60 last:border-0">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
                      {section.title.replace(/^\d+\.\s*/, "")}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-[15px] whitespace-pre-line">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
