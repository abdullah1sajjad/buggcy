import { useState } from "react";
import { X, ExternalLink, Loader2 } from "lucide-react";

interface PreviewModalProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function PreviewModal({ url, title, onClose }: PreviewModalProps) {
  const [loaded, setLoaded] = useState(false);
  const previewUrl = `${url}${url.includes("?") ? "&" : "?"}preview=1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-5xl h-full sm:h-[90vh] shadow-xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <span className="text-sm font-semibold text-foreground truncate">{title}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open full page in new tab"
              className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <ExternalLink size={16} />
            </a>
            <button
              onClick={onClose}
              title="Close"
              className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="relative flex-1 bg-background">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 size={24} className="animate-spin text-muted-foreground" />
            </div>
          )}
          <iframe
            src={previewUrl}
            title={title}
            className="w-full h-full border-0"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}
