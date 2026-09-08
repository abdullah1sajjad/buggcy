import { Upload } from "lucide-react";
import type { ApplicationFormField } from "../../types/applicationForm";

export interface DynamicFieldValues {
  [fieldId: string]: string | boolean;
}

export interface DynamicFieldFiles {
  [fieldId: string]: File | null;
}

interface DynamicApplicationFieldsProps {
  fields: ApplicationFormField[];
  values: DynamicFieldValues;
  files: DynamicFieldFiles;
  onValueChange: (fieldId: string, value: string | boolean) => void;
  onFileChange: (fieldId: string, file: File | null) => void;
  inputClass: string;
}

/**
 * Renders the job-specific custom fields designed via the Admin/HR
 * "Application Form Builder" (career.applicationFormSchema). This sits
 * alongside — not instead of — the fixed Personal Info / Resume / Cover
 * Letter sections on the public apply page.
 */
export default function DynamicApplicationFields({
  fields,
  values,
  files,
  onValueChange,
  onFileChange,
  inputClass,
}: DynamicApplicationFieldsProps) {
  if (!fields || fields.length === 0) return null;

  const sorted = [...fields].sort((a, b) => a.order - b.order);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sorted.map((field) => {
        const value = values[field.id];
        const label = (
          <label className="block text-xs font-medium mb-1.5 text-muted-foreground">
            {field.label} {field.required && "*"}
          </label>
        );

        switch (field.fieldType) {
          case "textarea":
            return (
              <div key={field.id} className="md:col-span-2">
                {label}
                <textarea
                  rows={4}
                  value={(value as string) || ""}
                  onChange={(e) => onValueChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={inputClass + " resize-none"}
                />
              </div>
            );

          case "select":
            return (
              <div key={field.id}>
                {label}
                <select
                  value={(value as string) || ""}
                  onChange={(e) => onValueChange(field.id, e.target.value)}
                  required={field.required}
                  className={inputClass}
                >
                  <option value="">
                    {field.placeholder || "Select..."}
                  </option>
                  {(field.options || []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            );

          case "radio":
            return (
              <div key={field.id} className="md:col-span-2">
                {label}
                <div className="flex flex-wrap gap-4">
                  {(field.options || []).map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={field.id}
                        value={opt}
                        checked={value === opt}
                        onChange={(e) => onValueChange(field.id, e.target.value)}
                        required={field.required}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            );

          case "checkbox":
            return (
              <div key={field.id} className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => onValueChange(field.id, e.target.checked)}
                    required={field.required}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  {field.label} {field.required && "*"}
                </label>
              </div>
            );

          case "file": {
            const file = files[field.id];
            return (
              <div key={field.id} className="md:col-span-2">
                {label}
                <label className="cursor-pointer block">
                  <div
                    className={`border-2 border-dashed rounded-xl p-4 text-center transition-all ${
                      file
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Upload
                      className={`h-6 w-6 mx-auto mb-2 ${
                        file ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    {file ? (
                      <p className="font-medium text-primary text-sm">
                        {file.name}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {field.placeholder || "Click to upload a file"}
                      </p>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      onFileChange(field.id, e.target.files?.[0] || null)
                    }
                  />
                </label>
              </div>
            );
          }

          case "number":
            return (
              <div key={field.id}>
                {label}
                <input
                  type="number"
                  value={(value as string) || ""}
                  onChange={(e) => onValueChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={inputClass}
                />
              </div>
            );

          case "date":
            return (
              <div key={field.id}>
                {label}
                <input
                  type="date"
                  value={(value as string) || ""}
                  onChange={(e) => onValueChange(field.id, e.target.value)}
                  required={field.required}
                  className={inputClass}
                />
              </div>
            );

          case "email":
          case "url":
          case "phone":
          case "text":
          default:
            return (
              <div key={field.id}>
                {label}
                <input
                  type={
                    field.fieldType === "email"
                      ? "email"
                      : field.fieldType === "url"
                        ? "url"
                        : field.fieldType === "phone"
                          ? "tel"
                          : "text"
                  }
                  value={(value as string) || ""}
                  onChange={(e) => onValueChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={inputClass}
                />
              </div>
            );
        }
      })}
    </div>
  );
}
