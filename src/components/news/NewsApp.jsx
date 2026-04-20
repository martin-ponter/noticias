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
import RegenerateNewsModal from "./RegenerateNewsModal";
import ApprovePublishModal from "./ApprovePublishModal";

const DETAIL_VIEWS = {
  ORIGINAL: "original",
  WEB: "web",
  LINKEDIN: "linkedin",
};

async function fetchJson(url, init) {
  const isFormData =
    typeof FormData !== "undefined" && init?.body instanceof FormData;
  const response = await fetch(url, {
    headers: isFormData
      ? init?.headers || {}
      : {
          "Content-Type": "application/json",
          ...(init?.headers || {}),
        },
    ...init,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.ok) {
    const error = new Error(payload?.error || "No se pudo completar la solicitud");
    error.payload = payload;
    throw error;
  }

  return payload;
}

function sortItems(items = []) {
  return [...items].sort((left, right) => Number(right.id || 0) - Number(left.id || 0));
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function isUploadedItem(item) {
  const status = String(item?.syncStatus || item?.status || "").trim().toLowerCase();
  return status === "subida";
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
    ...(savedFields?.aiWebTitle !== undefined
      ? { aiWebTitle: savedFields.aiWebTitle }
      : {}),
    ...(savedFields?.aiWebExcerpt !== undefined
      ? { aiWebExcerpt: savedFields.aiWebExcerpt }
      : {}),
    ...(savedFields?.aiWebContent !== undefined
      ? { aiWebContent: savedFields.aiWebContent }
      : {}),
    ...(savedFields?.aiLinkedinPost !== undefined
      ? { aiLinkedinPost: savedFields.aiLinkedinPost }
      : {}),
    ...(savedFields?.aiLinkedinHashtags !== undefined
      ? { aiLinkedinHashtags: savedFields.aiLinkedinHashtags }
      : {}),
    syncStatus: serverItem?.syncStatus || BITRIX_APP_CONFIG.STATUS.EDITADA,
    status: serverItem?.syncStatus || BITRIX_APP_CONFIG.STATUS.EDITADA,
    lastSyncAt: serverItem?.lastSyncAt || new Date().toISOString(),
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
  const [selectedView, setSelectedView] = useState(DETAIL_VIEWS.ORIGINAL);
  const [generateLoading, setGenerateLoading] = useState({
    web: false,
    linkedin: false,
    regenerate: false,
  });
  const [regenerateModalOpen, setRegenerateModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishError, setPublishError] = useState("");

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

        console.log("[NewsApp] initBitrix result", {
          status: result.status,
          bx24Available: Boolean(result.bx24),
          matchedQueryKeys: result.context?.matchedQueryKeys || [],
          probableBitrix: result.context?.probableBitrix,
          installMode: result.context?.installMode,
        });

        if (result.status === BITRIX_CONTEXT_STATES.OUTSIDE) {
          if (!cancelled) {
            setContextState(BITRIX_CONTEXT_STATES.OUTSIDE);
            setBitrixReady(false);
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
        console.error("[NewsApp] initBitrix failed", err);

        if (!cancelled) {
          setBitrixReady(false);
          setContextState(BITRIX_CONTEXT_STATES.OUTSIDE);
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

  function applyUpdatedItem(updatedItem) {
    setItems((prev) =>
      sortItems(
        prev.map((item) =>
          Number(item.id) === Number(updatedItem.id) ? updatedItem : item
        )
      )
    );
    setSelectedId(updatedItem.id);
  }

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
      applyUpdatedItem(updatedItem);
    } catch (err) {
      setError(err?.message || "No se pudieron guardar los cambios");
    } finally {
      setSaveLoading(false);
    }
  }

  async function refreshSelectedItem(id = selectedItem?.id) {
    if (!id) return null;

    const payload = await fetchJson(`/api/news/get?id=${encodeURIComponent(id)}`);
    applyUpdatedItem(payload.item);
    return payload.item;
  }

  async function runGeneration(channels, prompts = {}) {
    if (!selectedItem || channels.length === 0) return null;

    const payload = await fetchJson("/api/news/generate", {
      method: "POST",
      body: JSON.stringify({
        id: selectedItem.id,
        channels,
        prompts,
      }),
    });

    applyUpdatedItem(payload.item);

    if (channels.length === 1) {
      if (channels[0] === "web") {
        setSelectedView(DETAIL_VIEWS.WEB);
      }

      if (channels[0] === "linkedin") {
        setSelectedView(DETAIL_VIEWS.LINKEDIN);
      }
    }

    if (payload.hasErrors) {
      setError(payload.errorSummary || "La generación IA devolvió errores");
    } else {
      setError("");
    }

    return payload;
  }

  async function handleGenerateWeb() {
    if (!selectedItem || generateLoading.web || generateLoading.regenerate) return;

    setGenerateLoading((prev) => ({
      ...prev,
      web: true,
    }));
    setError("");

    try {
      await runGeneration(["web"]);
    } catch (err) {
      setError(err?.message || "No se pudo generar la noticia web");
    } finally {
      setGenerateLoading((prev) => ({
        ...prev,
        web: false,
      }));
    }
  }

  async function handleGenerateLinkedin() {
    if (!selectedItem || generateLoading.linkedin || generateLoading.regenerate) return;

    setGenerateLoading((prev) => ({
      ...prev,
      linkedin: true,
    }));
    setError("");

    try {
      await runGeneration(["linkedin"]);
    } catch (err) {
      setError(err?.message || "No se pudo generar la noticia LinkedIn");
    } finally {
      setGenerateLoading((prev) => ({
        ...prev,
        linkedin: false,
      }));
    }
  }

  function handleRegenerate() {
    if (!selectedItem || generateLoading.web || generateLoading.linkedin) return;
    setRegenerateModalOpen(true);
  }

  async function handleRegenerateSubmit({ channels, prompts }) {
    if (!selectedItem || generateLoading.regenerate) return;

    setGenerateLoading((prev) => ({
      ...prev,
      regenerate: true,
    }));
    setError("");

    try {
      await runGeneration(channels, prompts);
      setRegenerateModalOpen(false);
    } catch (err) {
      setError(err?.message || "No se pudo regenerar el contenido IA");
    } finally {
      setGenerateLoading((prev) => ({
        ...prev,
        regenerate: false,
      }));
    }
  }

  function handleApprove() {
    if (!selectedItem || actionLoading || publishLoading || isUploadedItem(selectedItem)) {
      return;
    }
    setPublishError("");
    setApproveModalOpen(true);
  }

  function handleReject() {
    return updateSelectedStatus(
      BITRIX_APP_CONFIG.STATUS.RECHAZADA,
      "Marcada manualmente como rechazada por el editor."
    );
  }

  async function handlePublishSubmit({ contentSource, imageSource, manualImageFile }) {
    if (!selectedItem || publishLoading) return;

    setPublishLoading(true);
    setPublishError("");
    setError("");

    const formData = new FormData();
    formData.append("id", String(selectedItem.id));
    formData.append("contentSource", contentSource);
    formData.append("imageSource", imageSource);

    if (imageSource === "manual" && manualImageFile) {
      formData.append("manualImage", manualImageFile);
    }

    try {
      const payload = await fetchJson("/api/news/publish-wordpress", {
        method: "POST",
        body: formData,
      });

      applyUpdatedItem(payload.item);
      setApproveModalOpen(false);
    } catch (err) {
      const backendItem = err?.payload?.item;

      if (backendItem) {
        applyUpdatedItem(backendItem);
      } else {
        try {
          await refreshSelectedItem(selectedItem.id);
        } catch (refreshError) {
          console.warn("No se pudo refrescar la noticia tras un error de publicación", refreshError);
        }
      }

      const message =
        err?.message || "No se pudo subir la noticia seleccionada a WordPress";
      setPublishError(message);
    } finally {
      setPublishLoading(false);
    }
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
          {error ? (
            <p className="mt-4 text-xs text-rose-600">{error}</p>
          ) : null}
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

      <div className="h-[calc(100vh-73px)] overflow-x-auto overflow-y-hidden">
        <div className="grid h-full min-h-0 min-w-[760px] grid-cols-[280px_minmax(0,1fr)] md:min-w-0 md:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)]">
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

          <main className="flex min-h-0 min-w-0 flex-col overflow-hidden">
            <NewsToolbar
              selectedItem={selectedItem}
              selectedView={selectedView}
              onSelectedViewChange={setSelectedView}
              onGenerateWeb={handleGenerateWeb}
              onGenerateLinkedin={handleGenerateLinkedin}
              onRegenerate={handleRegenerate}
              onApprove={handleApprove}
              onReject={handleReject}
              generatingWeb={generateLoading.web}
              generatingLinkedin={generateLoading.linkedin}
              regenerating={generateLoading.regenerate}
              publishing={publishLoading}
              disabled={
                actionLoading ||
                newsLoading ||
                saveLoading ||
                publishLoading ||
                generateLoading.web ||
                generateLoading.linkedin ||
                generateLoading.regenerate
              }
            />

            <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
              <NewsDetail
                item={selectedItem}
                loading={newsLoading}
                error={error}
                isEmpty={!newsLoading && !error && filteredItems.length === 0}
                selectedView={selectedView}
                onSave={handleSaveNewsFields}
                saving={saveLoading}
              />

              <RegenerateNewsModal
                open={regenerateModalOpen}
                loading={generateLoading.regenerate}
                onClose={() => {
                  if (generateLoading.regenerate) return;
                  setRegenerateModalOpen(false);
                }}
                onSubmit={handleRegenerateSubmit}
              />

              <ApprovePublishModal
                open={approveModalOpen}
                item={selectedItem}
                loading={publishLoading}
                error={publishError}
                onClose={() => {
                  if (publishLoading) return;
                  setApproveModalOpen(false);
                  setPublishError("");
                }}
                onSubmit={handlePublishSubmit}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
