import { useState } from "react";
import DataTable from "../../../components/admin/DataTable";
import type { Column } from "../../../components/admin/DataTable";
import ConfirmDialog from "../../../components/admin/ConfirmDialog";
import {
  useJobApplicationsQuery,
  useDeleteJobApplication,
  useUpdateJobApplicationStatus,
} from "../../../services/queries";
interface Application {
  id: string;
  careerId: string;
  careerTitle?: string | null;
  fullName: string;
  email: string;
  phone?: string;
  coverLetter?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  status: string;
  extraData?: Record<string, unknown>;
  createdAt: string;
}

export default function ApplicationsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const { data: response, isLoading, isFetching } = useJobApplicationsQuery({ page, limit, search });
  const applications = (response?.data ?? []) as unknown as Application[];
  const total = response?.total ?? 0;
  const deleteApplication = useDeleteJobApplication();
  const updateStatus = useUpdateJobApplicationStatus();
  const [viewTarget, setViewTarget] = useState<Application | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null);

  const columns: Column<Application>[] = [
    {
      key: "fullName",
      label: "Name",
      render: (a) => <span className="font-medium">{a.fullName || "N/A"}</span>,
    },
    {
      key: "email",
      label: "Email",
      render: (a) => <span>{a.email}</span>,
    },
    {
      key: "careerTitle",
      label: "Position",
      render: (a) => <span>{a.careerTitle || "—"}</span>,
      hideOnMobile: true,
    },
    {
      key: "status",
      label: "Status",
      render: (a) => (
        <span
          className={`capitalize px-2 py-0.5 rounded-full text-xs font-medium ${
            a.status === "hired"
              ? "bg-green-500/10 text-green-500"
              : a.status === "shortlisted"
                ? "bg-blue-500/10 text-blue-500"
                : a.status === "rejected"
                  ? "bg-red-500/10 text-red-500"
                  : a.status === "reviewing"
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "bg-muted text-muted-foreground"
          }`}
        >
          {a.status}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      key: "createdAt",
      label: "Submitted",
      render: (a) => new Date(a.createdAt).toLocaleDateString(),
      hideOnMobile: true,
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Review submitted applications
      </p>

      <DataTable
        columns={columns}
        data={applications}
        searchPlaceholder="Search applications..."
        searchKeys={["fullName", "email", "status"]}
        onView={setViewTarget}
        onDelete={setDeleteTarget}
        isLoading={isLoading}
        isFetching={isFetching}
        tableId="admin-applications"
        totalCount={total}
        currentPage={page}
        onPageChange={setPage}
        onPageSizeChange={(newLimit) => { setLimit(newLimit); setPage(1); }}
        pageSize={limit}
        onSearch={(val) => {
          setSearch(val);
          setPage(1);
        }}
      />

      {viewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setViewTarget(null)}
          />
          <div className="relative bg-card border border-border rounded-2xl p-4 sm:p-6 max-w-lg w-full mx-4 shadow-xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Application Details
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { label: "Full Name", value: viewTarget.fullName },
                { label: "Email", value: viewTarget.email },
                { label: "Phone", value: viewTarget.phone },
                { label: "Status", value: viewTarget.status },
                {
                  label: "Position",
                  value: viewTarget.careerTitle || viewTarget.careerId,
                },
                { label: "Cover Letter", value: viewTarget.coverLetter },
                { label: "LinkedIn", value: viewTarget.linkedinUrl },
                { label: "Portfolio", value: viewTarget.portfolioUrl },
                {
                  label: "Submitted",
                  value: new Date(viewTarget.createdAt).toLocaleString(),
                },
              ]
                .filter((f) => f.value)
                .map(({ label, value }) => (
                  <div key={label}>
                    <span className="text-muted-foreground">{label}:</span>
                    <span className="text-foreground ml-2">{value}</span>
                  </div>
                ))}

              <div className="pt-2">
                <span className="text-muted-foreground">Update Status:</span>
                <select
                  value={viewTarget.status}
                  onChange={(e) =>
                    updateStatus.mutate(
                      { id: viewTarget.id, status: e.target.value },
                      { onSuccess: () => setViewTarget(null) },
                    )
                  }
                  className="ml-2 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>
              </div>

              {viewTarget.resumeUrl && (
                <div className="pt-2">
                  <a
                    href={viewTarget.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all"
                  >
                    View Resume
                  </a>
                </div>
              )}

              {(() => {
                const customFields =
                  (viewTarget.extraData?.customFields as
                    | Record<string, unknown>
                    | undefined) || {};
                const entries = Object.entries(customFields);
                if (entries.length === 0) return null;
                return (
                  <div className="pt-3 border-t border-border">
                    <span className="text-muted-foreground block mb-2">
                      Additional Information:
                    </span>
                    <div className="space-y-2">
                      {entries.map(([key, value]) => {
                        const isFileAnswer =
                          value && typeof value === "object" && "url" in (value as Record<string, unknown>);
                        return (
                          <div key={key} className="flex flex-col">
                            <span className="text-xs text-muted-foreground capitalize">
                              {key.replace(/[_-]/g, " ")}
                            </span>
                            {isFileAnswer ? (
                              <a
                                href={(value as { url: string }).url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary text-sm hover:underline"
                              >
                                {(value as { filename?: string }).filename || "View file"}
                              </a>
                            ) : (
                              <span className="text-foreground text-sm">
                                {typeof value === "boolean"
                                  ? value
                                    ? "Yes"
                                    : "No"
                                  : String(value)}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => {
                  updateStatus.mutate(
                    { id: viewTarget.id, status: "shortlisted" },
                    { onSuccess: () => setViewTarget(null) },
                  );
                }}
                className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:opacity-90 transition-all"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  updateStatus.mutate(
                    { id: viewTarget.id, status: "rejected" },
                    { onSuccess: () => setViewTarget(null) },
                  );
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:opacity-90 transition-all"
              >
                Reject
              </button>
              <button
                onClick={() => setViewTarget(null)}
                className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Application"
        message="Are you sure you want to delete this application?"
        onConfirm={() => {
          if (deleteTarget) {
            deleteApplication.mutate(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
