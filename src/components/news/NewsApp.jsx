import { useEffect, useMemo, useState } from "react";
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig";
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

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function matchesSearch(item, query) {
  const q = normalizeText(query);

  if (!q) return true;

  const haystack = [
    item?.titleOriginal,
    item?.summary,
    item?.sourceUrl,
    item?.sourceSite,
    item?.sourceSlug,
    item?.contentText,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

function matchesStatus(item, selectedStatus) {
  const filterValue = normalizeText(selectedStatus);
  if (!filterValue) return true;

  const itemStatus = normalizeText(item?.syncStatus || item?.status || "");
  return itemStatus === filterValue;
}

function matchesSource(item, selectedSource) {
  const filterValue = normalizeText(selectedSource);
  if (!filterValue) return true;

  const itemSource = normalizeText(item?.sourceSite || "");
  return itemSource === filterValue;
}

function mergeSavedFields(currentItem, serverItem, savedFields) {
  const base = serverItem || currentItem;

  return {
    ...base,
    ...(savedFields?.titleOriginal !== undefined
      ? { titleOriginal: savedFields.titleOriginal }
      : {}),
    ...(savedFields?.summary !== undefined
      ? { summary: savedFields.summary }
      : {}),
    ...(savedFields?.contentText !== undefined
      ? { contentText: savedFields.contentText }
      : {}),
    ...(savedFields?.editorNotes !== undefined
      ? { editorNotes: savedFields.editorNotes }
      : {}),
    syncStatus:
      serverItem?.syncStatus ||
      BITRIX_APP_CONFIG.STATUS.EDITADA,
    status:
      serverItem?.syncStatus ||
      BITRIX_APP_CONFIG.STATUS.EDITADA,
    lastSyncAt:
      serverItem?.lastSyncAt || new Date().toISOString(),
  };
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
  const [saveLoading, setSaveLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("");
  const [selectedSourceFilter, setSelectedSourceFilter] = useState("");

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

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return (
        matchesSearch(item, searchTerm) &&
        matchesStatus(item, selectedStatusFilter) &&
        matchesSource(item, selectedSourceFilter)
      );
    });
  }, [items, searchTerm, selectedStatusFilter, selectedSourceFilter]);

  useEffect(() => {
    if (filteredItems.length === 0) {
      setSelectedId(null);
      return;
    }

    const selectedStillExists = filteredItems.some(
      (item) => Number(item.id) === Number(selectedId)
    );

    if (!selectedStillExists) {
      setSelectedId(filteredItems[0].id);
    }
  }, [filteredItems, selectedId]);

  const selectedItem = useMemo(
    () => filteredItems.find((item) => Number(item.id) === Number(selectedId)) || null,
    [filteredItems, selectedId]
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

      const updatedItem = {
        ...payload.item,
        syncStatus: payload.item?.syncStatus || nextStatus,
        status: payload.item?.syncStatus || nextStatus,
      };

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

  async function handleSaveNewsFields(fields) {
    if (!selectedItem || saveLoading) return;

    setSaveLoading(true);
    setError("");

    try {
      const payload = await fetchJson("/api/news/update", {
        method: "POST",
        body: JSON.stringify({
          id: selectedItem.id,
          fields,
        }),
      });

      const updatedItem = mergeSavedFields(selectedItem, payload.item, fields);

      setItems((prev) =>
        sortItems(
          prev.map((item) =>
            Number(item.id) === Number(updatedItem.id) ? updatedItem : item
          )
        )
      );
      setSelectedId(updatedItem.id);
    } catch (err) {
      setError(err?.message || "No se pudieron guardar los cambios");
    } finally {
      setSaveLoading(false);
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
    <div className="h-screen overflow-hidden bg-slate-100 text-slate-900">
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

      <div className="grid h-[calc(100vh-73px)] min-h-0 grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)]">
        <NewsSidebar
          items={filteredItems}
          selectedItem={selectedItem}
          onSelect={(item) => setSelectedId(item.id)}
          loading={newsLoading}
          error={error}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          selectedStatus={selectedStatusFilter}
          onSelectedStatusChange={setSelectedStatusFilter}
          selectedSource={selectedSourceFilter}
          onSelectedSourceChange={setSelectedSourceFilter}
        />

        <main className="flex min-h-0 flex-col overflow-hidden">
          <NewsToolbar
            selectedItem={selectedItem}
            onGenerate={handleGenerate}
            onRegenerate={handleRegenerate}
            onApprove={handleApprove}
            onReject={handleReject}
            disabled={actionLoading || newsLoading || saveLoading}
          />

          <div className="min-h-0 flex-1 overflow-hidden">
            <NewsDetail
              item={selectedItem}
              loading={newsLoading}
              error={error}
              isEmpty={!newsLoading && !error && filteredItems.length === 0}
              onSave={handleSaveNewsFields}
              saving={saveLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}