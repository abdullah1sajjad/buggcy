import { CheckCircle2 } from "lucide-react";

interface CheckListProps {
  items: string[];
}

export default function CheckList({ items }: CheckListProps) {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <CheckCircle2
            size={18}
            className="text-primary mt-1 flex-shrink-0"
          />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}
