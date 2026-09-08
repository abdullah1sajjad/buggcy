import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormErrors } from "../../../hooks/useFormErrors";
import {
  TextField,
  TextareaField,
  SelectField,
  TagsInput,
} from "../../../components/admin/FormFields";
import ImageUpload from "../../../components/admin/ImageUpload";
import RichTextEditor from "../../../components/admin/RichTextEditor";
import {
  useBlogQuery,
  useCreateBlog,
  useUpdateBlog,
} from "../../../services/queries";
import { slugify } from "../../../services/adapters";
import type { Blog } from "../../../types";

function getInitialForm(existing?: Blog): Omit<Blog, "id"> {
  if (existing) {
    return {
      title: existing.title,
      slug: existing.slug || "",
      excerpt: existing.excerpt || "",
      content: existing.content,
      author: existing.author,
      date: existing.date,
      imageUrl: existing.imageUrl || "",
      tags: existing.tags || [],
      category: existing.category || "Blog",
      status: existing.status || "published",
    };
  }
  return {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
    imageUrl: "",
    tags: [],
    category: "Blog",
    status: "published",
  };
}

export default function BlogFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: existing } = useBlogQuery(id || "");
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();

  const [form, setForm] = useState<Omit<Blog, "id">>(() => getInitialForm());
  const [slugTouched, setSlugTouched] = useState(false);
  const { errors, handleApiError, clearErrors, clearFieldError } = useFormErrors();

  // Update form when data loads
  useEffect(() => {
    if (isEdit && existing) {
      setForm(getInitialForm(existing));
      setSlugTouched(true);
    }
  }, [existing, isEdit]);

  const update = (key: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (isEdit && id) {
      updateBlog.mutate(
        { id, data: form },
        { onSuccess: () => navigate("/admin/blogs"), onError: handleApiError },
      );
    } else {
      createBlog.mutate(form, {
        onSuccess: () => navigate("/admin/blogs"),
        onError: handleApiError,
      });
    }
  };

  const isPending = createBlog.isPending || updateBlog.isPending;

  return (
    <div className="max-w-3xl space-y-6">
      <p className="text-muted-foreground">
        {isEdit ? "Update blog post details" : "Add a new blog post"}
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
          onChange={handleTitleChange}
          required
          placeholder="Blog post title"
          error={errors.title}
          clearFieldError={() => clearFieldError("title")}
        />

        <TextField
          label="Slug"
          value={form.slug || ""}
          onChange={(v) => {
            setSlugTouched(true);
            update("slug", v);
          }}
          required
          placeholder="blog-post-slug"
          error={errors.slug}
          clearFieldError={() => clearFieldError("slug")}
        />

        <TextareaField
          label="Excerpt"
          value={form.excerpt || ""}
          onChange={(v) => update("excerpt", v)}
          placeholder="Short summary shown in blog listings (auto-generated from content if left blank)"
          rows={2}
          error={errors.excerpt}
          clearFieldError={() => clearFieldError("excerpt")}
        />

        <TextField
          label="Date"
          value={form.date}
          onChange={(v) => update("date", v)}
          type="date"
          required
          error={errors.date}
          clearFieldError={() => clearFieldError("date")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Category
            </label>
            <select
              value={form.category || ""}
              onChange={(e) => update("category", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            >
              <option value="Blog">Blog</option>
              <option value="Case Study">Case Study</option>
              <option value="AI Guide">AI Guide</option>
              <option value="Tech Guide">Tech Guide</option>
              <option value="Product">Product</option>
            </select>
          </div>
          <SelectField
            label="Status"
            value={form.status || "published"}
            onChange={(v) => update("status", v)}
            options={["draft", "published"]}
            required
            error={errors.status}
            clearFieldError={() => clearFieldError("status")}
          />
        </div>

        <ImageUpload
          label="Image URL"
          value={form.imageUrl || ""}
          onChange={(v) => update("imageUrl", v)}
          folder="website/blog-covers"
        />

        <TagsInput
          label="Tags"
          values={form.tags || []}
          onChange={(v) => update("tags", v)}
          placeholder="Type a tag and press Enter"
          error={errors.tags}
        />

        <RichTextEditor
          label="Content"
          value={form.content}
          onChange={(v) => update("content", v)}
          required
          placeholder="Write your blog content here..."
          error={errors.content}
          clearFieldError={() => clearFieldError("content")}
        />

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isPending ? "Saving..." : isEdit ? "Update Blog" : "Create Blog"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/blogs")}
            className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
