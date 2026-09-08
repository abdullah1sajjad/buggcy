import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";

// ── Self-host TinyMCE by bundling it directly (no API key, no CDN call) ──
// Importing the core + the specific theme/model/icons/plugins we use makes
// `window.tinymce` available before the <Editor> mounts, so the React
// wrapper skips fetching tinymce.min.js from any external script src.
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/models/dom";
import "tinymce/skins/ui/oxide/skin.css";
import "tinymce/skins/ui/oxide/content.css";
import "tinymce/skins/content/default/content.css";

import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/code";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/autolink";
import "tinymce/plugins/media";
import "tinymce/plugins/charmap";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/preview";

import { uploadImage } from "../../services/api";

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (html: string) => void;
  required?: boolean;
  placeholder?: string;
  minHeight?: number;
  error?: string;
  clearFieldError?: () => void;
}

export default function RichTextEditor({
  label,
  value,
  onChange,
  required,
  placeholder = "Write your blog content here...",
  minHeight = 420,
  error,
  clearFieldError,
}: RichTextEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <div
        className={`rounded-lg border transition-all [&_.tox-tinymce]:rounded-lg [&_.tox-tinymce]:!border-0 ${
          error
            ? "border-destructive focus-within:ring-2 focus-within:ring-destructive/50"
            : "border-border focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary"
        }`}
      >
        <Editor
          licenseKey="gpl"
          onInit={(_evt, editor) => {
            editorRef.current = editor;
          }}
          value={value}
          onEditorChange={(html) => {
            onChange(html);
            clearFieldError?.();
          }}
          init={{
            height: minHeight,
            menubar: false,
            placeholder,
            skin: false, // CSS already imported above
            content_css: false, // CSS already imported above
            plugins: [
              "link", "lists", "image", "table", "code", "wordcount",
              "autolink", "media", "charmap", "searchreplace",
              "fullscreen", "preview",
            ],
            toolbar:
              "undo redo | blocks | bold italic underline strikethrough | " +
              "forecolor backcolor | alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | link image media table | " +
              "code preview fullscreen | removeformat",
            toolbar_mode: "wrap",
            branding: false,
            statusbar: true,
            content_style:
              "body { font-family: system-ui, -apple-system, sans-serif; font-size: 14px; }",
            // Route pasted/dragged/inserted images through our own Cloudinary
            // upload endpoint instead of embedding base64 blobs in the HTML.
            images_upload_handler: async (blobInfo) => {
              const file = new File([blobInfo.blob()], blobInfo.filename(), {
                type: blobInfo.blob().type,
              });
              const url = await uploadImage(file, "website/blog-content");
              return url;
            },
            automatic_uploads: true,
          }}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-destructive">{error}</p>
      )}
      <p className="mt-1 text-xs text-muted-foreground">
        Formatting is saved as HTML and sanitized on the server before publishing.
      </p>
    </div>
  );
}