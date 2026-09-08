import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Code2,
  Layers,
  Smartphone,
  Database,
  Globe,
  Cloud,
} from "lucide-react";

/* ---------------- DATA ---------------- */
const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "6+", label: "Industries Served" },
  { value: "100%", label: "Client Focused" },
];

const orbitItems = [
  {
    icon: Code2,
    title: "Development",
    desc: "Building scalable apps",
    delay: 0.1,
  },
  {
    icon: Smartphone,
    title: "Mobile",
    desc: "Native iOS & Android",
    delay: 0.2,
  },
  { icon: Globe, title: "Web", desc: "High-performance web", delay: 0.3 },
  { icon: Database, title: "Data", desc: "Secure architecture", delay: 0.4 },
  { icon: Cloud, title: "Cloud", desc: "AWS & DevOps", delay: 0.5 },
  { icon: Layers, title: "Stack", desc: "Modern technologies", delay: 0.6 },
];

/* ---------------- ANIMATIONS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ---------------- HERO ---------------- */
export default function Hero() {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [ambiguityState, setAmbiguityState] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmbiguityState((prev) => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-surface" />

      <div className="section-container section-pad relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* LEFT SIDE */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="space-y-7"
          >
            <motion.span variants={fadeUp} className="label-pill">
              Software Development Agency
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight"
            >
              From ideas to scalable {""}
              <span
                className="text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                digital
              </span>{" "}
              experiences
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg max-w-xl leading-relaxed"
            >
              We design and build high-performance web and mobile solutions.
              From MVPs to enterprise systems engineered for growth.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <a href="/contact" className="btn-primary shadow-lg shadow-primary/30">
                Contact Us
              </a>

              <a href="#portfolio" className="btn-ghost">
                View our work
              </a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-6 pt-10 border-t border-border mt-10"
            >
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <h3
                    className="text-3xl font-extrabold text-foreground"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Circular Icon Cluster */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="hidden md:flex justify-center items-center relative min-h-[500px]"
          >
            {/* Animated dashed orbital rings for aesthetic */}
            {/* <div className="absolute w-[320px] h-[320px] border border-dashed border-border/40 rounded-full animate-[spin_40s_linear_infinite] pointer-events-none" />
            <div className="absolute w-[450px] h-[450px] border border-dashed border-border/20 rounded-full animate-[spin_50s_linear_infinite_reverse] pointer-events-none" /> */}

            {/* Central Glowing Orb */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="absolute z-20 w-40 h-40 rounded-full border border-primary bg-surface/80 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(1,133,177,0.15)] backdrop-blur-xl overflow-hidden"
            >
              <div className="absolute inset-0 rounded-full border border-primary animate-[ping_4s_linear_infinite]" />
              <div className="absolute inset-0 rounded-full bg-primary blur-2xl" />

              <AnimatePresence mode="wait">
                {hoveredIcon !== null ? (
                  <motion.div
                    key={`hover-${hoveredIcon}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex flex-col items-center justify-center text-center px-4"
                  >
                    {(() => {
                      const Icon = orbitItems[hoveredIcon].icon;
                      return (
                        <Icon className="w-8 h-8 text-primary-foreground mb-2 drop-shadow-[0_0_8px_var(--color-primary)]" />
                      );
                    })()}
                    <span
                      className={`text-sm font-semibold leading-tight ${
                        localStorage.getItem("theme") === "dark"
                          ? "text-foreground"
                          : "text-white"
                      }`}
                    >
                      {orbitItems[hoveredIcon].title}
                    </span>
                    <span
                      className={`text-xs leading-tight ${
                        localStorage.getItem("theme") === "dark"
                          ? "text-muted-foreground"
                          : "text-white"
                      }`}
                    >
                      {orbitItems[hoveredIcon].desc}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`ambiguity-${ambiguityState}`}
                    initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative z-10 flex flex-col items-center justify-center text-center"
                  >
                    <span
                      className={`text-sm font-extrabold tracking-widest uppercase  duration-500 text-primary-foreground`}
                    >
                      {ambiguityState
                        ? "Scalable Products"
                        : "High-Quality Solutions"}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Orbiting Icons */}
            <div className="absolute inset-0 flex items-center justify-center animate-[spin_40s_linear_infinite]">
              {orbitItems.map((item, i) => {
                const totalItems = orbitItems.length;
                const angle = i * (360 / totalItems) * (Math.PI / 180);
                const radius = 170; // Slightly larger radius for w-20 nodes
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={i}
                    className="absolute z-10 flex items-center justify-center"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    <motion.div
                      onMouseEnter={() => setHoveredIcon(i)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        duration: 0.8,
                        delay: item.delay,
                        type: "spring",
                      }}
                      className="relative w-20 h-20 rounded-full bg-background border-4 border-border flex items-center justify-center shadow-2xl group-hover:border-primary transition-colors duration-300 cursor-pointer group"
                    >
                      {/* Hover ring effect */}
                      <div
                        className="absolute -inset-3 border border-primary/0 rounded-full group-hover:border-primary/50 group-hover:animate-[spin_3s_linear_infinite] transition-all pointer-events-none"
                        style={{ borderTopColor: "transparent" }}
                      />

                      <div className="animate-[spin_40s_linear_infinite_reverse] w-full h-full flex items-center justify-center">
                        <item.icon
                          className={`w-8 h-8 transition-colors ${
                            document.documentElement.classList.contains("dark")
                              ? "text-foreground"
                              : "text-primary"
                          }`}
                        />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
