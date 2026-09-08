import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataTable from "../../../components/admin/DataTable";
import type { Column } from "../../../components/admin/DataTable";
import ConfirmDialog from "../../../components/admin/ConfirmDialog";
import ViewDetailsModal from "../../../components/admin/ViewDetailsModal";
import { useAdminCareersQuery, useDeleteCareer } from "../../../services/queries";
import type { Career } from "../../../types";

export default function CareerListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Career | null>(null);
  const [viewTarget, setViewTarget] = useState<Career | null>(null);

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

  const { data: response, isLoading, isFetching } = useAdminCareersQuery({ page, limit, search });
  const careers = response?.data ?? [];
  const total = response?.total ?? 0;

  const deleteCareer = useDeleteCareer();

  const columns: Column<Career>[] = [
    {
      key: "title",
      label: "Title",
      render: (c) => (
        <div>
          <div className="font-medium text-foreground">{c.title}</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {[c.location, c.type].filter(Boolean).join(" • ")}
          </div>
        </div>
      ),
    },
    { key: "department", label: "Department", hideOnMobile: true },
    {
      key: "status",
      label: "Status",
      render: (c) => {
        const status = c.status || "open";
        return (
          <span
            className={`capitalize px-2 py-0.5 rounded-full text-xs font-medium ${
              status === "open"
                ? "bg-green-500/10 text-green-500"
                : status === "closed"
                  ? "bg-red-500/10 text-red-500"
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
      <p className="text-muted-foreground">Manage job postings</p>

      <DataTable
        tableId="admin-careers"
        columns={columns}
        data={careers}
        searchPlaceholder="Search careers..."
        searchKeys={["title", "location", "department"]}
        addHref="/admin/careers/new"
        addLabel="New Career"
        onView={setViewTarget}
        onEdit={(c) => navigate(`/admin/careers/${c.id}/edit`)}
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
          title="Career Details"
          onClose={() => setViewTarget(null)}
          onEdit={() => {
            navigate(`/admin/careers/${viewTarget.id}/edit`);
            setViewTarget(null);
          }}
          fields={[
            { label: "Title", value: viewTarget.title },
            { label: "Department", value: viewTarget.department },
            { label: "Category", value: viewTarget.category },
            { label: "Location", value: viewTarget.location },
            { label: "Type", value: viewTarget.type },
            {
              label: "Status",
              value: viewTarget.status ? (
                <span
                  className={`capitalize px-2 py-0.5 rounded-full text-xs font-medium ${
                    viewTarget.status === "open"
                      ? "bg-green-500/10 text-green-500"
                      : viewTarget.status === "closed"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {viewTarget.status}
                </span>
              ) : undefined,
            },
            {
              label: "Salary Range",
              value: viewTarget.salaryRange
                ? `${viewTarget.salaryCurrency ? viewTarget.salaryCurrency + " " : ""}${viewTarget.salaryRange}`
                : undefined,
            },
            { label: "Deadline", value: viewTarget.deadline },
            { label: "Description", value: <p className="whitespace-pre-wrap">{viewTarget.description}</p> },
            {
              label: "Responsibilities",
              value: viewTarget.responsibilities ? (
                <p className="whitespace-pre-wrap">{viewTarget.responsibilities}</p>
              ) : undefined,
            },
            {
              label: "Requirements",
              value: viewTarget.requirements?.length ? (
                <ul className="list-disc list-inside space-y-0.5">
                  {viewTarget.requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              ) : undefined,
            },
            {
              label: "Application Form Fields",
              value: viewTarget.applicationFormSchema?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {viewTarget.applicationFormSchema
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((f) => (
                      <span key={f.id} className="px-2 py-0.5 rounded-full bg-muted text-xs">
                        {f.label}
                        {f.required ? " *" : ""}
                      </span>
                    ))}
                </div>
              ) : undefined,
            },
          ]}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Career"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={() => {
          if (deleteTarget) {
            deleteCareer.mutate(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
