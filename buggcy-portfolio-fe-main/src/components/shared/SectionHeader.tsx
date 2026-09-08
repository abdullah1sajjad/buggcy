import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  heading: string;
  gradient?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  label,
  heading,
  gradient,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {label && (
        <span
          className={`label-pill mb-4 block w-fit ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold">
        {heading}{" "}
        {gradient && <span className="gradient-text">{gradient}</span>}
      </h2>
    </motion.div>
  );
}
