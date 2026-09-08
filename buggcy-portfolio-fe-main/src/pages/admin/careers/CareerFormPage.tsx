import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  TextareaField,
  SelectField,
  ArrayField,
} from "../../../components/admin/FormFields";
import { useFormErrors } from "../../../hooks/useFormErrors";
import ApplicationFormBuilder from "../../../components/admin/ApplicationFormBuilder";
import {
  useCareerQuery,
  useCreateCareer,
  useUpdateCareer,
} from "../../../services/queries";
import type { Career } from "../../../types";
import type { ApplicationFormField } from "../../../types/applicationForm";
import { OPTION_BASED_FIELD_TYPES } from "../../../types/applicationForm";

function getInitialForm(existing?: Career): Omit<Career, "id"> {
  if (existing) {
    return {
      title: existing.title,
      description: existing.description,
      location: existing.location,
      type: existing.type,
      requirements: existing.requirements || [],
      department: existing.department || "",
      responsibilities: existing.responsibilities || "", // ← add
      status: existing.status || "open", // ← add
      salaryRange: existing.salaryRange || "",
      salaryCurrency: existing.salaryCurrency || "",
      deadline: existing.deadline || "",
      applicationFormSchema: existing.applicationFormSchema || [],
    };
  }
  return {
    title: "",
    description: "",
    location: "",
    type: "Full-time",
    requirements: [],
    department: "",
    responsibilities: "", // ← add
    status: "open", // ← add
    salaryRange: "",
    salaryCurrency: "",
    deadline: "", // ← add
    applicationFormSchema: [],
  };
}

export default function CareerFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: existing } = useCareerQuery(id || "");
  const createCareer = useCreateCareer();
  const updateCareer = useUpdateCareer();

  const [form, setForm] = useState<Omit<Career, "id">>(() => getInitialForm());
  const { errors, handleApiError, clearErrors, clearFieldError } = useFormErrors();

  useEffect(() => {
    if (isEdit && existing) {
      setForm(getInitialForm(existing));
    }
  }, [existing, isEdit]);

  const update = (
    key: string,
    value: string | string[] | ApplicationFormField[],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateFormBuilder = (): string | null => {
    const fields = form.applicationFormSchema || [];
    for (const field of fields) {
      if (!field.label.trim()) {
        return "Every custom application field needs a label.";
      }
      if (
        OPTION_BASED_FIELD_TYPES.includes(field.fieldType) &&
        (!field.options || field.options.filter((o) => o.trim()).length === 0)
      ) {
        return `"${field.label}" needs at least one option.`;
      }
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    const validationError = validateFormBuilder();
    if (validationError) {
      handleApiError(new Error(validationError));
      return;
    }

    if (isEdit && id) {
      updateCareer.mutate(
        { id, data: form },
        { onSuccess: () => navigate("/admin/careers"), onError: handleApiError },
      );
    } else {
      createCareer.mutate(form, {
        onSuccess: () => navigate("/admin/careers"),
        onError: handleApiError,
      });
    }
  };

  const isPending = createCareer.isPending || updateCareer.isPending;

  return (
    <div className="max-w-3xl space-y-6">
      <p className="text-muted-foreground">
        {isEdit ? "Update job posting details" : "Add a new job posting"}
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-card border border-border rounded-xl p-4 sm:p-6"
      >
        {errors.general && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20">
            {errors.general}
          </div>
        )}
        <TextField
          label="Title"
          value={form.title}
          onChange={(v) => update("title", v)}
          required
          placeholder="Job title"
          error={errors.title}
          clearFieldError={() => clearFieldError("title")}
        />

        <TextareaField
          label="Description"
          value={form.description}
          onChange={(v) => update("description", v)}
          required
          placeholder="Job description"
          error={errors.description}
          clearFieldError={() => clearFieldError("description")}
        />

        <TextareaField
          label="Responsibilities"
          value={form.responsibilities || ""}
          onChange={(v) => update("responsibilities", v)}
          placeholder="Key responsibilities for this role"
          rows={4}
          error={errors.responsibilities}
          clearFieldError={() => clearFieldError("responsibilities")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Location"
            value={form.location}
            onChange={(v) => update("location", v)}
            required
            placeholder="e.g. Remote, Lahore"
            error={errors.location}
            clearFieldError={() => clearFieldError("location")}
          />
          <SelectField
            label="Job Type"
            value={form.type}
            onChange={(v) => update("type", v)}
            options={[
              "Full-time",
              "Part-time",
              "Contract",
              "Internship",
              "Remote",
            ]}
            error={errors.type}
            clearFieldError={() => clearFieldError("type")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Department"
            value={form.department || ""}
            onChange={(v) => update("department", v)}
            placeholder="e.g. Engineering, Design"
            error={errors.department}
            clearFieldError={() => clearFieldError("department")}
          />
          <SelectField
            label="Status"
            value={form.status || "open"}
            onChange={(v) => update("status", v)}
            options={["open", "closed", "draft"]}
            error={errors.status}
            clearFieldError={() => clearFieldError("status")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Salary Range"
            value={form.salaryRange || ""}
            onChange={(v) => update("salaryRange", v)}
            placeholder="e.g. 60,000 - 90,000"
            error={errors.salaryRange}
            clearFieldError={() => clearFieldError("salaryRange")}
          />
          <SelectField
            label="Currency"
            value={form.salaryCurrency || ""}
            onChange={(v) => update("salaryCurrency", v)}
            options={["PKR", "USD", "EUR", "GBP", "NOK"]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Application Deadline"
            value={form.deadline || ""}
            onChange={(v) => update("deadline", v)}
            type="date"
            error={errors.deadline}
            clearFieldError={() => clearFieldError("deadline")}
          />
        </div>

        <ArrayField
          label="Requirements"
          values={form.requirements}
          onChange={(v) => update("requirements", v)}
          placeholder="Enter requirement"
        />

        <div className="pt-2 border-t border-border">
          <ApplicationFormBuilder
            fields={form.applicationFormSchema || []}
            onChange={(fields) => update("applicationFormSchema", fields)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isPending
              ? "Saving..."
              : isEdit
                ? "Update Career"
                : "Create Career"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/careers")}
            className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
