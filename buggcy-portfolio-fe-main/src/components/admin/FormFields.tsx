import { Plus, X } from "lucide-react";

interface PermissionsFieldProps<T extends string> {
  /** All permissions available to choose from, in display order. */
  options: readonly T[];
  /** Human-readable label per permission key. */
  labels: Record<T, string>;
  /** Currently-checked permissions (post-defaults, post manual edits). */
  values: T[];
  onChange: (vals: T[]) => void;
  label?: string;
  helperText?: string;
}

/**
 * Reusable checkbox grid for editing a set of module permissions.
 *
 * Meant to sit on top of role defaults: a parent applies the role's default
 * permission list (e.g. on role change), and this component lets an admin
 * manually check/uncheck individual entries from there without knowing
 * anything about roles itself — it just renders/edits whatever `values` it's
 * given, so it can be reused anywhere a permission set needs to be edited.
 */
export function PermissionsField<T extends string>({
  options,
  labels,
  values,
  onChange,
  label = "Module Access",
  helperText,
}: PermissionsFieldProps<T>) {
  const toggle = (perm: T, checked: boolean) => {
    onChange(
      checked ? [...values, perm] : values.filter((p) => p !== perm),
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((perm) => (
          <label key={perm} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.includes(perm)}
              onChange={(e) => toggle(perm, e.target.checked)}
            />
            {labels[perm]}
          </label>
        ))}
      </div>
      {helperText && (
        <p className="mt-1.5 text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  error?: string;
  clearFieldError?: () => void;
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  error,
  clearFieldError,
}: TextFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => { onChange(e.target.value); clearFieldError?.(); }}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-all ${
          error 
            ? "border-destructive focus:border-destructive focus:ring-destructive/30" 
            : "border-border focus:border-primary focus:ring-primary/50"
        }`}
      />
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  error?: string;
  clearFieldError?: () => void;
}

export function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
  error,
  clearFieldError,
}: TextareaFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => { onChange(e.target.value); clearFieldError?.(); }}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-all resize-y ${
          error 
            ? "border-destructive focus:border-destructive focus:ring-destructive/30" 
            : "border-border focus:border-primary focus:ring-primary/50"
        }`}
      />
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  required?: boolean;
  error?: string;
  clearFieldError?: () => void;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  required,
  error,
  clearFieldError,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => { onChange(e.target.value); clearFieldError?.(); }}
        required={required}
        className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-all ${
          error 
            ? "border-destructive focus:border-destructive focus:ring-destructive/30" 
            : "border-border focus:border-primary focus:ring-primary/50"
        }`}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}

interface ArrayFieldProps {
  label: string;
  values: string[];
  onChange: (vals: string[]) => void;
  placeholder?: string;
}

export function ArrayField({
  label,
  values,
  onChange,
  placeholder,
}: ArrayFieldProps) {
  const add = () => onChange([...values, ""]);
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const update = (i: number, val: string) => {
    const next = [...values];
    next[i] = val;
    onChange(next);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      <div className="space-y-2">
        {(values || []).map((val, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={val}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-2 rounded-lg border border-border text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <Plus size={16} /> Add {label}
      </button>
    </div>
  );
}

interface TagsInputProps {
  label: string;
  values: string[];
  onChange: (vals: string[]) => void;
  placeholder?: string;
  error?: string;
  clearFieldError?: () => void;
}

export function TagsInput({ label, values, onChange, placeholder, error, clearFieldError }: TagsInputProps) {
  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (values.includes(tag)) return;
    onChange([...values, tag]);
    clearFieldError?.();
  };

  const removeTag = (i: number) => {
    onChange(values.filter((_, idx) => idx !== i));
    clearFieldError?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(e.currentTarget.value);
      e.currentTarget.value = "";
    } else if (e.key === "Backspace" && e.currentTarget.value === "" && values.length > 0) {
      removeTag(values.length - 1);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim()) {
      addTag(e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      <div 
        className={`w-full px-2 py-2 rounded-lg border bg-background focus-within:ring-2 transition-all flex flex-wrap gap-2 ${
          error 
            ? "border-destructive focus-within:border-destructive focus-within:ring-destructive/30" 
            : "border-border focus-within:border-primary focus-within:ring-primary/50"
        }`}
      >
        {values.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="hover:text-destructive transition-colors"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          onChange={() => clearFieldError?.()}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={values.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent text-foreground text-sm focus:outline-none px-1 py-1"
        />
      </div>
      {error ? (
        <p className="mt-1.5 text-sm text-destructive">{error}</p>
      ) : (
        <p className="mt-1 text-xs text-muted-foreground">
          Press Enter or comma to add a tag
        </p>
      )}
    </div>
  );
}

interface ObjectArrayFieldProps {
  label: string;
  fields: { key: string; label: string; type?: string }[];
  values: Record<string, string>[];
  onChange: (vals: Record<string, string>[]) => void;
}

export function ObjectArrayField({
  label,
  fields,
  values,
  onChange,
}: ObjectArrayFieldProps) {
  const add = () => {
    const empty = fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {});
    onChange([...values, empty]);
  };
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const update = (i: number, key: string, val: string) => {
    const next = [...values];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <div className="space-y-3">
        {(values || []).map((val, i) => (
          <div
            key={i}
            className="p-3 rounded-lg border border-border bg-muted/30 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                #{i + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="p-1 rounded text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
              >
                <X size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {fields.map((f) => (
                <input
                  key={f.key}
                  value={val[f.key] || ""}
                  onChange={(e) => update(i, f.key, e.target.value)}
                  placeholder={f.label}
                  type={f.type || "text"}
                  className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <Plus size={16} /> Add {label}
      </button>
    </div>
  );
}
