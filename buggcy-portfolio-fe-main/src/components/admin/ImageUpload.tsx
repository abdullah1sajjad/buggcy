import { useRef, useState, useCallback } from "react";
import { Upload, X, LinkIcon, Loader2 } from "lucide-react";
import { uploadImage } from "../../services/api";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label,
  folder,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"url" | "upload">("url");

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setError("");
      setIsUploading(true);
      try {
        const url = await uploadImage(file, folder);
        onChange(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, folder],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}

      {mode === "url" ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL or upload"
            className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
          <button
            type="button"
            onClick={() => setMode("upload")}
            className="px-3 py-2.5 rounded-lg border border-border bg-muted hover:bg-muted/80 text-foreground transition-all"
          >
            <Upload size={16} />
          </button>
        </div>
      ) : (
        <div>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`relative w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            } ${isUploading ? "opacity-60 pointer-events-none" : ""}`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            {isUploading ? (
              <>
                <Loader2
                  size={24}
                  className="mx-auto text-primary mb-2 animate-spin"
                />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </>
            ) : (
              <>
                <Upload
                  size={24}
                  className="mx-auto text-muted-foreground mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  Drag & drop or{" "}
                  <span className="text-primary font-medium">
                    click to browse
                  </span>
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMode("url")}
            className="mt-2 px-3 py-1.5 rounded-lg border border-border bg-muted hover:bg-muted/80 text-foreground text-xs transition-all"
          >
            <LinkIcon size={12} className="inline mr-1" />
            Enter URL instead
          </button>
        </div>
      )}

      {error && <p className="text-xs text-destructive mt-1.5">{error}</p>}

      {/* Preview */}
      {value && !isUploading && (
        <div className="mt-2 relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="w-32 h-20 rounded-lg object-cover border border-border"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure you want to remove this image?")) {
                onChange("");
              }
            }}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80 transition-all"
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
