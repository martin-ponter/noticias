import { useEffect, useState } from "react";
import {
  DEFAULT_LINKEDIN_PROMPT,
  DEFAULT_WEB_PROMPT,
} from "../../lib/news/aiPromptTemplates.js";

export default function RegenerateNewsModal({
  open,
  loading = false,
  onClose,
  onSubmit,
}) {
  const [selectedWeb, setSelectedWeb] = useState(true);
  const [selectedLinkedin, setSelectedLinkedin] = useState(false);
  const [webPrompt, setWebPrompt] = useState(DEFAULT_WEB_PROMPT);
  const [linkedinPrompt, setLinkedinPrompt] = useState(DEFAULT_LINKEDIN_PROMPT);

  useEffect(() => {
    if (!open) return;

    setSelectedWeb(true);
    setSelectedLinkedin(false);
    setWebPrompt(DEFAULT_WEB_PROMPT);
    setLinkedinPrompt(DEFAULT_LINKEDIN_PROMPT);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === "Escape" && !loading) {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, loading, onClose]);

  if (!open) return null;

  const canSubmit = !loading && (selectedWeb || selectedLinkedin);

  function handleSubmit() {
    if (!canSubmit) return;

    const channels = [];
    const prompts = {};

    if (selectedWeb) {
      channels.push("web");
      prompts.web = webPrompt;
    }

    if (selectedLinkedin) {
      channels.push("linkedin");
      prompts.linkedin = linkedinPrompt;
    }

    onSubmit?.({ channels, prompts });
  }

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget || loading) return;
    onClose?.();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/45 px-4 pb-6 pt-20 sm:px-6"
      onClick={handleBackdropClick}
    >
      <div className="flex max-h-[calc(100vh-6rem)] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Regenerar contenido IA
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Selecciona uno o ambos canales y ajusta el prompt antes de lanzar la regeneración.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              aria-label="Cerrar modal"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedWeb}
                  onChange={(event) => setSelectedWeb(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span className="text-sm font-semibold text-slate-800">Web</span>
              </label>

              {selectedWeb ? (
                <div className="mt-4">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Prompt web
                  </label>
                  <textarea
                    value={webPrompt}
                    onChange={(event) => setWebPrompt(event.target.value)}
                    rows={12}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              ) : null}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedLinkedin}
                  onChange={(event) => setSelectedLinkedin(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span className="text-sm font-semibold text-slate-800">LinkedIn</span>
              </label>

              {selectedLinkedin ? (
                <div className="mt-4">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Prompt LinkedIn
                  </label>
                  <textarea
                    value={linkedinPrompt}
                    onChange={(event) => setLinkedinPrompt(event.target.value)}
                    rows={12}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              ) : null}
            </section>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-white px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              {selectedWeb || selectedLinkedin
                ? "Se regenerarán los canales seleccionados con los prompts actuales."
                : "Selecciona al menos un canal para continuar."}
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Regenerando..." : "Regenerar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}