const STATUS_META = {
  pendiente: {
    label: "Pendiente",
    className: "bg-slate-100 text-slate-700 border-slate-200",
  },
  generando: {
    label: "Generando",
    className: "bg-amber-100 text-amber-800 border-amber-200",
  },
  generada: {
    label: "Generada",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  revisar: {
    label: "Revisar",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  aprobada: {
    label: "Aprobada",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  rechazada: {
    label: "Rechazada",
    className: "bg-rose-100 text-rose-800 border-rose-200",
  },
  "error ia": {
    label: "Error IA",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  subida: {
    label: "Subida",
    className: "bg-cyan-100 text-cyan-800 border-cyan-200",
  },

  // Estado técnico legado / importado desde scraping o sync
  ok: {
    label: "Pendiente",
    className: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

function normalizeStatus(status) {
  return String(status || "").trim().toLowerCase();
}

export function getDisplayStatus(status) {
  const normalized = normalizeStatus(status);
  return STATUS_META[normalized] || STATUS_META.pendiente;
}

export default function StatusBadge({ status }) {
  const meta = getDisplayStatus(status);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}