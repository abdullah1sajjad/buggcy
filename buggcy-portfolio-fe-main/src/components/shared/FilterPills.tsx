interface FilterPillsProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
  showAllLabel?: string;
}

export default function FilterPills({
  categories,
  active,
  onChange,
  showAllLabel,
}: FilterPillsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
            active === cat
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
          }`}
        >
          {cat === "All" ? showAllLabel || "All" : cat}
        </button>
      ))}
    </div>
  );
}
