import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useDebouncedCallback } from "@tanstack/react-pacer";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Columns3,
  RotateCcw,
  Hash,
  ChevronsUpDown,
  Settings2,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Inbox,
  Loader2,
  X,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Debounce delay for search
const DEBOUNCE_DELAY = 700;

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  hideOnMobile?: boolean;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchKeys?: (keyof T & string)[];
  addHref?: string;
  addLabel?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  viewLabel?: string;
  isLoading?: boolean;
  // True while a background refetch (e.g. debounced search) is in flight,
  // distinct from isLoading which is only the initial/no-data load.
  isFetching?: boolean;
  emptyState?: React.ReactNode;
  onRowClick?: (item: T) => void;
  pageSize?: number;
  // Enables per-table column visibility / prefs persistence in localStorage
  tableId?: string;
  // Server-side search (optional) — when provided, search is sent to the parent
  onSearch?: (search: string) => void;
  // Server-side pagination (optional)
  totalCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

type SortDir = "asc" | "desc" | null;

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchKeys = [],
  addHref,
  addLabel = "Add New",
  onEdit,
  onDelete,
  onView,
  viewLabel = "View",
  isLoading,
  isFetching,
  emptyState,
  onRowClick,
  onSearch,
  pageSize: initialPageSize = 10,
  tableId,
  totalCount,
  currentPage: controlledPage,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [columnsOpen, setColumnsOpen] = useState(false);
  const columnsRef = useRef<HTMLDivElement>(null);

  const storageKey = tableId ? `datatable-columns-${tableId}` : null;

  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(() => {
    if (!storageKey) return new Set();
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return new Set(parsed);
      }
    } catch {
      /* ignore */
    }
    return new Set();
  });

  interface TablePrefs {
    showRowNumbers: boolean;
    showActions: boolean;
    showSearch: boolean;
    showPagination: boolean;
  }

  const [tablePrefs, setTablePrefs] = useState<TablePrefs>(() => {
    const defaults: TablePrefs = {
      showRowNumbers: false,
      showActions: true,
      showSearch: true,
      showPagination: true,
    };
    if (!storageKey) return defaults;
    try {
      const stored = localStorage.getItem(`${storageKey}-prefs`);
      if (stored) return { ...defaults, ...JSON.parse(stored) };
    } catch {
      /* ignore */
    }
    return defaults;
  });

  useEffect(() => {
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify([...hiddenColumns]));
        localStorage.setItem(`${storageKey}-prefs`, JSON.stringify(tablePrefs));
      } catch {
        /* ignore */
      }
    }
  }, [hiddenColumns, tablePrefs, storageKey]);

  const toggleColumn = useCallback((key: string) => {
    setHiddenColumns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const togglePref = useCallback((key: keyof typeof tablePrefs) => {
    setTablePrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const resetColumns = useCallback(() => {
    setHiddenColumns(new Set());
    setTablePrefs({
      showRowNumbers: false,
      showActions: true,
      showSearch: true,
      showPagination: true,
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        columnsRef.current &&
        !columnsRef.current.contains(e.target as Node)
      ) {
        setColumnsOpen(false);
      }
    };
    if (columnsOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [columnsOpen]);

  // "/" focuses the search input, Escape blurs it — common list/table UX pattern.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape" && target === searchInputRef.current) {
        searchInputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const visibleColumns = useMemo(
    () => columns.filter((col) => !hiddenColumns.has(col.key)),
    [columns, hiddenColumns],
  );
  const internalPage = Number(searchParams.get("page")) || 1;
  const internalPageSize =
    Number(searchParams.get("pageSize")) || initialPageSize;

  const setInternalPage = (newPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(newPage));
      return params;
    });
  };

  const setInternalPageSize = (newSize: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("pageSize", String(newSize));
      return params;
    });
  };

  const debouncedOnSearch = useDebouncedCallback(
    (val: string) => onSearch?.(val),
    { wait: DEBOUNCE_DELAY },
  );

  const isServerSide = totalCount !== undefined && onPageChange !== undefined;
  const currentPage = isServerSide ? (controlledPage ?? 1) : internalPage;
  const pageSize = isServerSide ? initialPageSize : internalPageSize;

  const filtered = useMemo(() => {
    if (onSearch) return data;
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((item) =>
      searchKeys.some((key) => {
        const val = item[key];
        return typeof val === "string" && val.toLowerCase().includes(q);
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, search, searchKeys]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortDir === "asc" ? -1 : 1;
      if (bVal == null) return sortDir === "asc" ? 1 : -1;
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const displayTotal = isServerSide ? totalCount : sorted.length;
  const totalPages = Math.max(1, Math.ceil(displayTotal / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    if (isServerSide) return sorted;
    const start = (safeCurrentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, safeCurrentPage, pageSize, isServerSide]);

  const handlePageChange = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    if (isServerSide) {
      onPageChange(newPage);
    } else {
      setInternalPage(newPage);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    if (isServerSide) {
      onPageSizeChange?.(newSize);
    } else {
      setInternalPageSize(newSize);
      setInternalPage(1);
    }
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? null : "asc",
      );
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const startRecord =
    displayTotal === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endRecord = Math.min(safeCurrentPage * pageSize, displayTotal);

  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safeCurrentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, safeCurrentPage - 1);
        i <= Math.min(totalPages - 1, safeCurrentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (safeCurrentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, safeCurrentPage]);

  const alignClass = (align?: "left" | "center" | "right") => {
    if (align === "center") return "text-center";
    if (align === "right") return "text-right";
    return "text-left";
  };

  const hasActions = onEdit || onDelete || onView;

  const clearSearch = () => {
    setSearch("");
    if (onSearch) {
      debouncedOnSearch("");
    } else if (isServerSide) {
      onPageChange(1);
    } else {
      setInternalPage(1);
    }
    searchInputRef.current?.focus();
  };

  // Loading skeleton
  if (isLoading) {
    const skeletonCols = tableId ? visibleColumns : columns;
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="h-9 w-full sm:w-64 rounded-lg bg-muted animate-pulse" />
          {addHref && (
            <div className="h-10 w-32 rounded-lg bg-muted animate-pulse" />
          )}
        </div>
        <div className="border border-border rounded-xl overflow-hidden">
          <div className="bg-muted/50 px-4 py-3">
            <div className="flex gap-4">
              {skeletonCols.map((col) => (
                <div
                  key={col.key}
                  className="h-4 flex-1 rounded bg-muted/60 animate-pulse"
                />
              ))}
            </div>
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="px-4 py-3 border-b border-border last:border-0"
            >
              <div className="flex gap-4">
                {skeletonCols.map((col) => (
                  <div
                    key={col.key}
                    className="h-4 flex-1 rounded bg-muted/40 animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top bar: compact search + column/add controls share one row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        {tablePrefs.showSearch ? (
          <motion.div
            className="relative w-full sm:w-64 shrink-0"
            initial={false}
          >
            <div
              className={`relative flex items-center rounded-lg border bg-background transition-all duration-150 ${
                searchFocused
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-muted-foreground/40"
              }`}
            >
              <span className="pl-2.5 pr-1.5 grid place-items-center shrink-0">
                <AnimatePresence mode="wait" initial={false}>
                  {isFetching && onSearch ? (
                    <motion.span
                      key="loader"
                      initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                      className="grid place-items-center"
                    >
                      <Loader2
                        size={14}
                        className="text-primary animate-spin"
                      />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="search"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.15 }}
                      className="grid place-items-center"
                    >
                      <Search
                        size={14}
                        className={
                          searchFocused
                            ? "text-primary"
                            : "text-muted-foreground"
                        }
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>

              <input
                ref={searchInputRef}
                value={search}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearch(val);
                  if (onSearch) {
                    debouncedOnSearch(val);
                  } else if (isServerSide) {
                    onPageChange(1);
                  } else {
                    setInternalPage(1);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") searchInputRef.current?.blur();
                }}
                placeholder={searchPlaceholder}
                className="min-w-0 flex-1 py-1.5 pr-1 text-sm bg-transparent text-foreground placeholder:text-muted-foreground/70 outline-none"
              />

              <div className="pr-1.5 flex items-center gap-1 shrink-0">
                <AnimatePresence>
                  {search ? (
                    <motion.button
                      key="clear"
                      type="button"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.12 }}
                      onClick={clearSearch}
                      className="w-5 h-5 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      aria-label="Clear search"
                    >
                      <X size={12} />
                    </motion.button>
                  ) : (
                    !searchFocused && (
                      <motion.kbd
                        key="hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className="hidden sm:inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1 rounded border border-border bg-muted/60 text-[10px] font-medium text-muted-foreground"
                      >
                        /
                      </motion.kbd>
                    )
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <div />
        )}

        {/* Buttons row */}
        <div className="flex items-center justify-end gap-2">
          {tableId && (
            <div className="relative" ref={columnsRef}>
              <button
                onClick={() => setColumnsOpen((p) => !p)}
                className="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-all"
                title="Toggle columns"
              >
                <Columns3 size={15} />
                <span className="hidden sm:inline">Columns</span>
              </button>
              {columnsOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-black/40 z-40 sm:hidden"
                    onClick={() => setColumnsOpen(false)}
                  />
                  <div className="fixed bottom-0 left-0 right-0 z-50 sm:absolute sm:right-0 sm:bottom-auto sm:top-full sm:mt-1 w-full sm:w-60 max-h-[80vh] sm:max-h-[70vh] bg-card border border-border rounded-t-2xl sm:rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200 sm:animate-in sm:fade-in sm:slide-in-from-top-2 flex flex-col overflow-hidden">
                    <div className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Table Settings
                      </span>
                      <button
                        onClick={resetColumns}
                        className="text-xs text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
                        title="Reset to default"
                      >
                        <RotateCcw size={11} />
                        Reset
                      </button>
                    </div>
                    <div className="overflow-y-auto flex-1 min-h-0">
                      <div className="py-2">
                        <span className="px-4 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                          Display
                        </span>
                        <label className="flex items-center gap-2.5 px-4 py-2 cursor-pointer hover:bg-muted/50 transition-colors">
                          <input
                            type="checkbox"
                            checked={tablePrefs.showRowNumbers}
                            onChange={() => togglePref("showRowNumbers")}
                            className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-primary/50"
                          />
                          <Hash size={13} className="text-muted-foreground" />
                          <span className="text-sm text-foreground">
                            Row Numbers
                          </span>
                        </label>
                        <label className="flex items-center gap-2.5 px-4 py-2 cursor-pointer hover:bg-muted/50 transition-colors">
                          <input
                            type="checkbox"
                            checked={tablePrefs.showSearch}
                            onChange={() => togglePref("showSearch")}
                            className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-primary/50"
                          />
                          <Search size={13} className="text-muted-foreground" />
                          <span className="text-sm text-foreground">
                            Search Bar
                          </span>
                        </label>
                        <label className="flex items-center gap-2.5 px-4 py-2 cursor-pointer hover:bg-muted/50 transition-colors">
                          <input
                            type="checkbox"
                            checked={tablePrefs.showPagination}
                            onChange={() => togglePref("showPagination")}
                            className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-primary/50"
                          />
                          <ChevronsUpDown
                            size={13}
                            className="text-muted-foreground"
                          />
                          <span className="text-sm text-foreground">
                            Pagination
                          </span>
                        </label>
                        {hasActions && (
                          <label className="flex items-center gap-2.5 px-4 py-2 cursor-pointer hover:bg-muted/50 transition-colors">
                            <input
                              type="checkbox"
                              checked={tablePrefs.showActions}
                              onChange={() => togglePref("showActions")}
                              className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-primary/50"
                            />
                            <Settings2
                              size={13}
                              className="text-muted-foreground"
                            />
                            <span className="text-sm text-foreground">
                              Actions Column
                            </span>
                          </label>
                        )}
                      </div>
                      <div className="border-t border-border py-2">
                        <span className="px-4 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                          Columns
                        </span>
                        {columns.map((col) => {
                          const isVisible = !hiddenColumns.has(col.key);
                          return (
                            <label
                              key={col.key}
                              className="flex items-center gap-2.5 px-4 py-2 cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={isVisible}
                                onChange={() => toggleColumn(col.key)}
                                className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-primary/50"
                              />
                              <span className="text-sm text-foreground">
                                {col.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {addHref && (
            <Link
              to={addHref}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all"
            >
              <Plus size={16} /> {addLabel}
            </Link>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-border rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {tablePrefs.showRowNumbers && (
                <th className="px-4 py-3 font-semibold text-foreground w-[50px] text-center">
                  #
                </th>
              )}
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  className={`${alignClass(col.align)} px-4 py-3 font-semibold text-foreground ${
                    col.hideOnMobile ? "hidden md:table-cell" : ""
                  } ${col.sortable ? "cursor-pointer select-none hover:text-primary transition-colors" : ""}`}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && (
                      <span className="text-muted-foreground">
                        {sortKey === col.key ? (
                          sortDir === "asc" ? (
                            <ArrowUp size={14} />
                          ) : (
                            <ArrowDown size={14} />
                          )
                        ) : (
                          <ArrowUpDown size={14} />
                        )}
                      </span>
                    )}
                  </span>
                </th>
              ))}
              {hasActions && tablePrefs.showActions && (
                <th className="text-right px-4 py-3 font-semibold text-foreground w-[100px]">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    (tablePrefs.showRowNumbers ? 1 : 0) +
                    visibleColumns.length +
                    (hasActions && tablePrefs.showActions ? 1 : 0)
                  }
                  className="text-center py-16"
                >
                  {emptyState ?? (
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <Inbox size={40} strokeWidth={1.2} />
                      <p className="text-sm font-medium">No records found</p>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIdx) => {
                const rowNum = (safeCurrentPage - 1) * pageSize + rowIdx + 1;
                return (
                  <tr
                    key={item.id}
                    onClick={onRowClick ? () => onRowClick(item) : undefined}
                    className={`border-b border-border last:border-0 transition-colors ${
                      onRowClick
                        ? "cursor-pointer hover:bg-muted/50"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    {tablePrefs.showRowNumbers && (
                      <td className="px-4 py-3 text-muted-foreground text-center text-xs">
                        {rowNum}
                      </td>
                    )}
                    {visibleColumns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3 text-foreground ${alignClass(col.align)} ${
                          col.hideOnMobile ? "hidden md:table-cell" : ""
                        }`}
                      >
                        {col.render
                          ? col.render(item)
                          : String(
                              (item as Record<string, unknown>)[col.key] ?? "",
                            )}
                      </td>
                    ))}
                    {hasActions && tablePrefs.showActions && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {onView && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onView(item);
                              }}
                              className="p-1.5 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
                              title={viewLabel}
                            >
                              <Eye size={15} />
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(item);
                              }}
                              className="p-1.5 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
                              title="Edit"
                            >
                              <Pencil size={15} />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(item);
                              }}
                              className="p-1.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {displayTotal > 0 && tablePrefs.showPagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Showing</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="px-2 py-1 rounded-md border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>
              of {displayTotal} records ({startRecord}–{endRecord})
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage <= 1}
              className="p-1.5 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            {pageNumbers.map((page, idx) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-muted-foreground text-sm"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`min-w-[32px] h-8 rounded-lg text-sm font-medium transition-all ${
                    page === safeCurrentPage
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
            <button
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage >= totalPages}
              className="p-1.5 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
