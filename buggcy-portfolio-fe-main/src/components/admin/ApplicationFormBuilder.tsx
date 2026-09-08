import { Plus, X, ChevronUp, ChevronDown, GripVertical } from "lucide-react";
import type { ApplicationFormField } from "../../types/applicationForm";
import {
  APPLICATION_FIELD_TYPES,
  OPTION_BASED_FIELD_TYPES,
  createEmptyApplicationFormField,
  slugifyFieldId,
  uniqueFieldId,
} from "../../types/applicationForm";

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

interface ApplicationFormBuilderProps {
  fields: ApplicationFormField[];
  onChange: (fields: ApplicationFormField[]) => void;
}

export default function ApplicationFormBuilder({
  fields,
  onChange,
}: ApplicationFormBuilderProps) {
  const sorted = [...fields].sort((a, b) => a.order - b.order);

  const commit = (next: ApplicationFormField[]) => {
    // Re-stamp order to match array position after any add/remove/move.
    onChange(next.map((f, i) => ({ ...f, order: i })));
  };

  const addField = () => {
    commit([...sorted, createEmptyApplicationFormField(sorted.length)]);
  };

  const updateField = (id: string, patch: Partial<ApplicationFormField>) => {
    commit(sorted.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  // Keeps a still-unlabeled field's id in sync with a human-readable slug
  // of its label (e.g. "Years of Experience" -> "years_of_experience"),
  // so extraData keys and admin views stay readable. Once a field already
  // has a real (non auto-generated) id, further label edits no longer
  // reassign it, to avoid orphaning any answers already submitted against it.
  // The id itself is only finalized on blur (not on every keystroke) since
  // it doubles as this field's React `key` — reassigning it mid-keystroke
  // would remount the input and drop focus.
  const finalizeFieldId = (field: ApplicationFormField) => {
    const isFreshId = field.id.startsWith("field_");
    if (!isFreshId) return;
    const base = slugifyFieldId(field.label);
    if (!base) return;
    const otherIds = sorted.filter((f) => f.id !== field.id).map((f) => f.id);
    const nextId = uniqueFieldId(base, otherIds);
    if (nextId === field.id) return;
    commit(sorted.map((f) => (f.id === field.id ? { ...f, id: nextId } : f)));
  };

  const removeField = (id: string) => {
    commit(sorted.filter((f) => f.id !== id));
  };

  const moveField = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;
    const next = [...sorted];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    commit(next);
  };

  const addOption = (field: ApplicationFormField) => {
    updateField(field.id, { options: [...(field.options || []), ""] });
  };

  const updateOption = (field: ApplicationFormField, i: number, value: string) => {
    const next = [...(field.options || [])];
    next[i] = value;
    updateField(field.id, { options: next });
  };

  const removeOption = (field: ApplicationFormField, i: number) => {
    updateField(field.id, {
      options: (field.options || []).filter((_, idx) => idx !== i),
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-foreground">
          Application Form Builder
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Design the custom questions for this job's application form. Every
          application already collects First Name, Last Name, Email, Phone,
          Resume and Cover Letter — add fields here for anything else you
          need to ask candidates (e.g. Years of Experience, GitHub URL,
          University).
        </p>
      </div>

      {sorted.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No custom fields yet. Click "Add Field" to build this job's
          application form.
        </div>
      )}

      <div className="space-y-3">
        {sorted.map((field, index) => {
          const needsOptions = OPTION_BASED_FIELD_TYPES.includes(field.fieldType);
          return (
            <div
              key={field.id}
              className="rounded-xl border border-border bg-muted/20 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <GripVertical size={14} />
                  Field #{index + 1}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveField(index, -1)}
                    disabled={index === 0}
                    className="p-1.5 rounded-md border border-border text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Move field up"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveField(index, 1)}
                    disabled={index === sorted.length - 1}
                    className="p-1.5 rounded-md border border-border text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Move field down"
                  >
                    <ChevronDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeField(field.id)}
                    className="p-1.5 rounded-md border border-border text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                    aria-label="Delete field"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Field Label <span className="text-destructive">*</span>
                  </label>
                  <input
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                    onBlur={() => finalizeFieldId(field)}
                    placeholder="e.g. Years of Experience"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Field Type
                  </label>
                  <select
                    value={field.fieldType}
                    onChange={(e) =>
                      updateField(field.id, {
                        fieldType: e.target.value as ApplicationFormField["fieldType"],
                      })
                    }
                    className={inputClass}
                  >
                    {APPLICATION_FIELD_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {field.fieldType !== "checkbox" && field.fieldType !== "file" && (
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Placeholder
                  </label>
                  <input
                    value={field.placeholder || ""}
                    onChange={(e) =>
                      updateField(field.id, { placeholder: e.target.value })
                    }
                    placeholder="e.g. Enter years of experience"
                    className={inputClass}
                  />
                </div>
              )}

              {needsOptions && (
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Options
                  </label>
                  <div className="space-y-2">
                    {(field.options || []).map((opt, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={opt}
                          onChange={(e) => updateOption(field, i, e.target.value)}
                          placeholder={`Option ${i + 1}`}
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(field, i)}
                          className="p-2 rounded-lg border border-border text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addOption(field)}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    <Plus size={14} /> Add Option
                  </button>
                  {(field.options || []).length === 0 && (
                    <p className="mt-1 text-xs text-destructive">
                      Add at least one option for this field type.
                    </p>
                  )}
                </div>
              )}

              <label className="flex items-center gap-2 cursor-pointer w-fit">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateField(field.id, { required: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-xs font-medium text-foreground">Required</span>
              </label>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={addField}
        className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
      >
        <Plus size={16} /> Add Field
      </button>
    </div>
  );
}
