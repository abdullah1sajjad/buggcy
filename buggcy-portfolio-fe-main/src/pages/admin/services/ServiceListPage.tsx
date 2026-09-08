import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataTable from "../../../components/admin/DataTable";
import type { Column } from "../../../components/admin/DataTable";
import ConfirmDialog from "../../../components/admin/ConfirmDialog";
import ViewDetailsModal from "../../../components/admin/ViewDetailsModal";
import { useAdminServicesQuery, useDeleteService } from "../../../services/queries";
import type { Service } from "../../../types";

export default function ServiceListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [viewTarget, setViewTarget] = useState<Service | null>(null);

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

  const { data: response, isLoading, isFetching } = useAdminServicesQuery({ page, limit, search });
  const services = response?.data ?? [];
  const total = response?.total ?? 0;

  const deleteService = useDeleteService();

  const columns: Column<Service>[] = [
    { key: "title", label: "Title", render: (s) => <span className="font-medium">{s.title}</span> },
    { key: "slug", label: "Slug" },
    { key: "features", label: "Features", render: (s) => `${s.features?.length || 0} items`, hideOnMobile: true },
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Manage your services</p>

      <DataTable
        tableId="admin-services"
        columns={columns}
        data={services}
        searchPlaceholder="Search services..."
        searchKeys={["title", "slug"]}
        addHref="/admin/services/new"
        addLabel="New Service"
        onView={setViewTarget}
        onEdit={(s) => navigate(`/admin/services/${s.id}/edit`)}
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
          title="Service Details"
          imageUrl={viewTarget.imageUrl}
          imageAlt={viewTarget.title}
          onClose={() => setViewTarget(null)}
          onEdit={() => {
            navigate(`/admin/services/${viewTarget.id}/edit`);
            setViewTarget(null);
          }}
          fields={[
            { label: "Title", value: viewTarget.title },
            { label: "Slug", value: viewTarget.slug },
            { label: "Icon", value: viewTarget.icon },
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
              label: "Use Cases",
              value: viewTarget.useCases?.length ? (
                <ul className="list-disc list-inside space-y-0.5">
                  {viewTarget.useCases.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              ) : undefined,
            },
            {
              label: "Process",
              value: viewTarget.process?.length ? (
                <div className="space-y-1.5">
                  {viewTarget.process.map((p, i) => (
                    <div key={i} className="border border-border rounded-lg px-3 py-2">
                      <span className="font-medium">
                        {p.step}. {p.title}
                      </span>
                      <p className="text-muted-foreground text-xs mt-0.5">{p.description}</p>
                    </div>
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
              label: "Why Choose Us",
              value: viewTarget.whyChooseUs?.length ? (
                <div className="space-y-1.5">
                  {viewTarget.whyChooseUs.map((w, i) => (
                    <div key={i}>
                      <span className="font-medium">{w.title}</span>
                      <p className="text-muted-foreground text-xs">{w.description}</p>
                    </div>
                  ))}
                </div>
              ) : undefined,
            },
            {
              label: "FAQs",
              value: viewTarget.faqs?.length ? (
                <div className="space-y-1.5">
                  {viewTarget.faqs.map((f, i) => (
                    <div key={i}>
                      <span className="font-medium">{f.question}</span>
                      <p className="text-muted-foreground text-xs">{f.answer}</p>
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
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={() => {
          if (deleteTarget) {
            deleteService.mutate(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
