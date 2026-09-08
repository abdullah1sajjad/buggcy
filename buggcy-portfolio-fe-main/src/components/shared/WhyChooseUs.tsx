import { motion } from "framer-motion";

interface WhyChooseUsItem {
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  items: WhyChooseUsItem[];
}

export default function WhyChooseUs({ items }: WhyChooseUsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="text-4xl font-extrabold text-primary/20 mb-3">
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="text-lg font-bold mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
