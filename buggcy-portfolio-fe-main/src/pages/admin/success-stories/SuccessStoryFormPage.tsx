import { useState } from "react";
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
  useSuccessStoryQuery,
  useCreateSuccessStory,
  useUpdateSuccessStory,
} from "../../../services/queries";
import type { SuccessStory } from "../../../types";

type StoryForm = Omit<SuccessStory, "id">;

function getInitialForm(existing?: SuccessStory): StoryForm {
  if (existing) {
    return {
      title: existing.title,
      slug: existing.slug,
      client: existing.client,
      category: existing.category,
      description: existing.description,
      problem: existing.problem,
      solution: existing.solution,
      results: existing.results || [],
      technologies: existing.technologies || [],
      imageUrl: existing.imageUrl || "",
      laptopImageUrl: existing.laptopImageUrl || "",
      mobileImageUrl: existing.mobileImageUrl || "",
      tabletImageUrl: existing.tabletImageUrl || "",
      desktopImageUrl: existing.desktopImageUrl || "",
      liveUrl: existing.liveUrl || "",
    };
  }
  return {
    title: "",
    slug: "",
    client: "",
    category: "",
    description: "",
    problem: "",
    solution: "",
    results: [],
    technologies: [],
    imageUrl: "",
    laptopImageUrl: "",
    mobileImageUrl: "",
    tabletImageUrl: "",
    desktopImageUrl: "",
    liveUrl: "",
  };
}

interface StoryFormInnerProps {
  initialForm: StoryForm;
  isEdit: boolean;
  id?: string;
}

function StoryFormInner({ initialForm, isEdit, id }: StoryFormInnerProps) {
  const navigate = useNavigate();
  const createStory = useCreateSuccessStory();
  const updateStory = useUpdateSuccessStory();
  const [form, setForm] = useState<StoryForm>(initialForm);
  const { errors, handleApiError, clearErrors, clearFieldError } = useFormErrors();

  const update = (key: keyof StoryForm, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    const payload = {
      ...form,
      results: (form.results || []).filter((r) => r.label && r.value),
      technologies: (form.technologies || []).filter(Boolean),
    };
    if (isEdit && id) {
      updateStory.mutate(
        { id, data: payload as Partial<SuccessStory> },
        { onSuccess: () => navigate("/admin/success-stories"), onError: handleApiError }
      );
    } else {
      createStory.mutate(payload as Omit<SuccessStory, "id">, {
        onSuccess: () => navigate("/admin/success-stories"),
        onError: handleApiError,
      });
    }
  };

  const isPending = createStory.isPending || updateStory.isPending;

  return (
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
            placeholder="Story title"
            error={errors.title}
            clearFieldError={() => clearFieldError("title")}
          />
          <TextField
            label="Slug"
            value={form.slug}
            onChange={(v) => update("slug", v)}
            required
            placeholder="story-slug"
            error={errors.slug}
            clearFieldError={() => clearFieldError("slug")}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Client"
            value={form.client}
            onChange={(v) => update("client", v)}
            required
            placeholder="Client name"
            error={errors.client}
            clearFieldError={() => clearFieldError("client")}
          />
          <TextField
            label="Category"
            value={form.category}
            onChange={(v) => update("category", v)}
            required
            placeholder="e.g. Healthcare, FinTech"
            error={errors.category}
            clearFieldError={() => clearFieldError("category")}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageUpload
            label="Image URL"
            value={form.imageUrl || ""}
            onChange={(v) => update("imageUrl", v)}
          />
          <TextField
            label="Live URL"
            value={form.liveUrl || ""}
            onChange={(v) => update("liveUrl", v)}
            placeholder="https://..."
            error={errors.liveUrl}
            clearFieldError={() => clearFieldError("liveUrl")}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
        <h3 className="text-lg font-semibold text-foreground">Problem & Solution</h3>
        <TextareaField
          label="Problem"
          value={form.problem}
          onChange={(v) => update("problem", v)}
          required
          placeholder="What was the problem?"
          rows={4}
          error={errors.problem}
          clearFieldError={() => clearFieldError("problem")}
        />
        <TextareaField
          label="Solution"
          value={form.solution}
          onChange={(v) => update("solution", v)}
          required
          placeholder="What was the solution?"
          rows={4}
          error={errors.solution}
          clearFieldError={() => clearFieldError("solution")}
        />
      </div>

      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
        <h3 className="text-lg font-semibold text-foreground">Results</h3>
        <ObjectArrayField
          label="Results"
          fields={[
            { key: "label", label: "Label" },
            { key: "value", label: "Value" },
          ]}
          values={form.results || []}
          onChange={(v) => update("results", v)}
        />
      </div>

      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
        <h3 className="text-lg font-semibold text-foreground">Device Frame Images</h3>
        <p className="text-sm text-muted-foreground">Add images for each device frame view. These will be displayed in the detail page.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageUpload
            label="Laptop Image"
            value={form.laptopImageUrl || ""}
            onChange={(v) => update("laptopImageUrl", v)}
          />
          <ImageUpload
            label="Mobile Image"
            value={form.mobileImageUrl || ""}
            onChange={(v) => update("mobileImageUrl", v)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageUpload
            label="Tablet Image"
            value={form.tabletImageUrl || ""}
            onChange={(v) => update("tabletImageUrl", v)}
          />
          <ImageUpload
            label="Desktop Image"
            value={form.desktopImageUrl || ""}
            onChange={(v) => update("desktopImageUrl", v)}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
        <h3 className="text-lg font-semibold text-foreground">Technologies</h3>
        <ArrayField
          label="Technologies"
          values={form.technologies || []}
          onChange={(v) => update("technologies", v)}
          placeholder="Technology"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50"
        >
          {isPending ? "Saving..." : isEdit ? "Update Story" : "Create Story"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/admin/success-stories")}
          className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function SuccessStoryFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const { data: existing } = useSuccessStoryQuery(id || "");

  if (isEdit && !existing) {
    return (
      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Edit Success Story</h2>
        </div>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <StoryFormInner
        key={isEdit ? id : "create"}
        initialForm={getInitialForm(existing)}
        isEdit={isEdit}
        id={id}
      />
    </div>
  );
}
