import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  TextareaField,
  ArrayField,
  ObjectArrayField,
} from "../../../components/admin/FormFields";
import { useFormErrors } from "../../../hooks/useFormErrors";
import ImageUpload from "../../../components/admin/ImageUpload";
import {
  useServiceQuery,
  useCreateService,
  useUpdateService,
} from "../../../services/queries";
import type { Service } from "../../../types";

type ServiceForm = Omit<Service, "id">;

function getInitialForm(existing?: Service): ServiceForm {
  if (existing) {
    return {
      title: existing.title,
      slug: existing.slug,
      description: existing.description,
      icon: existing.icon || "",
      imageUrl: existing.imageUrl || "",
      secondaryImageUrl: existing.secondaryImageUrl || "",
      features: existing.features || [],
      technologies: existing.technologies || [],
      detailedContent: existing.detailedContent || "",
      process: existing.process || [],
      stats: existing.stats || [],
      whyChooseUs: existing.whyChooseUs || [],
      faqs: existing.faqs || [],
      useCases: existing.useCases || [],
    };
  }
  return {
    title: "",
    slug: "",
    description: "",
    icon: "",
    imageUrl: "",
    secondaryImageUrl: "",
    features: [],
    technologies: [],
    detailedContent: "",
    process: [],
    stats: [],
    whyChooseUs: [],
    faqs: [],
    useCases: [],
  };
}

export default function ServiceFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: existing } = useServiceQuery(id || "");
  const createService = useCreateService();
  const updateService = useUpdateService();

  const [form, setForm] = useState<ServiceForm>(() => getInitialForm());
  const { errors, handleApiError, clearErrors, clearFieldError } = useFormErrors();

  useEffect(() => {
    if (isEdit && existing) {
      setForm(getInitialForm(existing));
    }
  }, [existing, isEdit]);
  const update = (key: keyof ServiceForm, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (isEdit && id) {
      updateService.mutate(
        { id, data: form as Partial<Service> },
        { onSuccess: () => navigate("/admin/services"), onError: handleApiError },
      );
    } else {
      createService.mutate(form as Omit<Service, "id">, {
        onSuccess: () => navigate("/admin/services"),
        onError: handleApiError,
      });
    }
  };

  const isPending = createService.isPending || updateService.isPending;

  return (
    <div className="max-w-3xl space-y-6">

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20">
            {errors.general}
          </div>
        )}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">Basic Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Title"
              value={form.title}
              onChange={(v) => update("title", v)}
              required
              placeholder="Service title"
              error={errors.title}
              clearFieldError={() => clearFieldError("title")}
            />
            <TextField
              label="Slug"
              value={form.slug}
              onChange={(v) => update("slug", v)}
              required
              placeholder="service-slug"
              error={errors.slug}
              clearFieldError={() => clearFieldError("slug")}
            />
          </div>
          <TextareaField
            label="Description"
            value={form.description}
            onChange={(v) => update("description", v)}
            required
            placeholder="Short description"
            error={errors.description}
            clearFieldError={() => clearFieldError("description")}
          />
          <TextareaField
            label="Detailed Content"
            value={form.detailedContent || ""}
            onChange={(v) => update("detailedContent", v)}
            placeholder="Full detailed content"
            rows={6}
            error={errors.detailedContent}
            clearFieldError={() => clearFieldError("detailedContent")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Icon"
              value={form.icon || ""}
              onChange={(v) => update("icon", v)}
              placeholder="e.g. Code2, Globe"
              error={errors.icon}
              clearFieldError={() => clearFieldError("icon")}
            />
            <div />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageUpload
              label="Hero Image URL"
              value={form.imageUrl || ""}
              onChange={(v) => update("imageUrl", v)}
            />
            <ImageUpload
              label="Secondary Image URL"
              value={form.secondaryImageUrl || ""}
              onChange={(v) => update("secondaryImageUrl", v)}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">Lists</h3>
          <ArrayField
            label="Features"
            values={form.features}
            onChange={(v) => update("features", v)}
            placeholder="Feature"
          />
          <ArrayField
            label="Technologies"
            values={form.technologies || []}
            onChange={(v) => update("technologies", v)}
            placeholder="Technology"
          />
          <ArrayField
            label="Use Cases"
            values={form.useCases || []}
            onChange={(v) => update("useCases", v)}
            placeholder="Use case"
          />
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">
            Process Steps
          </h3>
          <ObjectArrayField
            label="Process Steps"
            fields={[
              { key: "step", label: "Step #" },
              { key: "title", label: "Title" },
              { key: "description", label: "Description" },
            ]}
            values={form.process || []}
            onChange={(v) => update("process", v)}
          />
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">Stats</h3>
          <ObjectArrayField
            label="Stats"
            fields={[
              { key: "label", label: "Label" },
              { key: "value", label: "Value" },
            ]}
            values={form.stats || []}
            onChange={(v) => update("stats", v)}
          />
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">
            Why Choose Us
          </h3>
          <ObjectArrayField
            label="Why Choose Us"
            fields={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description" },
            ]}
            values={form.whyChooseUs || []}
            onChange={(v) => update("whyChooseUs", v)}
          />
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">FAQs</h3>
          <ObjectArrayField
            label="FAQs"
            fields={[
              { key: "question", label: "Question" },
              { key: "answer", label: "Answer" },
            ]}
            values={form.faqs || []}
            onChange={(v) => update("faqs", v)}
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
                ? "Update Service"
                : "Create Service"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/services")}
            className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
