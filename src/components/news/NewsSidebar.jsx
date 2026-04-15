import { useMemo } from "react";
import NewsCard from "./NewsCard";

function normalizeStatusLabel(status) {
  const normalized = String(status || "").trim().toLowerCase();

  if (normalized === "ok") {
    return "Pendiente";
  }

  if (!normalized) {
    return "Sin estado";
  }

  return String(status).trim();
}

function buildStatusOptions(items = []) {
  const values = new Set();

  for (const item of items) {
    const status = String(item?.syncStatus || item?.status || "").trim();

    if (status) {
      values.add(status);
    }
  }

  return Array.from(values).sort((a, b) =>
    normalizeStatusLabel(a).localeCompare(normalizeStatusLabel(b), "es")
  );
}

function buildSourceOptions(items = []) {
  const values = new Set();

  for (const item of items) {
    const source = String(item?.sourceSite || "").trim();

    if (source) {
      values.add(source);
    }
  }

  return Array.from(values).sort((a, b) => a.localeCompare(b, "es"));
}

export default function NewsSidebar({
  items,
  selectedItem,
  onSelect,
  loading,
  error,
  searchTerm,
  onSearchTermChange,
  selectedStatus,
  onSelectedStatusChange,
  selectedSource,
  onSelectedSourceChange,
}) {
  const statusOptions = useMemo(() => buildStatusOptions(items), [items]);
  const sourceOptions = useMemo(() => buildSourceOptions(items), [items]);

  return (
    <aside className="min-h-0 border-r border-slate-200 bg-slate-50 xl:h-[calc(100vh-73px)]">
      <div className="flex h-full min-h-0 flex-col">
        <div className="border-b border-slate-200 bg-slate-50/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-slate-50/80">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="news-search"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Buscar
              </label>
              <input
                id="news-search"
                type="text"
                value={searchTerm}
                onChange={(event) => onSearchTermChange(event.target.value)}
                placeholder="Título, resumen, URL..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <div>
                <label
                  htmlFor="news-status-filter"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Estado
                </label>
                <select
                  id="news-status-filter"
                  value={selectedStatus}
                  onChange={(event) => onSelectedStatusChange(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Todos</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {normalizeStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="news-source-filter"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Fuente
                </label>
                <select
                  id="news-source-filter"
                  value={selectedSource}
                  onChange={(event) => onSelectedSourceChange(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Todas</option>
                  {sourceOptions.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                {loading ? "Cargando..." : `${items.length} noticia${items.length === 1 ? "" : "s"}`}
              </span>

              {searchTerm || selectedStatus || selectedSource ? (
                <button
                  type="button"
                  onClick={() => {
                    onSearchTermChange("");
                    onSelectedStatusChange("");
                    onSelectedSourceChange("");
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                >
                  Limpiar
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
              Cargando noticias...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-white p-4 text-sm text-red-700">
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
              No hay noticias que coincidan con los filtros.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItem?.id === item.id}
                  onSelect={onSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}