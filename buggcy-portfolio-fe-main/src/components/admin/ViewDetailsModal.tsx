import type { ReactNode } from "react";

export interface DetailField {
  label: string;
  value: ReactNode;
  fullWidth?: boolean;
}

interface ViewDetailsModalProps {
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  fields: DetailField[];
  onClose: () => void;
  onEdit?: () => void;
}

export default function ViewDetailsModal({
  title,
  imageUrl,
  imageAlt = "",
  fields,
  onClose,
  onEdit,
}: ViewDetailsModalProps) {
  const visibleFields = fields.filter(
    (f) => f.value !== undefined && f.value !== null && f.value !== "",
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl p-4 sm:p-6 max-w-2xl w-full mx-4 shadow-xl max-h-[85vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-40 object-cover rounded-lg mb-4 border border-border"
          />
        )}

        <div className="space-y-3 text-sm">
          {visibleFields.map((f, i) => (
            <div key={i} className={f.fullWidth ? "" : undefined}>
              <span className="text-muted-foreground block mb-1">{f.label}:</span>
              <div className="text-foreground">{f.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all"
            >
              Edit
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
