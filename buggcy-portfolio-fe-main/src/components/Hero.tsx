import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden flex items-center min-h-screen">
      {/* Abstract Background Elements (Tkxel style) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column: Text & CTA */}
          <div className="max-w-3xl">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border mb-8"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald text-emerald" />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground/80">
                4.9/5 on Clutch
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.05] tracking-tight mb-8"
            >
              From Concept <br />
              to <span className="text-primary">Product</span> <br />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-foreground/70 max-w-xl mb-10 leading-relaxed font-sans"
            >
              Buggcy is a precision-crafted, outcome-focused software partner. We turn complex challenges into scalable, high-performance solutions with a global reach.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <button className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-emerald text-background font-bold text-lg rounded-sm hover:bg-emerald/90 transition-all cursor-pointer">
                Let's Talk
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-border text-foreground font-semibold text-lg rounded-sm hover:bg-surface hover:border-foreground/30 transition-all cursor-pointer">
                Explore Work
              </button>
            </motion.div>
          </div>

          {/* Right Column: Abstract Visual / Animated Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block h-[600px] w-full"
          >
            {/* A Tkxel-inspired floating tech visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="relative w-96 h-96 transform-style-3d"
              >
                {/* Simulated 3D rings / Wireframe globe */}
                <div className="absolute inset-0 border border-primary/30 rounded-full" />
                <div className="absolute inset-0 border border-emerald/30 rounded-full rotate-45" />
                <div className="absolute inset-0 border border-foreground/10 rounded-full rotate-90" />
                <div className="absolute inset-0 border border-primary/20 rounded-full rotate-[135deg]" />

                {/* Center glowing core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary rounded-full blur-2xl opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-emerald rounded-full blur-xl opacity-80" />
              </motion.div>

              {/* Floating capability cards */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-10 bg-surface/80 backdrop-blur-md border border-border p-4 rounded-lg shadow-2xl"
              >
                <div className="text-emerald font-mono text-sm mb-1">AI Native</div>
                <div className="text-foreground font-bold">Smart Integration</div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-32 left-0 bg-surface/80 backdrop-blur-md border border-border p-4 rounded-lg shadow-2xl"
              >
                <div className="text-primary font-mono text-sm mb-1">DevOps</div>
                <div className="text-foreground font-bold">Cloud Infrastructure</div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
