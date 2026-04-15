import { useEffect, useMemo, useState } from "react";
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig.js";
import {
  ACCESS_DENIED_MESSAGE,
  BITRIX_CONTEXT_STATES,
  initBitrix,
} from "../../lib/bitrix/bootstrap";
import { tryFinishInstall } from "../../lib/bitrix/install";
import { getCurrentBitrixUserRaw, normalizeBitrixUser } from "../../lib/bitrix/user";
import NewsSidebar from "./NewsSidebar";
import NewsToolbar from "./NewsToolbar";
import NewsDetail from "./NewsDetail";

async function fetchJson(url, init) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error || "No se pudo completar la solicitud");
  }

  return payload;
}

function sortItems(items = []) {
  return [...items].sort((left, right) => Number(right.id || 0) - Number(left.id || 0));
}

export default function NewsApp() {
  const [contextState, setContextState] = useState(BITRIX_CONTEXT_STATES.CHECKING);
  const [bitrixReady, setBitrixReady] = useState(false);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");
  const [newsLoading, setNewsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      setContextState(BITRIX_CONTEXT_STATES.CHECKING);
      setBitrixReady(false);
      setUser(null);
      setItems([]);
      setSelectedId(null);
      setError("");

      try {
        const result = await initBitrix();

        if (result.status === BITRIX_CONTEXT_STATES.OUTSIDE) {
          if (!cancelled) {
            setContextState(BITRIX_CONTEXT_STATES.OUTSIDE);
          }
          return;
        }

        const { bx24 } = result;
        await tryFinishInstall(bx24);

        let normalizedUser = null;

        if (bx24) {
          try {
            const rawUser = await getCurrentBitrixUserRaw();
            normalizedUser = normalizeBitrixUser(rawUser);
          } catch (userError) {
            console.warn("No se pudo obtener el usuario actual de Bitrix24:", userError);
          }
        }

        if (!cancelled) {
          setUser(normalizedUser);
          setBitrixReady(true);
          setContextState(BITRIX_CONTEXT_STATES.INSIDE);
        }
      } catch (err) {
        if (!cancelled) {
          setBitrixReady(false);
          setContextState(BITRIX_CONTEXT_STATES.INSIDE);
          setError(err?.message || "Error iniciando la app en Bitrix24");
        }
      }
    }

    boot();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!bitrixReady) {
      return undefined;
    }

    let cancelled = false;

    async function loadNews() {
      setNewsLoading(true);
      setError("");

      try {
        const payload = await fetchJson("/api/news/list");
        const nextItems = sortItems(Array.isArray(payload.items) ? payload.items : []);

        if (cancelled) return;

        setItems(nextItems);
        setSelectedId((currentSelectedId) => {
          if (nextItems.length === 0) {
            return null;
          }

          const stillExists = nextItems.some(
            (item) => Number(item.id) === Number(currentSelectedId)
          );

          return stillExists ? currentSelectedId : nextItems[0].id;
        });
      } catch (err) {
        if (!cancelled) {
          setItems([]);
          setSelectedId(null);
          setError(err?.message || "No se pudieron cargar las noticias del SPA");
        }
      } finally {
        if (!cancelled) {
          setNewsLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      cancelled = true;
    };
  }, [bitrixReady]);

  const selectedItem = useMemo(
    () => items.find((item) => Number(item.id) === Number(selectedId)) || null,
    [items, selectedId]
  );

  async function updateSelectedStatus(nextStatus, rejectionReason = "") {
    if (!selectedItem || actionLoading) return;

    setActionLoading(true);
    setError("");

    try {
      const payload = await fetchJson("/api/news/update-status", {
        method: "POST",
        body: JSON.stringify({
          id: selectedItem.id,
          status: nextStatus,
          rejectionReason,
        }),
      });

      const updatedItem = payload.item;

      setItems((prev) =>
        sortItems(
          prev.map((item) =>
            Number(item.id) === Number(updatedItem.id) ? updatedItem : item
          )
        )
      );
      setSelectedId(updatedItem.id);
    } catch (err) {
      setError(err?.message || "No se pudo actualizar la noticia seleccionada");
    } finally {
      setActionLoading(false);
    }
  }

  function handleGenerate() {
    return updateSelectedStatus(BITRIX_APP_CONFIG.STATUS.GENERANDO);
  }

  function handleRegenerate() {
    return updateSelectedStatus(BITRIX_APP_CONFIG.STATUS.GENERANDO);
  }

  function handleApprove() {
    return updateSelectedStatus(BITRIX_APP_CONFIG.STATUS.APROBADA);
  }

  function handleReject() {
    return updateSelectedStatus(
      BITRIX_APP_CONFIG.STATUS.RECHAZADA,
      "Marcada manualmente como rechazada por el editor."
    );
  }

  if (contextState === BITRIX_CONTEXT_STATES.CHECKING) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600 shadow-sm">
          Comprobando contexto Bitrix24...
        </div>
      </div>
    );
  }

  if (contextState === BITRIX_CONTEXT_STATES.OUTSIDE) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">
            {ACCESS_DENIED_MESSAGE}
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Esta aplicación solo puede abrirse desde un portal Bitrix24 con un contexto
            válido de la app.
          </p>
        </div>
      </div>
    );
  }

  if (!bitrixReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600 shadow-sm">
          Iniciando aplicación...
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
              Panel editorial conectado al SPA real de Bitrix24.
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
          loading={newsLoading}
          error={error}
        />

        <main className="flex min-h-0 flex-col">
          <NewsToolbar
            selectedItem={selectedItem}
            onGenerate={handleGenerate}
            onRegenerate={handleRegenerate}
            onApprove={handleApprove}
            onReject={handleReject}
            disabled={actionLoading || newsLoading}
          />

          <div className="min-h-0 flex-1">
            <NewsDetail
              item={selectedItem}
              loading={newsLoading}
              error={error}
              isEmpty={!newsLoading && !error && items.length === 0}
            />
          </div>
        </main>
      </div>
    </div>
  );
}