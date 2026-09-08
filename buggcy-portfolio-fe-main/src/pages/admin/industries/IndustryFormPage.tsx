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
  useIndustryQuery,
  useCreateIndustry,
  useUpdateIndustry,
} from "../../../services/queries";
import type { Industry } from "../../../types";

type IndustryForm = Omit<Industry, "id">;

const emptyForm: IndustryForm = {
  title: "",
  slug: "",
  description: "",
  heroSubtitle: "",
  heroCta: "",
  icon: "",
  imageUrl: "",
  features: [],
  challenges: [],
  solutions: [],
  technologies: [],
  detailedContent: "",
  challengesDetailed: [],
  lifecycle: [],
  approach: [],
  stats: [],
  relatedServices: [],
  testimonials: [],
  successStories: [],
};

function getInitialForm(existing?: Industry): IndustryForm {
  if (existing) {
    return {
      title: existing.title,
      slug: existing.slug,
      description: existing.description,
      heroSubtitle: existing.heroSubtitle || "",
      heroCta: existing.heroCta || "",
      icon: existing.icon || "",
      imageUrl: existing.imageUrl || "",
      features: existing.features || [],
      challenges: existing.challenges || [],
      solutions: existing.solutions || [],
      technologies: existing.technologies || [],
      detailedContent: existing.detailedContent || "",
      challengesDetailed: existing.challengesDetailed || [],
      lifecycle: existing.lifecycle || [],
      approach: existing.approach || [],
      stats: existing.stats || [],
      relatedServices: existing.relatedServices || [],
      testimonials: existing.testimonials || [],
      successStories: existing.successStories || [],
    };
  }
  return emptyForm;
}

export default function IndustryFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: existing } = useIndustryQuery(id || "");
  const createIndustry = useCreateIndustry();
  const updateIndustry = useUpdateIndustry();

  const [form, setForm] = useState<IndustryForm>(() => getInitialForm());
  const { errors, handleApiError, clearErrors, clearFieldError } = useFormErrors();

  useEffect(() => {
    if (isEdit && existing) {
      setForm(getInitialForm(existing));
    }
  }, [existing, isEdit]);

  const update = (key: keyof IndustryForm, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    // Strip blank entries left behind by "Add" buttons the user didn't fill in —
    // the backend rejects empty strings in these array fields.
    const cleanedForm: IndustryForm = {
      ...form,
      features: (form.features || []).map((v) => v.trim()).filter(Boolean),
      challenges: (form.challenges || []).map((v) => v.trim()).filter(Boolean),
      solutions: (form.solutions || []).map((v) => v.trim()).filter(Boolean),
      technologies: (form.technologies || [])
        .map((v) => v.trim())
        .filter(Boolean),
    };

    if (cleanedForm.features.length === 0) {
      handleApiError(new Error("At least one feature is required"));
      return;
    }

    if (isEdit && id) {
      updateIndustry.mutate(
        { id, data: cleanedForm as Partial<Industry> },
        {
          onSuccess: () => navigate("/admin/industries"),
          onError: handleApiError,
        },
      );
    } else {
      createIndustry.mutate(cleanedForm as Omit<Industry, "id">, {
        onSuccess: () => navigate("/admin/industries"),
        onError: handleApiError,
      });
    }
  };

  const isPending = createIndustry.isPending || updateIndustry.isPending;

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
              placeholder="Industry title"
              error={errors.title}
              clearFieldError={() => clearFieldError("title")}
            />
            <TextField
              label="Slug"
              value={form.slug}
              onChange={(v) => update("slug", v)}
              required
              placeholder="industry-slug"
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
              label="Hero Subtitle"
              value={form.heroSubtitle || ""}
              onChange={(v) => update("heroSubtitle", v)}
              placeholder="Hero subtitle"
              error={errors.heroSubtitle}
              clearFieldError={() => clearFieldError("heroSubtitle")}
            />
            <TextField
              label="Hero CTA"
              value={form.heroCta || ""}
              onChange={(v) => update("heroCta", v)}
              placeholder="CTA text"
              error={errors.heroCta}
              clearFieldError={() => clearFieldError("heroCta")}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Icon"
              value={form.icon || ""}
              onChange={(v) => update("icon", v)}
              placeholder="e.g. HeartPulse"
              error={errors.icon}
              clearFieldError={() => clearFieldError("icon")}
            />
            <ImageUpload
              label="Image URL"
              value={form.imageUrl || ""}
              onChange={(v) => update("imageUrl", v)}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">Lists</h3>
          <ArrayField
            label="Features *"
            values={form.features}
            onChange={(v) => update("features", v)}
            placeholder="Feature"
          />
          <ArrayField
            label="Challenges"
            values={form.challenges}
            onChange={(v) => update("challenges", v)}
            placeholder="Challenge"
          />
          <ArrayField
            label="Solutions"
            values={form.solutions}
            onChange={(v) => update("solutions", v)}
            placeholder="Solution"
          />
          <ArrayField
            label="Technologies"
            values={form.technologies || []}
            onChange={(v) => update("technologies", v)}
            placeholder="Technology"
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
            Challenges Detailed
          </h3>
          <ObjectArrayField
            label="Challenges"
            fields={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description" },
            ]}
            values={form.challengesDetailed || []}
            onChange={(v) => update("challengesDetailed", v)}
          />
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">Lifecycle</h3>
          <ObjectArrayField
            label="Lifecycle Steps"
            fields={[
              { key: "step", label: "Step #" },
              { key: "title", label: "Title" },
              { key: "description", label: "Description" },
            ]}
            values={form.lifecycle || []}
            onChange={(v) => update("lifecycle", v)}
          />
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">Approach</h3>
          <ObjectArrayField
            label="Approach Steps"
            fields={[
              { key: "step", label: "Step #" },
              { key: "title", label: "Title" },
              { key: "description", label: "Description" },
            ]}
            values={form.approach || []}
            onChange={(v) => update("approach", v)}
          />
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">
            Testimonials
          </h3>
          <ObjectArrayField
            label="Testimonials"
            fields={[
              { key: "quote", label: "Quote" },
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "company", label: "Company" },
              { key: "location", label: "Location" },
            ]}
            values={(form.testimonials || []).map((t) => ({
              quote: t.quote,
              name: t.name,
              role: t.role,
              company: t.company,
              location: t.location || "",
            }))}
            onChange={(v) => update("testimonials", v)}
          />
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">
            Related Services
          </h3>
          <ObjectArrayField
            label="Related Services"
            fields={[
              { key: "title", label: "Title" },
              { key: "href", label: "Link" },
            ]}
            values={form.relatedServices || []}
            onChange={(v) => update("relatedServices", v)}
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
                ? "Update Industry"
                : "Create Industry"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/industries")}
            className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
