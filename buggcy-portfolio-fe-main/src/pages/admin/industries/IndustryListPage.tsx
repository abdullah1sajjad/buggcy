import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataTable from "../../../components/admin/DataTable";
import type { Column } from "../../../components/admin/DataTable";
import ConfirmDialog from "../../../components/admin/ConfirmDialog";
import ViewDetailsModal from "../../../components/admin/ViewDetailsModal";
import { useAdminIndustriesQuery, useDeleteIndustry } from "../../../services/queries";
import type { Industry } from "../../../types";

export default function IndustryListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Industry | null>(null);
  const [viewTarget, setViewTarget] = useState<Industry | null>(null);

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

  const { data: response, isLoading, isFetching } = useAdminIndustriesQuery({ page, limit, search });
  const industries = response?.data ?? [];
  const total = response?.total ?? 0;

  const deleteIndustry = useDeleteIndustry();

  const columns: Column<Industry>[] = [
    { key: "title", label: "Title", render: (i) => <span className="font-medium">{i.title}</span> },
    { key: "slug", label: "Slug" },
    { key: "features", label: "Features", render: (i) => `${i.features?.length || 0} items`, hideOnMobile: true },
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Manage industry pages</p>

      <DataTable
        tableId="admin-industries"
        columns={columns}
        data={industries}
        searchPlaceholder="Search industries..."
        searchKeys={["title", "slug"]}
        addHref="/admin/industries/new"
        addLabel="New Industry"
        onView={setViewTarget}
        onEdit={(i) => navigate(`/admin/industries/${i.id}/edit`)}
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
          title="Industry Details"
          imageUrl={viewTarget.imageUrl}
          imageAlt={viewTarget.title}
          onClose={() => setViewTarget(null)}
          onEdit={() => {
            navigate(`/admin/industries/${viewTarget.id}/edit`);
            setViewTarget(null);
          }}
          fields={[
            { label: "Title", value: viewTarget.title },
            { label: "Slug", value: viewTarget.slug },
            { label: "Icon", value: viewTarget.icon },
            { label: "Hero Subtitle", value: viewTarget.heroSubtitle },
            { label: "Hero CTA", value: viewTarget.heroCta },
            { label: "Description", value: <p className="whitespace-pre-wrap">{viewTarget.description}</p> },
            {
              label: "Features",
              value: viewTarget.features?.length ? (
                <ul className="list-disc list-inside space-y-0.5">
                  {viewTarget.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              ) : undefined,
            },
            {
              label: "Challenges",
              value: viewTarget.challenges?.length ? (
                <ul className="list-disc list-inside space-y-0.5">
                  {viewTarget.challenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              ) : undefined,
            },
            {
              label: "Solutions",
              value: viewTarget.solutions?.length ? (
                <ul className="list-disc list-inside space-y-0.5">
                  {viewTarget.solutions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
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
              label: "Stats",
              value: viewTarget.stats?.length ? (
                <div className="flex flex-wrap gap-3">
                  {viewTarget.stats.map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="font-semibold">{s.value}</div>
                      <div className="text-muted-foreground text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              ) : undefined,
            },
            {
              label: "Testimonials",
              value: viewTarget.testimonials?.length ? (
                <div className="space-y-1.5">
                  {viewTarget.testimonials.map((t, i) => (
                    <div key={i} className="border border-border rounded-lg px-3 py-2">
                      <p className="text-xs italic">"{t.quote}"</p>
                      <p className="text-muted-foreground text-xs mt-1">
                        {t.name} — {t.role}, {t.company}
                      </p>
                    </div>
                  ))}
                </div>
              ) : undefined,
            },
          ]}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Industry"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={() => {
          if (deleteTarget) {
            deleteIndustry.mutate(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
