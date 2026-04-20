const VIEW_OPTIONS = [
  { id: "original", label: "Noticia original" },
  { id: "web", label: "Noticia IA web" },
  { id: "linkedin", label: "Noticia IA LinkedIn" },
];

export default function NewsToolbar({
  selectedItem,
  selectedView = "original",
  onSelectedViewChange,
  onGenerateWeb,
  onGenerateLinkedin,
  onApprove,
  onReject,
  onRegenerate,
  generatingWeb = false,
  generatingLinkedin = false,
  regenerating = false,
  publishing = false,
  disabled = false,
}) {
  const itemStatus = String(selectedItem?.syncStatus || selectedItem?.status || "").trim();
  const alreadyUploaded = itemStatus === "Subida";
  const controlsDisabled = !selectedItem || disabled;
  const approveDisabled = controlsDisabled || alreadyUploaded;

  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onGenerateWeb}
          disabled={controlsDisabled || generatingWeb || regenerating}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {generatingWeb ? "Generando web..." : "Generar noticia web"}
        </button>

        <button
          type="button"
          onClick={onGenerateLinkedin}
          disabled={controlsDisabled || generatingLinkedin || regenerating}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {generatingLinkedin ? "Generando LinkedIn..." : "Generar noticia LinkedIn"}
        </button>

        <button
          type="button"
          onClick={onRegenerate}
          disabled={controlsDisabled || generatingWeb || generatingLinkedin || regenerating}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {regenerating ? "Regenerando..." : "Regenerar"}
        </button>

        <button
          type="button"
          onClick={onApprove}
          disabled={approveDisabled}
          title={
            alreadyUploaded ? "Esta noticia ya ha sido subida a WordPress" : undefined
          }
          className={`rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
            alreadyUploaded
              ? "border border-slate-300 bg-slate-100 text-slate-500"
              : "border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          }`}
        >
          {alreadyUploaded ? "Ya subida" : publishing ? "Subiendo..." : "Aprobar"}
        </button>

        <button
          type="button"
          onClick={onReject}
          disabled={controlsDisabled}
          className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Rechazar
        </button>
      </div>

      <div className="inline-flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1">
        {VIEW_OPTIONS.map((view) => {
          const isActive = view.id === selectedView;

          return (
            <button
              key={view.id}
              type="button"
              onClick={() => onSelectedViewChange?.(view.id)}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:bg-white/70 hover:text-slate-800"
              }`}
            >
              {view.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
