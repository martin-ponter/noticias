import { useEffect, useMemo, useState } from "react";
import StatusBadge, { getDisplayStatus } from "./StatusBadge";

const DETAIL_VIEWS = {
  ORIGINAL: "original",
  WEB: "web",
  LINKEDIN: "linkedin",
};

const VIEW_CONFIG = {
  [DETAIL_VIEWS.ORIGINAL]: {
    saveLabel: "Guardar cambios",
    fields: ["titleOriginal", "summary", "contentText", "editorNotes"],
  },
  [DETAIL_VIEWS.WEB]: {
    saveLabel: "Guardar noticia web",
    fields: ["aiWebTitle", "aiWebExcerpt", "aiWebContent"],
  },
  [DETAIL_VIEWS.LINKEDIN]: {
    saveLabel: "Guardar noticia LinkedIn",
    fields: ["aiLinkedinPost", "aiLinkedinHashtags"],
  },
};

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

function buildFormState(item) {
  return {
    titleOriginal: normalizeValue(item?.titleOriginal),
    summary: normalizeValue(item?.summary),
    contentText: normalizeValue(item?.contentText),
    editorNotes: normalizeValue(item?.editorNotes),
    aiWebTitle: normalizeValue(item?.aiWebTitle),
    aiWebExcerpt: normalizeValue(item?.aiWebExcerpt),
    aiWebContent: normalizeValue(item?.aiWebContent),
    aiLinkedinPost: normalizeValue(item?.aiLinkedinPost),
    aiLinkedinHashtags: normalizeValue(item?.aiLinkedinHashtags),
  };
}

function getSavePayload(view, form) {
  switch (view) {
    case DETAIL_VIEWS.WEB:
      return {
        aiWebTitle: form.aiWebTitle,
        aiWebExcerpt: form.aiWebExcerpt,
        aiWebContent: form.aiWebContent,
      };
    case DETAIL_VIEWS.LINKEDIN:
      return {
        aiLinkedinPost: form.aiLinkedinPost,
        aiLinkedinHashtags: form.aiLinkedinHashtags,
      };
    case DETAIL_VIEWS.ORIGINAL:
    default:
      return {
        titleOriginal: form.titleOriginal,
        summary: form.summary,
        contentText: form.contentText,
        editorNotes: form.editorNotes,
      };
  }
}

function renderOriginalView({ item, form, updateField, displayStatus, relevantDate }) {
  return (
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
    </div>
  );
}

function renderWebView({ item, form, updateField }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <Block title="Título IA web">
        <input
          type="text"
          value={form.aiWebTitle}
          onChange={(e) => updateField("aiWebTitle", e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Título generado para web"
        />
      </Block>

      <Block title="Estado IA web">
        <div className="space-y-2">
          <div>
            <strong>Estado:</strong> {item.aiWebStatus || "Sin estado"}
          </div>
          <div>
            <strong>Generada:</strong> {item.aiWebGeneratedAt || "-"}
          </div>
          <div>
            <strong>Error:</strong> {item.aiWebError || "-"}
          </div>
        </div>
      </Block>

      <Block title="Extracto IA web" fullWidth>
        <textarea
          value={form.aiWebExcerpt}
          onChange={(e) => updateField("aiWebExcerpt", e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Extracto generado para web"
        />
      </Block>

      <Block title="Contenido IA web" fullWidth>
        <textarea
          value={form.aiWebContent}
          onChange={(e) => updateField("aiWebContent", e.target.value)}
          rows={20}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Contenido generado para web"
        />
      </Block>
    </div>
  );
}

function renderLinkedinView({ item, form, updateField }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <Block title="Post IA LinkedIn" fullWidth>
        <textarea
          value={form.aiLinkedinPost}
          onChange={(e) => updateField("aiLinkedinPost", e.target.value)}
          rows={14}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Post generado para LinkedIn"
        />
      </Block>

      <Block title="Estado IA LinkedIn">
        <div className="space-y-2">
          <div>
            <strong>Estado:</strong> {item.aiLinkedinStatus || "Sin estado"}
          </div>
          <div>
            <strong>Generada:</strong> {item.aiLinkedinGeneratedAt || "-"}
          </div>
          <div>
            <strong>Error:</strong> {item.aiLinkedinError || "-"}
          </div>
        </div>
      </Block>

      <Block title="Hashtags IA LinkedIn">
        <textarea
          value={form.aiLinkedinHashtags}
          onChange={(e) => updateField("aiLinkedinHashtags", e.target.value)}
          rows={8}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="#noticia #ia #linkedin"
        />
      </Block>
    </div>
  );
}

export default function NewsDetail({
  item,
  loading,
  error,
  isEmpty,
  selectedView = DETAIL_VIEWS.ORIGINAL,
  onSave,
  saving = false,
}) {
  const [form, setForm] = useState(buildFormState(item));

  useEffect(() => {
    setForm(buildFormState(item));
  }, [
    item?.id,
    item?.titleOriginal,
    item?.summary,
    item?.contentText,
    item?.editorNotes,
    item?.aiWebTitle,
    item?.aiWebExcerpt,
    item?.aiWebContent,
    item?.aiLinkedinPost,
    item?.aiLinkedinHashtags,
  ]);

  const activeConfig = VIEW_CONFIG[selectedView] || VIEW_CONFIG[DETAIL_VIEWS.ORIGINAL];

  const hasChanges = useMemo(() => {
    if (!item) return false;

    return activeConfig.fields.some((fieldName) => {
      return normalizeValue(item[fieldName]) !== normalizeValue(form[fieldName]);
    });
  }, [activeConfig.fields, form, item]);

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
    await onSave(getSavePayload(selectedView, form));
  }

  function renderActiveView() {
    const props = { item, form, updateField, displayStatus, relevantDate };

    switch (selectedView) {
      case DETAIL_VIEWS.WEB:
        return renderWebView(props);
      case DETAIL_VIEWS.LINKEDIN:
        return renderLinkedinView(props);
      case DETAIL_VIEWS.ORIGINAL:
      default:
        return renderOriginalView(props);
    }
  }

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-y-auto bg-slate-100">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="mb-3 flex items-center gap-3">
          <StatusBadge status={rawStatus} />
          <span className="text-xs text-slate-500">{item.sourceSite || "Sin fuente"}</span>
        </div>

        {selectedView === DETAIL_VIEWS.ORIGINAL ? (
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
        ) : (
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contexto original
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {item.titleOriginal || "Sin título"}
            </h2>
          </div>
        )}

        <p className="mt-3 break-all text-sm text-slate-500">
          {item.sourceUrl || "Sin URL"}
        </p>
      </div>

      <div className="p-6">
        {renderActiveView()}

        <div className="mt-5">
          <div className="flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            {hasChanges ? (
              <span className="text-sm text-amber-600">Hay cambios sin guardar</span>
            ) : (
              <span className="text-sm text-slate-500">Sin cambios pendientes</span>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {saving ? "Guardando..." : activeConfig.saveLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
