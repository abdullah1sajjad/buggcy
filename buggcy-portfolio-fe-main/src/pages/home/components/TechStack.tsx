import { motion } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiPython, SiDjango, SiDocker, SiKubernetes,
  SiPostgresql, SiMongodb, SiRedis
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const marqueeTechs = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiVuedotjs, name: "Vue" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiTailwindcss, name: "Tailwind CSS" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiPython, name: "Python" },
  { icon: SiDjango, name: "Django" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiKubernetes, name: "Kubernetes" },
  { icon: FaAws, name: "AWS" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiRedis, name: "Redis" },
];

const process = [
  { step: "Discovery" },
  { step: "Design" },
  { step: "Build" },
  { step: "Launch" },
  { step: "Grow" },
];

export default function TechStack() {
  return (
    <section id="portfolio" className="bg-background section-pad">
      <div className="section-container space-y-20">

        {/* Tech Stack */}
        <div>
          <div className="mb-12 max-w-2xl">
            <span className="label-pill mb-4 block w-fit">Technology</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}>
              The right tool for the <span className="gradient-text">right job</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We've become experts in technologies that matter — so we can pick the right
              stack for your specific project.
            </p>
          </div>

          {/* Infinite Marquee */}
          <div className="relative w-full overflow-hidden mb-16 flex border-y border-border py-8 bg-surface/30">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-marquee">
              {[...marqueeTechs, ...marqueeTechs].map((tech, i) => (
                <div key={i} className="flex items-center gap-3 px-10 text-muted-foreground hover:text-primary transition-colors cursor-default">
                  <tech.icon className="w-8 h-8" />
                  <span className="font-bold text-xl whitespace-nowrap" style={{ fontFamily: "var(--font-display)" }}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process */}
        <div>
          <div className="mb-12 max-w-2xl">
            <span className="label-pill mb-4 block w-fit">How We Work</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}>
              Our <span className="gradient-text">process</span>
            </h2>
          </div>

          {/* Desktop Circular Diagram (Incremental Model) */}
          <div className="hidden md:block relative w-full max-w-[600px] aspect-square mx-auto mt-24 mb-24">
            {/* The circle paths */}
            <div className="absolute inset-[15%] rounded-full border-2 border-dashed border-border animate-[spin_60s_linear_infinite]" />

            {/* Central Hub */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full border border-primary/30 bg-primary/5 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(1,148,196,0.15)] backdrop-blur-md relative">
                <div className="absolute inset-0 rounded-full border border-primary/10 animate-[ping_4s_linear_infinite]" />
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-1">Serve</span>
                <span className="text-foreground text-3xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>Clients</span>
              </div>
            </div>

            {/* Circular Nodes */}
            {process.map((p, i) => {
              const angle = (i * 72 - 90) * (Math.PI / 180);
              const x = Math.cos(angle) * 42;
              const y = Math.sin(angle) * 42;

              return (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 + 0.3, duration: 0.6, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true }}
                  className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{
                    left: `calc(50% + ${x}%)`,
                    top: `calc(50% + ${y}%)`
                  }}
                >
                  <div className="w-20 h-20 rounded-full bg-background border-4 border-border flex items-center justify-center shadow-2xl group-hover:border-primary group-hover:scale-110 transition-all duration-300 relative z-10">
                    <span className="text-2xl font-bold text-muted-foreground group-hover:text-primary transition-colors">{i + 1}</span>

                    {/* Hover ring effect */}
                    <div className="absolute -inset-3 border border-primary/0 rounded-full group-hover:border-primary/50 group-hover:animate-[spin_3s_linear_infinite] transition-all" style={{ borderTopColor: 'transparent' }} />
                  </div>
                  <h3 className="absolute -bottom-12 whitespace-nowrap text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "var(--font-display)" }}>
                    {p.step}
                  </h3>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Fallback: Vertical Timeline */}
          <div className="md:hidden flex flex-col gap-8 relative pl-6 mt-10">
            <div className="absolute top-0 bottom-0 left-[2rem] w-1 bg-border z-0" />

            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="absolute top-0 left-[2rem] w-1 bg-primary z-0 shadow-[0_0_15px_var(--color-primary)]"
            />

            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 + 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 relative z-10"
              >
                <div className="w-12 h-12 shrink-0 rounded-full bg-background border-4 border-border flex items-center justify-center relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.2 + 0.7 }}
                    viewport={{ once: true }}
                    className="absolute inset-1.5 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)]"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                  {p.step}
                </h3>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
