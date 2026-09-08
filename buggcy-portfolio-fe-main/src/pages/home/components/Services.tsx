import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Smartphone, Cloud, ShoppingCart, Landmark, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const services = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "From Frontend to Backend to Full-stack, we fast-track your project delivery to create experiences beyond your expectations.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    desc: "Native and cross-platform mobile apps built for performance, usability, and scale across iOS and Android.",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    desc: "From Big Data to DevOps, we streamline your infrastructure so your team can focus on shipping great software.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    desc: "Custom e-commerce platforms designed for retail — including real-time inventory and scalable architecture.",
  },
  {
    icon: Landmark,
    title: "Fintech & Banking",
    desc: "We build secure financial systems for banks, exchanges, and brokers with scalable APIs and architecture.",
  },
  {
    icon: GraduationCap,
    title: "EdTech Solutions",
    desc: "Educational platforms built for modern learning experiences and scalable remote education systems.",
  },
];

function ServiceCard({ service }: { service: typeof services[number] }) {
  const Icon = service.icon;
  return (
    <div className="rounded-[2rem] bg-card border border-border p-6 md:p-8 shadow-2xl overflow-hidden relative group">
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-10 bg-primary" />
      <div className="relative z-10">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-3xl flex items-center justify-center bg-surface border border-border mb-6 md:mb-8 shadow-xl">
          <Icon size={28} className="text-primary" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4" style={{ fontFamily: "var(--font-display)" }}>
          {service.title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {service.desc}
        </p>
        <Link
          to="/services"
          className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-border flex items-center justify-between group/btn"
        >
          <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-widest">
            Explore More
          </span>
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface border border-border flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary transition-all duration-300">
            <ArrowRight size={14} className="text-primary group-hover/btn:text-white transition-colors duration-300" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="hero-glow glow-violet w-96 h-96 -top-20 -left-20" />
      <div className="hero-glow glow-cyan w-80 h-80 bottom-0 right-0" />

      <div className="section-container relative z-10">
        <div className="space-y-16">
          {/* Top Section */}
          <div className="max-w-3xl">
            <span className="label-pill">OUR SERVICE</span>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mt-6 leading-tight">
              What <span className="gradient-text">Services</span>
              <br />
              We're Offering
            </h2>
            <p className="text-muted-foreground mt-6">
              We offer services that help businesses improve their visibility,
              strengthen their reputation online, expand market reach, and
              increase turnover through effective digital strategies.
            </p>
          </div>

          {/* Desktop - 2 column */}
          <div className="hidden md:grid md:grid-cols-2 gap-16 items-start">
            <div className="divide-border">
              {services.map((s, idx) => (
                <div
                  key={s.title}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`py-6 cursor-pointer transition-all duration-300 ${
                    activeIdx === idx
                      ? "text-3xl font-semibold text-foreground pl-4 border-l-4 border-primary"
                      : "text-2xl text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  {s.title}
                </div>
              ))}
            </div>

            <div className="flex mt-16 justify-center relative">
              <div className="absolute w-full max-w-lg h-64 pointer-events-none">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      transform: `translateY(${20 + i * 18}px) rotate(${(i - 1) * 4}deg)`,
                      opacity: 0.85 - i * 0.15,
                      zIndex: 5 - i,
                    }}
                    className="absolute left-0 right-0 mx-auto w-11/12 h-56 rounded-2xl bg-surface border border-border shadow-lg"
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 20, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -20, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-lg relative z-20"
                >
                  <ServiceCard service={services[activeIdx]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile - list + tap to show same card below */}
          <div className="md:hidden space-y-0">
            {services.map((s, idx) => (
              <div key={s.title}>
                <div
                  onClick={() => setMobileExpanded(mobileExpanded === idx ? null : idx)}
                  className={`py-5 cursor-pointer transition-all duration-300 border-l-4 ${
                    mobileExpanded === idx
                      ? "text-2xl font-semibold text-foreground pl-4 border-primary"
                      : "text-xl text-muted-foreground hover:text-foreground/80 pl-4 border-transparent"
                  }`}
                >
                  {s.title}
                </div>

                <AnimatePresence>
                  {mobileExpanded === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <ServiceCard service={s} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
