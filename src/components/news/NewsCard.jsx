import StatusBadge from "./StatusBadge";

export default function NewsCard({ item, isSelected, onSelect }) {
  const status = item.syncStatus || item.status || "";
  const relevantDate = item.publishedAt || item.scrapedAt || item.importedAt || "Sin fecha";

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
          {item.titleOriginal || "Sin título"}
        </h3>
        <StatusBadge status={status} />
      </div>

      <div className="space-y-2 text-xs text-slate-500">
        <p className="line-clamp-1">{item.sourceSite || "Fuente desconocida"}</p>
        <p className="line-clamp-1">{relevantDate}</p>
        <p className="line-clamp-2 text-slate-600">
          {item.summary || "Sin resumen"}
        </p>
      </div>
    </button>
  );
}
