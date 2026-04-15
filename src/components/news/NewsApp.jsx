import { useEffect, useMemo, useState } from "react";
import {
  ACCESS_DENIED_MESSAGE,
  getBitrixContext,
  initBitrix,
} from "../../lib/bitrix/bootstrap";
import { tryFinishInstall } from "../../lib/bitrix/install";
import { getCurrentBitrixUserRaw, normalizeBitrixUser } from "../../lib/bitrix/user";
import NewsSidebar from "./NewsSidebar";
import NewsToolbar from "./NewsToolbar";
import NewsDetail from "./NewsDetail";

const MOCK_ITEMS = [
  {
    id: 1,
    status: "PENDIENTE",
    sourceSite: "Fiscalclinic",
    sourceUrl: "https://fiscalclinic.es/ejemplo-1",
    publishedAt: "2026-04-10",
    scrapedAt: "2026-04-15 09:00",
    aiGeneratedAt: null,
    titleOriginal: "Cómo gestionar correctamente las retenciones fiscales en clínicas",
    summaryOriginal:
      "Artículo original scrapeado pendiente de revisión editorial.",
    contentOriginal:
      "Contenido original de ejemplo. Aquí luego irá lo que venga del SPA o de Bitrix.",
    summaryGenerated: "",
    contentGenerated: "",
    reviewReason: "",
  },
  {
    id: 2,
    status: "GENERADA",
    sourceSite: "Traspaso Dental",
    sourceUrl: "https://traspasodental.es/ejemplo-2",
    publishedAt: "2026-04-12",
    scrapedAt: "2026-04-15 09:05",
    aiGeneratedAt: "2026-04-15 09:10",
    titleOriginal: "Consejos para preparar una clínica antes de su transmisión",
    summaryOriginal:
      "Artículo original ya transformado en una noticia neutral.",
    contentOriginal:
      "Contenido original de ejemplo con enfoque comercial.",
    summaryGenerated:
      "Resumen neutral generado por IA pendiente de aprobación.",
    contentGenerated:
      "Contenido ya generado por IA. Después lo enlazaremos con el backend real.",
    reviewReason: "",
  },
];

export default function NewsApp() {
  const [bootLoading, setBootLoading] = useState(true);
  const [bitrixReady, setBitrixReady] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState(MOCK_ITEMS);
  const [selectedId, setSelectedId] = useState(MOCK_ITEMS[0]?.id ?? null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      setBootLoading(true);
      setError("");
      setAccessDenied(false);

      try {
        const context = getBitrixContext();

        if (!context.hasBitrixHints) {
          if (!cancelled) {
            setBitrixReady(false);
            setAccessDenied(true);
          }
          return;
        }

        const { bx24 } = await initBitrix();
        await tryFinishInstall(bx24);

        let normalizedUser = null;

        try {
          const rawUser = await getCurrentBitrixUserRaw();
          normalizedUser = normalizeBitrixUser(rawUser);
        } catch (userError) {
          console.warn("No se pudo obtener el usuario actual de Bitrix24:", userError);
        }

        if (!cancelled) {
          setUser(normalizedUser);
          setBitrixReady(true);
          setAccessDenied(false);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setBitrixReady(false);

          if (err?.message === ACCESS_DENIED_MESSAGE) {
            setAccessDenied(true);
            return;
          }

          setError(err?.message || "Error iniciando la app en Bitrix24");
        }
      } finally {
        if (!cancelled) {
          setBootLoading(false);
        }
      }
    }

    boot();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) || null,
    [items, selectedId]
  );

  function updateSelectedStatus(status, extra = {}) {
    if (!selectedItem) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              status,
              ...extra,
            }
          : item
      )
    );
  }

  function handleGenerate() {
    if (!selectedItem) return;

    updateSelectedStatus("GENERANDO");

    setTimeout(() => {
      updateSelectedStatus("GENERADA", {
        aiGeneratedAt: new Date().toISOString(),
        summaryGenerated:
          "Resumen generado de ejemplo. Aquí conectaremos luego con el backend y OpenAI.",
        contentGenerated:
          "Contenido generado de ejemplo. Esta parte será sustituida por la respuesta real del backend.",
      });
    }, 800);
  }

  function handleRegenerate() {
    if (!selectedItem) return;
    handleGenerate();
  }

  function handleApprove() {
    updateSelectedStatus("APROBADA");
  }

  function handleReject() {
    updateSelectedStatus("RECHAZADA", {
      reviewReason: "Marcada manualmente como rechazada por el editor.",
    });
  }

  if (bootLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600 shadow-sm">
          Iniciando aplicación...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="max-w-lg rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
          <h1 className="text-lg font-semibold text-red-700">Error de inicio</h1>
          <p className="mt-2 text-sm text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  if (accessDenied || !bitrixReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">
            {ACCESS_DENIED_MESSAGE}
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Esta aplicacion solo puede abrirse desde un portal Bitrix24 con un contexto
            valido de la app.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">Noticias IA</h1>
            <p className="text-sm text-slate-500">
              Panel editorial para revisar noticias scrapeadas y generar versiones limpias.
            </p>
          </div>

          <div className="text-right text-sm text-slate-500">
            <div>
              <strong>Entorno:</strong> Bitrix24
            </div>
            <div>
              <strong>Usuario:</strong> {user?.name || "No identificado"}
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-73px)] grid-cols-1 xl:grid-cols-[360px_1fr]">
        <NewsSidebar
          items={items}
          selectedItem={selectedItem}
          onSelect={(item) => setSelectedId(item.id)}
          loading={false}
        />

        <main className="flex min-h-0 flex-col">
          <NewsToolbar
            selectedItem={selectedItem}
            onGenerate={handleGenerate}
            onRegenerate={handleRegenerate}
            onApprove={handleApprove}
            onReject={handleReject}
          />

          <div className="min-h-0 flex-1">
            <NewsDetail item={selectedItem} />
          </div>
        </main>
      </div>
    </div>
  );
}
