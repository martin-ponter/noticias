const STATUS_STYLES = {
  PENDIENTE: "bg-slate-100 text-slate-700 border-slate-200",
  GENERANDO: "bg-amber-100 text-amber-800 border-amber-200",
  GENERADA: "bg-blue-100 text-blue-800 border-blue-200",
  REVISAR: "bg-orange-100 text-orange-800 border-orange-200",
  APROBADA: "bg-emerald-100 text-emerald-800 border-emerald-200",
  RECHAZADA: "bg-rose-100 text-rose-800 border-rose-200",
  ERROR_IA: "bg-red-100 text-red-800 border-red-200",
};

export default function StatusBadge({ status }) {
  const safeStatus = status || "PENDIENTE";
  const className =
    STATUS_STYLES[safeStatus] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {safeStatus}
    </span>
  );
}