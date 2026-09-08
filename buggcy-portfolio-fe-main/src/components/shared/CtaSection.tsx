import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CtaButton {
  label: string;
  to: string;
  variant?: "primary" | "outline" | "white";
  icon?: React.ReactNode;
}

interface CtaSectionProps {
  variant?: "primary" | "card";
  badge?: string;
  title: string;
  highlightText?: string;
  description: string;
  buttons: CtaButton[];
  className?: string;
}

const buttonStyles = {
  primary:
    "inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 rounded-full font-semibold hover:bg-background/90 transition-all",
  outline:
    "inline-flex items-center justify-center gap-2 border border-cta-foreground/30 text-cta-foreground px-8 py-4 rounded-full hover:bg-cta-foreground/10 transition-all",
  white: "inline-flex items-center gap-3 bg-cta text-cta-foreground px-10 py-5 rounded-full font-semibold hover:scale-105 transition-all",
};

export default function CtaSection({
  variant = "primary",
  badge,
  title,
  highlightText,
  description,
  buttons,
  className = "",
}: CtaSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <section className="py-16 md:py-20 border-t border-border">
        <div className="section-container">
          {variant === "primary" ? (
            <div className={`bg-cta rounded-3xl px-6 py-12 md:px-20 md:py-16 text-center relative overflow-hidden ${className}`}>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
              </div>
              <div className="relative z-10">
                {badge && (
                  <span className="inline-block text-cta-foreground/70 text-sm font-semibold uppercase tracking-widest mb-4">
                    {badge}
                  </span>
                )}
                <h2 className="text-3xl md:text-4xl font-extrabold text-cta-foreground">
                  {title}{" "}
                  {highlightText && (
                    <span className="text-cta-foreground/70">
                      {highlightText}
                    </span>
                  )}
                </h2>
                <p className="mt-4 text-cta-foreground/80 max-w-lg mx-auto">
                  {description}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  {buttons.map((btn) => (
                    <Link
                      key={btn.label}
                      to={btn.to}
                      className={
                        buttonStyles[btn.variant || "primary"]
                      }
                    >
                      {btn.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden bg-card border border-border rounded-[2rem] px-6 py-14 md:px-16 md:py-20 text-center">
              <div className="absolute inset-0 opacity-30">
                <div className="hero-glow glow-violet w-96 h-96 top-0 left-0" />
                <div className="hero-glow glow-cyan w-96 h-96 bottom-0 right-0" />
              </div>
              <div className="relative z-10">
                {badge && (
                  <span className="label-pill mx-auto">{badge}</span>
                )}
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-black mt-8 leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {title}{" "}
                  {highlightText && (
                    <span className="gradient-text">{highlightText}</span>
                  )}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
                  {description}
                </p>
                <div className="mt-10">
                  {buttons.map((btn) => (
                    <Link
                      key={btn.label}
                      to={btn.to}
                      className={
                        buttonStyles[btn.variant || "white"]
                      }
                    >
                      {btn.label} <ArrowRight size={18} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
