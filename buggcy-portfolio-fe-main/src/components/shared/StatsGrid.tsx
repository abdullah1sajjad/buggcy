import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-extrabold text-primary">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
