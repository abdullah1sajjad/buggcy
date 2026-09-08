import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataTable from "../../../components/admin/DataTable";
import type { Column } from "../../../components/admin/DataTable";
import ConfirmDialog from "../../../components/admin/ConfirmDialog";
import ViewDetailsModal from "../../../components/admin/ViewDetailsModal";
import { useAdminSuccessStoriesQuery, useDeleteSuccessStory } from "../../../services/queries";
import type { SuccessStory } from "../../../types";

export default function SuccessStoryListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<SuccessStory | null>(null);
  const [viewTarget, setViewTarget] = useState<SuccessStory | null>(null);

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

  const { data: response, isLoading, isFetching } = useAdminSuccessStoriesQuery({ page, limit, search });
  const stories = response?.data ?? [];
  const total = response?.total ?? 0;

  const deleteStory = useDeleteSuccessStory();

  const columns: Column<SuccessStory>[] = [
    { key: "title", label: "Title", render: (s) => <span className="font-medium">{s.title}</span> },
    { key: "client", label: "Client" },
    { key: "category", label: "Category", render: (s) => (
      <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">{s.category}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Manage success stories</p>

      <DataTable
        tableId="admin-success-stories"
        columns={columns}
        data={stories}
        searchPlaceholder="Search stories..."
        searchKeys={["title", "client", "category"]}
        addHref="/admin/success-stories/new"
        addLabel="New Story"
        onView={setViewTarget}
        onEdit={(s) => navigate(`/admin/success-stories/${s.id}/edit`)}
        onDelete={setDeleteTarget}
        isLoading={isLoading}
        isFetching={isFetching}
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
      />

      {viewTarget && (
        <ViewDetailsModal
          title="Success Story Details"
          imageUrl={viewTarget.imageUrl}
          imageAlt={viewTarget.title}
          onClose={() => setViewTarget(null)}
          onEdit={() => {
            navigate(`/admin/success-stories/${viewTarget.id}/edit`);
            setViewTarget(null);
          }}
          fields={[
            { label: "Title", value: viewTarget.title },
            { label: "Slug", value: viewTarget.slug },
            { label: "Client", value: viewTarget.client },
            { label: "Category", value: viewTarget.category },
            { label: "Description", value: <p className="whitespace-pre-wrap">{viewTarget.description}</p> },
            { label: "Problem", value: <p className="whitespace-pre-wrap">{viewTarget.problem}</p> },
            { label: "Solution", value: <p className="whitespace-pre-wrap">{viewTarget.solution}</p> },
            {
              label: "Results",
              value: viewTarget.results?.length ? (
                <div className="flex flex-wrap gap-3">
                  {viewTarget.results.map((r, i) => (
                    <div key={i} className="text-center">
                      <div className="font-semibold">{r.value}</div>
                      <div className="text-muted-foreground text-xs">{r.label}</div>
                    </div>
                  ))}
                </div>
              ) : undefined,
            },
            {
              label: "Technologies",
              value: viewTarget.technologies?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {viewTarget.technologies.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-muted text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              ) : undefined,
            },
            {
              label: "Live URL",
              value: viewTarget.liveUrl ? (
                <a
                  href={viewTarget.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {viewTarget.liveUrl}
                </a>
              ) : undefined,
            },
          ]}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Success Story"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={() => {
          if (deleteTarget) {
            deleteStory.mutate(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
