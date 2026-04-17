import { useEffect, useMemo, useState } from "react";
import StatusBadge, { getDisplayStatus } from "./StatusBadge";

function Block({ title, children, fullWidth = false }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 ${
        fullWidth ? "xl:col-span-2" : ""
      }`}
    >
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      <div className="text-sm leading-6 text-slate-700">{children}</div>
    </section>
  );
}

function EmptyState({ title, message }) {
  return (
    <div className="flex h-full items-center justify-center bg-white">
      <div className="max-w-md rounded-2xl border border-dashed border-slate-300 p-8 text-center">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{message}</p>
      </div>
    </div>
  );
}

function pickRelevantDate(item) {
  return item.lastSyncAt || item.importedAt || item.scrapedAt || item.publishedAt || "-";
}

function normalizeValue(value) {
  return String(value || "");
}

export default function NewsDetail({
  item,
  loading,
  error,
  isEmpty,
  onSave,
  saving = false,
}) {
  const [form, setForm] = useState({
    titleOriginal: "",
    summary: "",
    contentText: "",
    editorNotes: "",
  });

  useEffect(() => {
    setForm({
      titleOriginal: normalizeValue(item?.titleOriginal),
      summary: normalizeValue(item?.summary),
      contentText: normalizeValue(item?.contentText),
      editorNotes: normalizeValue(item?.editorNotes),
    });
  }, [item?.id, item?.titleOriginal, item?.summary, item?.contentText, item?.editorNotes]);

  const hasChanges = useMemo(() => {
    if (!item) return false;

    return (
      normalizeValue(item.titleOriginal) !== form.titleOriginal ||
      normalizeValue(item.summary) !== form.summary ||
      normalizeValue(item.contentText) !== form.contentText ||
      normalizeValue(item.editorNotes) !== form.editorNotes
    );
  }, [item, form]);

  if (loading) {
    return (
      <EmptyState
        title="Cargando noticia"
        message="Esperando la respuesta real del SPA de Bitrix24."
      />
    );
  }

  if (error) {
    return <EmptyState title="Error de carga" message={error} />;
  }

  if (isEmpty) {
    return (
      <EmptyState
        title="Sin noticias"
        message="No hay noticias disponibles en el SPA."
      />
    );
  }

  if (!item) {
    return (
      <EmptyState
        title="Selecciona una noticia"
        message="Elige una noticia real del listado para ver su detalle."
      />
    );
  }

  const rawStatus = item.syncStatus || item.status || "";
  const displayStatus = getDisplayStatus(rawStatus);
  const relevantDate = pickRelevantDate(item);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSave() {
    if (!hasChanges || saving || !onSave) return;

    await onSave({
      titleOriginal: form.titleOriginal,
      summary: form.summary,
      contentText: form.contentText,
      editorNotes: form.editorNotes,
    });
  }

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-y-auto bg-slate-100">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="mb-3 flex items-center gap-3">
          <StatusBadge status={rawStatus} />
          <span className="text-xs text-slate-500">{item.sourceSite || "Sin fuente"}</span>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Título
          </label>
          <input
            type="text"
            value={form.titleOriginal}
            onChange={(e) => updateField("titleOriginal", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-2xl font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Título de la noticia"
          />
        </div>

        <p className="mt-3 break-all text-sm text-slate-500">
          {item.sourceUrl || "Sin URL"}
        </p>
      </div>

      <div className="p-6">
        <div className="grid gap-5 xl:grid-cols-2">
          <Block title="Resumen">
            <textarea
              value={form.summary}
              onChange={(e) => updateField("summary", e.target.value)}
              rows={8}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Resumen de la noticia"
            />
          </Block>

          <Block title="Estado editorial">
            <div className="space-y-2">
              <div>
                <strong>Estado:</strong> {displayStatus.label}
              </div>
              <div>
                <strong>Lista para subir:</strong> {item.readyToUpload ? "Sí" : "No"}
              </div>
              <div>
                <strong>Última fecha relevante:</strong> {relevantDate}
              </div>
            </div>
          </Block>

          <Block title="Contenido" fullWidth>
            <textarea
              value={form.contentText}
              onChange={(e) => updateField("contentText", e.target.value)}
              rows={18}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Contenido completo de la noticia"
            />
          </Block>

          <Block title="Notas del editor" fullWidth>
            <textarea
              value={form.editorNotes}
              onChange={(e) => updateField("editorNotes", e.target.value)}
              rows={6}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Notas internas del editor"
            />
          </Block>

          <Block title="Motivo de rechazo">
            {item.rejectionReason || "Sin motivo de rechazo"}
          </Block>

          <Block title="Metadatos">
            <ul className="space-y-2">
              <li>
                <strong>ID:</strong> {item.id ?? "-"}
              </li>
              <li>
                <strong>Fecha publicación:</strong> {item.publishedAt || "-"}
              </li>
              <li>
                <strong>Fecha scraping:</strong> {item.scrapedAt || "-"}
              </li>
              <li>
                <strong>Fecha importación:</strong> {item.importedAt || "-"}
              </li>
              <li>
                <strong>Última sincronización:</strong> {item.lastSyncAt || "-"}
              </li>
              <li>
                <strong>Error de sincronización:</strong> {item.syncError || "-"}
              </li>
            </ul>
          </Block>

          <div className="xl:col-span-2">
            <div className="flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              {hasChanges ? (
                <span className="text-sm text-amber-600">
                  Hay cambios sin guardar
                </span>
              ) : (
                <span className="text-sm text-slate-500">
                  Sin cambios pendientes
                </span>
              )}

              <button
                type="button"
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
