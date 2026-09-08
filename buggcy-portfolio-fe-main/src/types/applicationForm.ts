export type ApplicationFieldType =
  | "text"
  | "email"
  | "phone"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "url"
  | "file";

/**
 * A single custom field designed by Admin/HR via the "Application Form
 * Builder" for a specific career. These are rendered on the public apply
 * page in addition to the fixed fields (First/Last Name, Email, Phone,
 * Resume, Cover Letter), which are not customizable here.
 */
export interface ApplicationFormField {
  id: string;
  label: string;
  fieldType: ApplicationFieldType;
  placeholder?: string;
  required: boolean;
  order: number;
  /** Only used when fieldType is "select" or "radio" */
  options?: string[];
}

export const APPLICATION_FIELD_TYPES: { value: ApplicationFieldType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Textarea" },
  { value: "select", label: "Select" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date", label: "Date" },
  { value: "url", label: "URL" },
  { value: "file", label: "File Upload" },
];

export const OPTION_BASED_FIELD_TYPES: ApplicationFieldType[] = ["select", "radio"];

export function slugifyFieldId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/(^_|_$)+/g, "");
}

/**
 * Ensures a field id is unique among the given existing ids by appending
 * a numeric suffix ("_2", "_3", ...) when the base slug collides.
 */
export function uniqueFieldId(base: string, existingIds: string[]): string {
  const safeBase = base || "field";
  if (!existingIds.includes(safeBase)) return safeBase;
  let i = 2;
  while (existingIds.includes(`${safeBase}_${i}`)) i += 1;
  return `${safeBase}_${i}`;
}

export function createEmptyApplicationFormField(order: number): ApplicationFormField {
  return {
    id: `field_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    label: "",
    fieldType: "text",
    placeholder: "",
    required: false,
    order,
    options: [],
  };
}
