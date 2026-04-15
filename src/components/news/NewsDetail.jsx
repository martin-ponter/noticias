import StatusBadge from "./StatusBadge";

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

export default function NewsDetail({ item }) {
  if (!item) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <div className="max-w-md rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Selecciona una noticia
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Aqu\u00ED ver\u00E1s el original, el contenido generado y el estado editorial.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-slate-100">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="mb-3 flex items-center gap-3">
          <StatusBadge status={item.status} />
          <span className="text-xs text-slate-500">{item.sourceSite || "Sin fuente"}</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          {item.titleOriginal || "Sin t\u00EDtulo"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {item.sourceUrl || "Sin URL"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-5 xl:grid-cols-2">
          <Block title="Resumen original">
            {item.summaryOriginal || "Sin resumen original"}
          </Block>

          <Block title="Resumen generado">
            {item.summaryGenerated || "Todav\u00EDa no se ha generado contenido"}
          </Block>

          <Block title="Contenido original">
            <div className="whitespace-pre-wrap">
              {item.contentOriginal || "Sin contenido original"}
            </div>
          </Block>

          <Block title="Contenido generado">
            <div className="whitespace-pre-wrap">
              {item.contentGenerated || "Todav\u00EDa no se ha generado contenido"}
            </div>
          </Block>

          <Block title="Metadatos">
            <ul className="space-y-2">
              <li>
                <strong>ID:</strong> {item.id ?? "-"}
              </li>
              <li>
                <strong>Fecha publicaci\u00F3n:</strong> {item.publishedAt || "-"}
              </li>
              <li>
                <strong>Fecha scraping:</strong> {item.scrapedAt || "-"}
              </li>
              <li>
                <strong>Fecha generaci\u00F3n IA:</strong> {item.aiGeneratedAt || "-"}
              </li>
            </ul>
          </Block>

          <Block title="Observaciones">
            {item.reviewReason || "Sin observaciones"}
          </Block>
        </div>
      </div>
    </div>
  );
}
