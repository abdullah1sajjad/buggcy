interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "No Results Found",
  message = "Try adjusting your search or filters.",
}: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
