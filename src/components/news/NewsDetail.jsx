import StatusBadge, { getDisplayStatus } from "./StatusBadge";

function Block({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
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
  return item.publishedAt || item.scrapedAt || item.importedAt || item.lastSyncAt || "-";
}

export default function NewsDetail({ item, loading, error, isEmpty }) {
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

  return (
    <div className="flex h-full flex-col bg-slate-100">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="mb-3 flex items-center gap-3">
          <StatusBadge status={rawStatus} />
          <span className="text-xs text-slate-500">{item.sourceSite || "Sin fuente"}</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          {item.titleOriginal || "Sin título"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {item.sourceUrl || "Sin URL"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-5 xl:grid-cols-2">
          <Block title="Resumen">
            {item.summary || "Sin resumen"}
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

          <Block title="Contenido">
            <div className="whitespace-pre-wrap">
              {item.contentText || "Sin contenido"}
            </div>
          </Block>

          <Block title="Notas del editor">
            {item.editorNotes || "Sin notas del editor"}
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
      </div>
    </div>
  );
}