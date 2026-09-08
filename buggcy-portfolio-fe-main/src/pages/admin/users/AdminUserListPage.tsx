import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Shield, Circle } from "lucide-react";
import { useState } from "react";
import { useAdminStore, ROLE_LABELS } from "../../../store/adminStore";
import {
  deleteUser,
  toggleUserActive,
  type BackendUser,
} from "../../../services/usersApi";
import { useAdminUsersQuery } from "../../../services/queries";
import ConfirmDialog from "../../../components/admin/ConfirmDialog";
import DataTable, { type Column } from "../../../components/admin/DataTable";

export default function AdminUserListPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const [search, setSearch] = useState("");

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

  const {
    data: response,
    isLoading,
    isFetching,
  } = useAdminUsersQuery({ page, limit, search });
  const users = response?.data ?? [];
  const total = response?.total ?? 0;

  const currentUser = useAdminStore((s) => s.user);

  const removeUser = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
  const toggleActive = useMutation({
    mutationFn: toggleUserActive,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });

  const [deleteTarget, setDeleteTarget] = useState<BackendUser | null>(null);
  const [statusTarget, setStatusTarget] = useState<BackendUser | null>(null);

  const roleBadge = (role: string) =>
    role === "admin"
      ? "bg-foreground/10 text-foreground"
      : "bg-muted text-muted-foreground";

  const columns: Column<BackendUser>[] = [
    {
      key: "user",
      label: "User",
      render: (u) => (
        <div>
          <div className="font-medium text-foreground flex items-center gap-2">
            {u.name}
            {u.id === currentUser?.id && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                You
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">{u.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (u) => (
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roleBadge(u.role)}`}
        >
          <Shield size={12} />
          {ROLE_LABELS[u.role]}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (u) => (
        <button
          onClick={() => setStatusTarget(u)}
          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
            u.isActive ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <Circle
            size={8}
            className={u.isActive ? "fill-foreground" : "fill-muted-foreground"}
          />
          {u.isActive ? "Active" : "Inactive"}
        </button>
      ),
      hideOnMobile: true,
    },
    {
      key: "createdAt",
      label: "Created",
      render: (u) => (
        <span className="text-xs text-muted-foreground">
          {new Date(u.createdAt).toLocaleDateString()}
        </span>
      ),
      hideOnMobile: true,
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Manage admin, HR, and BD access</p>

      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        isFetching={isFetching}
        searchPlaceholder="Search users..."
        searchKeys={["name", "email", "role"]}
        addHref="/admin/users/new"
        addLabel="Add User"
        tableId="admin-users"
        onEdit={(u) => navigate(`/admin/users/${u.id}/edit`)}
        onDelete={(u) => {
          if (u.id === currentUser?.id) return;
          setDeleteTarget(u);
        }}
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

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteTarget) {
            removeUser.mutate(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        open={!!statusTarget}
        title={statusTarget?.isActive ? "Deactivate User" : "Activate User"}
        message={
          statusTarget?.isActive
            ? `Are you sure you want to mark "${statusTarget?.name}" as inactive? They will lose access until reactivated.`
            : `Are you sure you want to mark "${statusTarget?.name}" as active?`
        }
        confirmLabel={statusTarget?.isActive ? "Deactivate" : "Activate"}
        onConfirm={() => {
          if (statusTarget) {
            toggleActive.mutate(statusTarget.id);
            setStatusTarget(null);
          }
        }}
        onCancel={() => setStatusTarget(null)}
      />
    </div>
  );
}
