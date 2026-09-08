import { motion } from 'framer-motion';

const steps = [
  { number: "01", title: "Vision" },
  { number: "02", title: "Analysis" },
  { number: "03", title: "Estimate" },
  { number: "04", title: "Mail" },
  { number: "05", title: "Support" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export function EstimationProcess() {
  return (
    <div className="h-full flex flex-col ">
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-foreground">How it works</h3>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-10 relative before:absolute before:inset-0 before:ml-[1.25rem] before:-translate-x-px md:before:ml-[1.25rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent"
      >
        {steps.map((step, idx) => (
          <motion.div key={idx} variants={itemVariants} className="relative flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background text-primary font-bold shadow-sm z-10 flex-shrink-0 text-sm" style={{ fontFamily: "var(--font-display)" }}>
              {step.number}
            </div>
            <div className="ml-5">
              <h4 className="text-muted-foreground font-semibold">{step.title}</h4>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
