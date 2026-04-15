const STATUS_STYLES = {
  pendiente: "bg-slate-100 text-slate-700 border-slate-200",
  generando: "bg-amber-100 text-amber-800 border-amber-200",
  generada: "bg-blue-100 text-blue-800 border-blue-200",
  revisar: "bg-orange-100 text-orange-800 border-orange-200",
  editada: "bg-violet-100 text-violet-800 border-violet-200",
  aprobada: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rechazada: "bg-rose-100 text-rose-800 border-rose-200",
  "error ia": "bg-red-100 text-red-800 border-red-200",
  subida: "bg-cyan-100 text-cyan-800 border-cyan-200",
  ok: "bg-slate-100 text-slate-700 border-slate-200",
};

export function getDisplayStatus(status) {
  const raw = String(status || "").trim();
  const normalized = raw.toLowerCase();

  if (!raw || normalized === "ok") {
    return { value: "Pendiente", label: "Pendiente" };
  }

  return { value: raw, label: raw };
}

export default function StatusBadge({ status }) {
  const display = getDisplayStatus(status);
  const normalizedStatus = String(display.value).trim().toLowerCase();
  const className =
    STATUS_STYLES[normalizedStatus] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {display.label}
    </span>
  );
}