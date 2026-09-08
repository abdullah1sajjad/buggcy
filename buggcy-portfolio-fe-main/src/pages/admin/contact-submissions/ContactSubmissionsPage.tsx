import { useState } from "react";
import DataTable from "../../../components/admin/DataTable";
import type { Column } from "../../../components/admin/DataTable";
import ConfirmDialog from "../../../components/admin/ConfirmDialog";
import { useContactSubmissionsQuery, useDeleteContactSubmission } from "../../../services/queries";
import type { ContactSubmission } from "../../../types";

export default function ContactSubmissionsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const { data: response, isLoading, isFetching } = useContactSubmissionsQuery({ page, limit, search });
  const submissions = response?.data ?? [];
  const total = response?.total ?? 0;
  const deleteSubmission = useDeleteContactSubmission();
  const [viewTarget, setViewTarget] = useState<ContactSubmission | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactSubmission | null>(null);

  const columns: Column<ContactSubmission>[] = [
    { key: "name", label: "Name", render: (s) => <span className="font-medium">{s.name}</span> },
    { key: "email", label: "Email" },
    { key: "service", label: "Service", hideOnMobile: true },
    { key: "message", label: "Message", render: (s) => (
      <span className="truncate max-w-[200px] block">{s.message}</span>
    )},
    { key: "createdAt", label: "Received", hideOnMobile: true, render: (s) => (
      <span className="text-muted-foreground text-xs">
        {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "—"}
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Messages from the contact form</p>

      <DataTable
        columns={columns}
        data={submissions}
        searchPlaceholder="Search submissions..."
        searchKeys={["name", "email", "service"]}
        onView={setViewTarget}
        onDelete={setDeleteTarget}
        isLoading={isLoading}
        isFetching={isFetching}
        tableId="admin-contact-submissions"
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

      {/* View Modal */}
      {viewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setViewTarget(null)} />
          <div className="relative bg-card border border-border rounded-2xl p-4 sm:p-6 max-w-lg w-full mx-4 shadow-xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">Submission Details</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-muted-foreground">Name:</span> <span className="text-foreground ml-2">{viewTarget.name}</span></div>
              <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground ml-2">{viewTarget.email}</span></div>
              {viewTarget.company && <div><span className="text-muted-foreground">Company:</span> <span className="text-foreground ml-2">{viewTarget.company}</span></div>}
              {viewTarget.phone && <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground ml-2">{viewTarget.phone}</span></div>}
              {viewTarget.service && <div><span className="text-muted-foreground">Service:</span> <span className="text-foreground ml-2">{viewTarget.service}</span></div>}
              {viewTarget.createdAt && (
                <div><span className="text-muted-foreground">Received:</span> <span className="text-foreground ml-2">{new Date(viewTarget.createdAt).toLocaleString()}</span></div>
              )}
              <div><span className="text-muted-foreground">Message:</span></div>
              <p className="text-foreground bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">{viewTarget.message}</p>
            </div>
            <button
              onClick={() => setViewTarget(null)}
              className="mt-6 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Submission"
        message="Are you sure you want to delete this submission?"
        onConfirm={() => {
          if (deleteTarget) {
            deleteSubmission.mutate(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
