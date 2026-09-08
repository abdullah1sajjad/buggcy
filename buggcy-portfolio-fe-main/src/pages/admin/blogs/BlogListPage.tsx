import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataTable from "../../../components/admin/DataTable";
import type { Column } from "../../../components/admin/DataTable";
import ConfirmDialog from "../../../components/admin/ConfirmDialog";
import ViewDetailsModal from "../../../components/admin/ViewDetailsModal";

import { useAdminBlogsQuery, useDeleteBlog } from "../../../services/queries";

import type { Blog } from "../../../types";

export default function BlogListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);
  const [viewTarget, setViewTarget] = useState<Blog | null>(null);

  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(newPage));
      return params;
    });
  };

  const setLimit = (newLimit: number, resetPage = false) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("limit", String(newLimit));
      if (resetPage) params.set("page", "1");
      return params;
    });
  };

  const { data: response, isLoading, isFetching } = useAdminBlogsQuery({
    page,
    limit,
    search,
  });
  const blogs = response?.data ?? [];
  const total = response?.total ?? 0;

  const deleteBlog = useDeleteBlog();

  const columns: Column<Blog>[] = [
    {
      key: "title",
      label: "Title",
      render: (b) => <span className="font-medium">{b.title}</span>,
    },
    {
      key: "author",
      label: "Author",
      render: (b) => (typeof b.author === "string" ? b.author : b.author?.name),
    },
    {
      key: "category",
      label: "Category",
      render: (b) => (
        <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
          {b.category || "N/A"}
        </span>
      ),
    },
    { key: "date", label: "Date", hideOnMobile: true },
    {
      key: "status",
      label: "Status",
      render: (b) => {
        const status = b.status || "draft";
        return (
          <span
            className={`capitalize px-2 py-0.5 rounded-full text-xs font-medium ${
              status === "published"
                ? "bg-green-500/10 text-green-500"
                : "bg-yellow-500/10 text-yellow-500"
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Manage your blog posts</p>

      <DataTable
        columns={columns}
        data={blogs}
        searchPlaceholder="Search blogs..."
        searchKeys={["title"]}
        addHref="/admin/blogs/new"
        addLabel="New Blog"
        isLoading={isLoading}
        isFetching={isFetching}
        tableId="admin-blogs"
        totalCount={total}
        currentPage={page}
        onPageChange={setPage}
        onPageSizeChange={(newLimit) => {
          setLimit(newLimit, true);
        }}
        pageSize={limit}
        onSearch={(val) => {
          setSearch(val);
          setPage(1);
        }}
        onEdit={(blog) => navigate(`/admin/blogs/${blog.id}/edit`)}
        onDelete={setDeleteTarget}
        onView={setViewTarget}
        viewLabel="Review"
      />

      {viewTarget && (
        <ViewDetailsModal
          title="Blog Details"
          imageUrl={viewTarget.imageUrl || viewTarget.coverImage || undefined}
          imageAlt={viewTarget.title}
          onClose={() => setViewTarget(null)}
          onEdit={() => {
            navigate(`/admin/blogs/${viewTarget.id}/edit`);
            setViewTarget(null);
          }}
          fields={[
            { label: "Title", value: viewTarget.title },
            { label: "Slug", value: viewTarget.slug },
            {
              label: "Author",
              value: typeof viewTarget.author === "string" ? viewTarget.author : viewTarget.author?.name,
            },
            { label: "Category", value: viewTarget.category },
            {
              label: "Tags",
              value: viewTarget.tags?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {viewTarget.tags.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-muted text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              ) : undefined,
            },
            {
              label: "Status",
              value: viewTarget.status ? (
                <span
                  className={`capitalize px-2 py-0.5 rounded-full text-xs font-medium ${
                    viewTarget.status === "published"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {viewTarget.status}
                </span>
              ) : undefined,
            },
            { label: "Date", value: viewTarget.date },
            { label: "Read Time", value: viewTarget.readTimeMinutes ? `${viewTarget.readTimeMinutes} min` : undefined },
            { label: "Excerpt", value: viewTarget.excerpt ? <p className="whitespace-pre-wrap">{viewTarget.excerpt}</p> : undefined },
            {
              label: "Content",
              value: viewTarget.content ? (
                <div
                  className="prose prose-sm max-w-none dark:prose-invert line-clamp-[8]"
                  dangerouslySetInnerHTML={{ __html: viewTarget.content }}
                />
              ) : undefined,
            },
          ]}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Blog"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={() => {
          if (!deleteTarget) return;

          deleteBlog.mutate(deleteTarget.id);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
