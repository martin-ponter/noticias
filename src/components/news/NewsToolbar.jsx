export default function NewsToolbar({
  selectedItem,
  onGenerate,
  onApprove,
  onReject,
  onRegenerate,
}) {
  const disabled = !selectedItem;

  return (
    <div className="flex flex-wrap gap-3 border-b border-slate-200 bg-white px-6 py-4">
      <button
        type="button"
        onClick={onGenerate}
        disabled={disabled}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Generar noticia
      </button>

      <button
        type="button"
        onClick={onRegenerate}
        disabled={disabled}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Regenerar
      </button>

      <button
        type="button"
        onClick={onApprove}
        disabled={disabled}
        className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Aprobar
      </button>

      <button
        type="button"
        onClick={onReject}
        disabled={disabled}
        className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Rechazar
      </button>
    </div>
  );
}