# app-local-noticias

## Estructura General
- raíz
- .vscode/
- src/

Total de archivos volcados: 37

## Índice de Rutas Incluidas
- .gitignore
- .vscode/extensions.json
- .vscode/launch.json
- astro.config.mjs
- package.json
- README.md
- src/components/news/NewsApp.jsx
- src/components/news/NewsCard.jsx
- src/components/news/NewsDetail.jsx
- src/components/news/NewsSidebar.jsx
- src/components/news/NewsToolbar.jsx
- src/components/news/StatusBadge.jsx
- src/config/bitrixConfig.ts
- src/layouts/Layout.astro
- src/lib/bitrix/bootstrap.js
- src/lib/bitrix/history.js
- src/lib/bitrix/install.js
- src/lib/bitrix/methods.js
- src/lib/bitrix/spa.js
- src/lib/bitrix/user.js
- src/lib/server/api.js
- src/lib/server/bitrix-rest.js
- src/lib/server/news-mapper.js
- src/lib/server/news-service.js
- src/lib/server/response.js
- src/lib/utils/text.js
- src/pages/api/health.ts
- src/pages/api/news/create.ts
- src/pages/api/news/debug-field.js
- src/pages/api/news/get.ts
- src/pages/api/news/list.ts
- src/pages/api/news/update.ts
- src/pages/api/news/update-status.ts
- src/pages/bitrix-entry.ts
- src/pages/index.astro
- src/styles/global.css
- tsconfig.json

## FILE: .gitignore
```
# build output
dist/
# generated types
.astro/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*


# environment variables
.env
.env.production

# macOS-specific files
.DS_Store

# jetbrains setting folder
.idea/
.vercel
```

## FILE: .vscode/extensions.json
```json
{
  "recommendations": ["astro-build.astro-vscode"],
  "unwantedRecommendations": []
}
```

## FILE: .vscode/launch.json
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "command": "./node_modules/.bin/astro dev",
      "name": "Development server",
      "request": "launch",
      "type": "node-terminal"
    }
  ]
}
```

## FILE: astro.config.mjs
```js
// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  security: {
    checkOrigin: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});
```

## FILE: package.json
```json
{
  "name": "dispositivos-perifericos",
  "type": "module",
  "version": "0.0.1",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/react": "^5.0.3",
    "@astrojs/vercel": "^10.0.4",
    "@tailwindcss/vite": "^4.2.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "astro": "^6.1.4",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "tailwindcss": "^4.2.2"
  }
}
```

## FILE: README.md
```md
# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> ðŸ§‘â€ðŸš€ **Seasoned astronaut?** Delete this file. Have fun!

## ðŸš€ Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
â”œâ”€â”€ public/
â”œâ”€â”€ src/
â”‚   â””â”€â”€ pages/
â”‚       â””â”€â”€ index.astro
â””â”€â”€ package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## ðŸ§ž Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## ðŸ‘€ Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
```

## FILE: src/components/news/NewsApp.jsx
```jsx
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
            Esta aplicaciÃ³n solo puede abrirse desde un portal Bitrix24 con un contexto
            vÃ¡lido de la app.
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
          Iniciando aplicaciÃ³n...
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
              onGenerate={handleGenerate}
              onRegenerate={handleRegenerate}
              onApprove={handleApprove}
              onReject={handleReject}
              disabled={actionLoading || newsLoading || saveLoading}
            />

            <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
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
    </div>
  );
}
```

## FILE: src/components/news/NewsCard.jsx
```jsx
import StatusBadge, { getDisplayStatus } from "./StatusBadge";

export default function NewsCard({ item, isSelected, onSelect }) {
  const rawStatus = item.syncStatus || item.status || "";
  const displayStatus = getDisplayStatus(rawStatus);
  const relevantDate = item.publishedAt || item.scrapedAt || item.importedAt || "Sin fecha";

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
          {item.titleOriginal || "Sin tÃ­tulo"}
        </h3>
        <StatusBadge status={rawStatus} />
      </div>

      <div className="space-y-2 text-xs text-slate-500">
        <p className="line-clamp-1">{item.sourceSite || "Fuente desconocida"}</p>
        <p className="line-clamp-1">{relevantDate}</p>
        <p className="line-clamp-2 text-slate-600">
          {item.summary || "Sin resumen"}
        </p>
      </div>
    </button>
  );
}
```

## FILE: src/components/news/NewsDetail.jsx
```jsx
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
            TÃ­tulo
          </label>
          <input
            type="text"
            value={form.titleOriginal}
            onChange={(e) => updateField("titleOriginal", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-2xl font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="TÃ­tulo de la noticia"
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
                <strong>Lista para subir:</strong> {item.readyToUpload ? "SÃ­" : "No"}
              </div>
              <div>
                <strong>Ãšltima fecha relevante:</strong> {relevantDate}
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
                <strong>Fecha publicaciÃ³n:</strong> {item.publishedAt || "-"}
              </li>
              <li>
                <strong>Fecha scraping:</strong> {item.scrapedAt || "-"}
              </li>
              <li>
                <strong>Fecha importaciÃ³n:</strong> {item.importedAt || "-"}
              </li>
              <li>
                <strong>Ãšltima sincronizaciÃ³n:</strong> {item.lastSyncAt || "-"}
              </li>
              <li>
                <strong>Error de sincronizaciÃ³n:</strong> {item.syncError || "-"}
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
```

## FILE: src/components/news/NewsSidebar.jsx
```jsx
import { useMemo } from "react";
import NewsCard from "./NewsCard";

function normalizeStatusLabel(status) {
  const normalized = String(status || "").trim().toLowerCase();

  if (normalized === "ok") {
    return "Pendiente";
  }

  if (!normalized) {
    return "Sin estado";
  }

  return String(status).trim();
}

function buildStatusOptions(items = []) {
  const values = new Set();

  for (const item of items) {
    const status = String(item?.syncStatus || item?.status || "").trim();

    if (status) {
      values.add(status);
    }
  }

  return Array.from(values).sort((a, b) =>
    normalizeStatusLabel(a).localeCompare(normalizeStatusLabel(b), "es")
  );
}

function buildSourceOptions(items = []) {
  const values = new Set();

  for (const item of items) {
    const source = String(item?.sourceSite || "").trim();

    if (source) {
      values.add(source);
    }
  }

  return Array.from(values).sort((a, b) => a.localeCompare(b, "es"));
}

export default function NewsSidebar({
  items,
  selectedItem,
  onSelect,
  loading,
  error,
  searchTerm,
  onSearchTermChange,
  selectedStatus,
  onSelectedStatusChange,
  selectedSource,
  onSelectedSourceChange,
}) {
  const statusOptions = useMemo(() => buildStatusOptions(items), [items]);
  const sourceOptions = useMemo(() => buildSourceOptions(items), [items]);

  return (
    <aside className="h-full min-h-0 min-w-0 border-r border-slate-200 bg-slate-50">
      <div className="flex h-full min-h-0 flex-col">
        <div className="border-b border-slate-200 bg-slate-50/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-slate-50/80">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="news-search"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Buscar
              </label>
              <input
                id="news-search"
                type="text"
                value={searchTerm}
                onChange={(event) => onSearchTermChange(event.target.value)}
                placeholder="TÃ­tulo, resumen, URL..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <div>
                <label
                  htmlFor="news-status-filter"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Estado
                </label>
                <select
                  id="news-status-filter"
                  value={selectedStatus}
                  onChange={(event) => onSelectedStatusChange(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Todos</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {normalizeStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="news-source-filter"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Fuente
                </label>
                <select
                  id="news-source-filter"
                  value={selectedSource}
                  onChange={(event) => onSelectedSourceChange(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Todas</option>
                  {sourceOptions.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                {loading ? "Cargando..." : `${items.length} noticia${items.length === 1 ? "" : "s"}`}
              </span>

              {searchTerm || selectedStatus || selectedSource ? (
                <button
                  type="button"
                  onClick={() => {
                    onSearchTermChange("");
                    onSelectedStatusChange("");
                    onSelectedSourceChange("");
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                >
                  Limpiar
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
              Cargando noticias...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-white p-4 text-sm text-red-700">
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
              No hay noticias que coincidan con los filtros.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItem?.id === item.id}
                  onSelect={onSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
```

## FILE: src/components/news/NewsToolbar.jsx
```jsx
export default function NewsToolbar({
  selectedItem,
  onGenerate,
  onApprove,
  onReject,
  onRegenerate,
  disabled = false,
}) {
  const controlsDisabled = !selectedItem || disabled;

  return (
    <div className="flex flex-wrap gap-3 border-b border-slate-200 bg-white px-6 py-4">
      <button
        type="button"
        onClick={onGenerate}
        disabled={controlsDisabled}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Generar noticia
      </button>

      <button
        type="button"
        onClick={onRegenerate}
        disabled={controlsDisabled}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Regenerar
      </button>

      <button
        type="button"
        onClick={onApprove}
        disabled={controlsDisabled}
        className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Aprobar
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
  );
}
```

## FILE: src/components/news/StatusBadge.jsx
```jsx
const STATUS_STYLES = {
  pendiente: "bg-slate-100 text-slate-700 border-slate-200",
  generando: "bg-amber-100 text-amber-800 border-amber-200",
  generada: "bg-blue-100 text-blue-800 border-blue-200",
  revisar: "bg-orange-100 text-orange-800 border-orange-200",
  editada: "bg-violet-100 text-violet-800 border-violet-200",
  aprobada: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rechazada: "bg-rose-100 text-rose-800 border-rose-200",
  "error ia": "bg-red-100 text-red-800 border-red-200",
  subida: "bg-cyan-100 text-cyan-800 border-cyan-200",
};

export function getDisplayStatus(status) {
  const raw = String(status || "").trim();
  const normalized = raw.toLowerCase();

  if (!raw || normalized === "ok") {
    return {
      key: "pendiente",
      label: "Pendiente",
    };
  }

  return {
    key: normalized,
    label: raw,
  };
}

export default function StatusBadge({ status }) {
  const display = getDisplayStatus(status);
  const className =
    STATUS_STYLES[display.key] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {display.label}
    </span>
  );
}
```

## FILE: src/config/bitrixConfig.ts
```ts
export const BITRIX_APP_CONFIG = {
  APP_NAME: "App local noticias",
  ENTITY_TYPE_ID: 1070,

  STATUS: {
    PENDIENTE: "Pendiente",
    GENERANDO: "Generando",
    GENERADA: "Generada",
    REVISAR: "Revisar",
    EDITADA: "Editada",
    APROBADA: "Aprobada",
    RECHAZADA: "Rechazada",
    ERROR_IA: "Error IA",
    SUBIDA: "Subida",
  },

  FIELDS: {
    BITRIX_TITLE: "title",

    TITLE_ORIGINAL: "ufCrm25_1776172315",
    SOURCE_SITE: "ufCrm25_1776172329",
    SOURCE_ID: "ufCrm25_1776172343",
    SOURCE_URL: "ufCrm25_1776172353",
    SOURCE_SLUG: "ufCrm25_1776172366",

    FEATURED_IMAGE_URL: "ufCrm25_1776172413",
    FEATURED_IMAGE_LOCAL_PATH: "ufCrm25_1776172428",
    FINAL_PUBLICATION_URL: "ufCrm25_1776172447",
    CONTENT_HASH: "ufCrm25_1776172463",
    SYNC_STATUS: "ufCrm25_1776172478",
    SYNC_ERROR: "ufCrm25_1776172491",

    PUBLISHED_AT: "ufCrm25_1776172502",
    MODIFIED_AT: "ufCrm25_1776172524",
    SCRAPED_AT: "ufCrm25_1776172541",
    IMPORTED_AT: "ufCrm25_1776172560",
    LAST_SYNC_AT: "ufCrm25_1776172599",
    UPLOADED_AT: "ufCrm25_1776172614",

    SUMMARY: "ufCrm25_1776172633",
    CONTENT_TEXT: "ufCrm25_1776172680",
    CONTENT_HTML: "ufCrm25_1776172691",
    HEADINGS: "ufCrm25_1776172701",
    IMAGES: "ufCrm25_1776172714",

    EDITOR_NOTES: "ufCrm25_1776172726",
    REJECTION_REASON: "ufCrm25_1776172742",
    READY_TO_UPLOAD: "ufCrm25_1776172770",
    FEATURED_IMAGE_FILE: "ufCrm25_1776172784",
  },
};
```

## FILE: src/layouts/Layout.astro
```astro
---
const { title = "Noticias IA" } = Astro.props;
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>

    <script is:inline src="//api.bitrix24.com/api/v1/"></script>
  </head>
  <body class="min-h-screen bg-slate-100 text-slate-900">
    <slot />
  </body>
</html>
```

## FILE: src/lib/bitrix/bootstrap.js
```js
export const ACCESS_DENIED_MESSAGE = "Acceso no permitido fuera de Bitrix24";

export const BITRIX_CONTEXT_STATES = {
  CHECKING: "checking",
  INSIDE: "inside_bitrix",
  OUTSIDE: "outside_bitrix",
};

const BITRIX_QUERY_KEYS = [
  "DOMAIN",
  "AUTH_ID",
  "AUTH_EXPIRES",
  "APP_SID",
  "PLACEMENT",
  "PLACEMENT_OPTIONS",
  "PROTOCOL",
  "LANG",
  "member_id",
  "REFRESH_ID",
];

function getGlobalWindow() {
  return typeof window === "undefined" ? undefined : window;
}

function normalizeValue(value) {
  return String(value || "").trim().toLowerCase();
}

function isTruthyInstallFlag(value) {
  return ["y", "yes", "true", "1"].includes(normalizeValue(value));
}

function safeGetReferrer() {
  if (typeof document === "undefined") return "";
  return document.referrer || "";
}

function safeIsInsideIframe() {
  const currentWindow = getGlobalWindow();
  if (!currentWindow) return false;

  try {
    return currentWindow.self !== currentWindow.top;
  } catch {
    return true;
  }
}

function matchesBitrixHost(value) {
  const normalized = normalizeValue(value);
  return normalized.includes("bitrix24.") || normalized.includes(".bitrix.");
}

function hasBitrixReferrer(referrer) {
  if (!referrer) return false;

  try {
    return matchesBitrixHost(new URL(referrer).hostname);
  } catch {
    return matchesBitrixHost(referrer);
  }
}

export function hasBX24() {
  const currentWindow = getGlobalWindow();
  return typeof currentWindow?.BX24 !== "undefined";
}

export function getBX24() {
  return hasBX24() ? window.BX24 : null;
}

export function getQueryParams() {
  const currentWindow = getGlobalWindow();
  if (!currentWindow) return new URLSearchParams();

  return new URL(currentWindow.location.href).searchParams;
}

export function getBitrixContextSnapshot() {
  const currentWindow = getGlobalWindow();
  const params = getQueryParams();

  const matchedQueryKeys = BITRIX_QUERY_KEYS.filter((key) => {
    const value = params.get(key);
    return value !== null && String(value).trim() !== "";
  });

  const bx24Available = hasBX24();
  const bx24 = getBX24();

  const bx24ShapeValid =
    !!bx24 &&
    typeof bx24 === "object" &&
    (
      typeof bx24.init === "function" ||
      typeof bx24.callMethod === "function" ||
      typeof bx24.installFinish === "function"
    );

  const insideIframe = safeIsInsideIframe();
  const referrer = safeGetReferrer();
  const bitrixReferrer = hasBitrixReferrer(referrer);

  const domain = params.get("DOMAIN") || "";
  const placement = normalizeValue(params.get("PLACEMENT"));
  const installFlag = normalizeValue(params.get("install"));

  const hasBitrixDomain = matchesBitrixHost(domain);
  const hasQuerySignals = matchedQueryKeys.length > 0;

  const installMode =
    placement.includes("install") || isTruthyInstallFlag(installFlag);

  const querySignalStrong =
    hasBitrixDomain ||
    matchedQueryKeys.includes("AUTH_ID") ||
    matchedQueryKeys.includes("APP_SID") ||
    matchedQueryKeys.includes("member_id");

  const iframeSignal = insideIframe && bitrixReferrer;
  const iframeWithParamsSignal = insideIframe && hasQuerySignals;

  const probableBitrix =
    bx24ShapeValid ||
    querySignalStrong ||
    iframeSignal ||
    iframeWithParamsSignal;

  return {
    params,
    bx24Available,
    bx24ShapeValid,
    matchedQueryKeys,
    hasQuerySignals,
    insideIframe,
    referrer,
    bitrixReferrer,
    domain,
    hasBitrixDomain,
    placement,
    installFlag,
    installMode,
    querySignalStrong,
    iframeSignal,
    iframeWithParamsSignal,
    probableBitrix,
  };
}

export function isInsideBitrix() {
  return getBitrixContextSnapshot().probableBitrix;
}

export function isInstallMode() {
  return getBitrixContextSnapshot().installMode;
}

export function waitForBitrixContext({
  timeoutMs = 4500,
  intervalMs = 125,
} = {}) {
  return new Promise((resolve) => {
    const currentWindow = getGlobalWindow();
    const initialSnapshot = getBitrixContextSnapshot();

    if (!currentWindow) {
      resolve({
        state: BITRIX_CONTEXT_STATES.OUTSIDE,
        snapshot: initialSnapshot,
      });
      return;
    }

    if (initialSnapshot.probableBitrix) {
      resolve({
        state: BITRIX_CONTEXT_STATES.INSIDE,
        snapshot: initialSnapshot,
      });
      return;
    }

    const startedAt = Date.now();

    const timer = currentWindow.setInterval(() => {
      const snapshot = getBitrixContextSnapshot();

      if (snapshot.probableBitrix) {
        currentWindow.clearInterval(timer);
        resolve({
          state: BITRIX_CONTEXT_STATES.INSIDE,
          snapshot,
        });
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        currentWindow.clearInterval(timer);
        resolve({
          state: BITRIX_CONTEXT_STATES.OUTSIDE,
          snapshot,
        });
      }
    }, intervalMs);
  });
}

function initBX24Instance(bx24, initTimeoutMs) {
  return new Promise((resolve, reject) => {
    if (!bx24) {
      reject(new Error("BX24 no estÃ¡ disponible"));
      return;
    }

    if (typeof bx24.init !== "function") {
      resolve(bx24);
      return;
    }

    let settled = false;
    const currentWindow = getGlobalWindow();

    const finish = (callback) => (value) => {
      if (settled) return;
      settled = true;
      callback(value);
    };

    const resolveOnce = finish(resolve);
    const rejectOnce = finish(reject);

    const timeoutId = currentWindow?.setTimeout(() => {
      rejectOnce(new Error("No se pudo inicializar el contexto de Bitrix24"));
    }, initTimeoutMs);

    try {
      bx24.init(() => {
        if (timeoutId) {
          currentWindow.clearTimeout(timeoutId);
        }
        resolveOnce(bx24);
      });
    } catch (error) {
      if (timeoutId) {
        currentWindow.clearTimeout(timeoutId);
      }
      rejectOnce(error);
    }
  });
}

export async function initBitrix({
  contextTimeoutMs = 4500,
  contextIntervalMs = 125,
  initTimeoutMs = 4000,
} = {}) {
  const contextCheck = await waitForBitrixContext({
    timeoutMs: contextTimeoutMs,
    intervalMs: contextIntervalMs,
  });

  console.log("[bitrix-bootstrap] context check", {
    state: contextCheck.state,
    matchedQueryKeys: contextCheck.snapshot.matchedQueryKeys,
    bx24Available: contextCheck.snapshot.bx24Available,
    bx24ShapeValid: contextCheck.snapshot.bx24ShapeValid,
    insideIframe: contextCheck.snapshot.insideIframe,
    bitrixReferrer: contextCheck.snapshot.bitrixReferrer,
    hasBitrixDomain: contextCheck.snapshot.hasBitrixDomain,
    querySignalStrong: contextCheck.snapshot.querySignalStrong,
    iframeSignal: contextCheck.snapshot.iframeSignal,
    iframeWithParamsSignal: contextCheck.snapshot.iframeWithParamsSignal,
    probableBitrix: contextCheck.snapshot.probableBitrix,
    installMode: contextCheck.snapshot.installMode,
    placement: contextCheck.snapshot.placement,
    domain: contextCheck.snapshot.domain,
  });

  if (contextCheck.state === BITRIX_CONTEXT_STATES.OUTSIDE) {
    return {
      status: BITRIX_CONTEXT_STATES.OUTSIDE,
      bx24: null,
      context: contextCheck.snapshot,
    };
  }

  const bx24 = getBX24();

  if (!bx24) {
    return {
      status: BITRIX_CONTEXT_STATES.INSIDE,
      bx24: null,
      context: contextCheck.snapshot,
    };
  }

  await initBX24Instance(bx24, initTimeoutMs);

  return {
    status: BITRIX_CONTEXT_STATES.INSIDE,
    bx24,
    context: getBitrixContextSnapshot(),
  };
}
```

## FILE: src/lib/bitrix/history.js
```js
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig";

export function getBitrixItemCollection(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.item)) return response.item;
  if (Array.isArray(response?.result?.items)) return response.result.items;
  return [];
}

export function getBitrixFieldValue(item, fieldName) {
  return item?.[fieldName] ?? item?.fields?.[fieldName] ?? "";
}

function padDatePart(value) {
  return String(value).padStart(2, "0");
}

function getHistoryTimestampParts(date = new Date()) {
  const year = date.getFullYear();
  const month = padDatePart(date.getMonth() + 1);
  const day = padDatePart(date.getDate());
  const hours = padDatePart(date.getHours());
  const minutes = padDatePart(date.getMinutes());
  const seconds = padDatePart(date.getSeconds());

  return {
    date: `${year}-${month}-${day}`,
    dateTime: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`,
    timeLabel: `${hours}:${minutes}`,
  };
}

function normalizeEmployeeValue(value) {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function normalizeTextValue(value) {
  if (value === null || value === undefined) {
    return undefined;
  }

  const normalized = String(value).trim();
  return normalized ? normalized : undefined;
}

export function mapAssetTypeToHistoryEnum(assetTypeId) {
  const sourceEntries = Object.entries(BITRIX_APP_CONFIG.ENUMS.TIPO_ACTIVO);
  const targetEntries = BITRIX_APP_CONFIG.HISTORY.ENUMS.TIPO_ACTIVO;

  const matchedEntry = sourceEntries.find(([, value]) => String(value) === String(assetTypeId));
  if (!matchedEntry) {
    return "";
  }

  return targetEntries[matchedEntry[0]] || "";
}

export function mapStateToHistoryEnum(stateId, fieldKey) {
  const sourceEntries = Object.entries(BITRIX_APP_CONFIG.ENUMS.ESTADO);
  const targetEntries = BITRIX_APP_CONFIG.HISTORY.ENUMS[fieldKey] || {};
  const matchedEntry = sourceEntries.find(([, value]) => String(value) === String(stateId));

  if (!matchedEntry) {
    return "";
  }

  return targetEntries[matchedEntry[0]] || "";
}

export function buildHistoryMovementFields(asset, action) {
  const timestamp = getHistoryTimestampParts(action.movedAt);
  const fields = {
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.ID_INTERNO_ACTIVO]:
      normalizeTextValue(action.idInternoActivo || asset.idInterno) || "",
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.ID_ITEM_ACTIVO]:
      normalizeTextValue(action.idItemActivo || asset.itemId) || "",
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.NUMERO_SERIE]:
      normalizeTextValue(action.serialNumber || asset.serialNumber) || "",
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.MARCA]:
      normalizeTextValue(action.brand || asset.brand) || "",
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.MODELO]:
      normalizeTextValue(action.model || asset.model) || "",
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.TIPO_ACTIVO]:
      String(action.assetTypeId || mapAssetTypeToHistoryEnum(asset.typeId) || ""),
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.TIPO_MOVIMIENTO]: String(
      action.movementTypeId || ""
    ),
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.FECHA_MOVIMIENTO]: timestamp.date,
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.HORA_MOVIMIENTO]: timestamp.dateTime,
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.DETALLE]:
      normalizeTextValue(action.detail) || "",
  };

  const previousUserId = normalizeEmployeeValue(action.previousUserId);
  const newUserId = normalizeEmployeeValue(action.newUserId);
  const performedById = normalizeEmployeeValue(action.performedById);
  const previousStateId = normalizeTextValue(
    action.previousStateId
      ? mapStateToHistoryEnum(action.previousStateId, "ESTADO_ANTERIOR")
      : ""
  );
  const newStateId = normalizeTextValue(
    action.newStateId ? mapStateToHistoryEnum(action.newStateId, "ESTADO_NUEVO") : ""
  );
  const previousLocation = normalizeTextValue(action.previousLocation);
  const newLocation = normalizeTextValue(action.newLocation);

  if (previousUserId) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.USUARIO_ANTERIOR] = previousUserId;
  }

  if (newUserId) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.USUARIO_NUEVO] = newUserId;
  }

  if (performedById) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.REALIZADO_POR] = performedById;
  }

  if (previousStateId) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.ESTADO_ANTERIOR] = previousStateId;
  }

  if (newStateId) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.ESTADO_NUEVO] = newStateId;
  }

  if (previousLocation) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.UBICACION_ANTERIOR] = previousLocation;
  }

  if (newLocation) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.UBICACION_NUEVA] = newLocation;
  }

  return fields;
}

function resolveUserName(userId, userMap) {
  const normalizedId = normalizeEmployeeValue(userId);

  if (!normalizedId) {
    return "";
  }

  return userMap.get(normalizedId)?.name || `ID ${normalizedId}`;
}

function getMovementOccurredAt(item) {
  const dateValue = getBitrixFieldValue(
    item,
    BITRIX_APP_CONFIG.HISTORY.FIELDS.FECHA_MOVIMIENTO
  );
  const timeValue = getBitrixFieldValue(
    item,
    BITRIX_APP_CONFIG.HISTORY.FIELDS.HORA_MOVIMIENTO
  );

  const baseValue = timeValue || dateValue;
  const parsed = baseValue ? new Date(baseValue) : null;

  return {
    dateValue: dateValue || "",
    timeValue: timeValue || "",
    sortValue:
      parsed && !Number.isNaN(parsed.getTime()) ? parsed.getTime() : 0,
  };
}

export function normalizeHistoryItem(item, userMap = new Map()) {
  const movementTypeId = String(
    getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.TIPO_MOVIMIENTO) || ""
  );
  const previousStateId = String(
    getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.ESTADO_ANTERIOR) || ""
  );
  const newStateId = String(
    getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.ESTADO_NUEVO) || ""
  );
  const occurredAt = getMovementOccurredAt(item);

  return {
    id: String(item?.id || item?.ID || ""),
    movementTypeId,
    movementTypeLabel:
      BITRIX_APP_CONFIG.HISTORY.ENUM_LABELS.TIPO_MOVIMIENTO[movementTypeId] ||
      "Movimiento",
    detail:
      getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.DETALLE) || "",
    previousUser: resolveUserName(
      getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.USUARIO_ANTERIOR),
      userMap
    ),
    newUser: resolveUserName(
      getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.USUARIO_NUEVO),
      userMap
    ),
    performedBy: resolveUserName(
      getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.REALIZADO_POR),
      userMap
    ),
    previousState:
      BITRIX_APP_CONFIG.HISTORY.STATE_LABELS[previousStateId] || "",
    newState: BITRIX_APP_CONFIG.HISTORY.STATE_LABELS[newStateId] || "",
    previousLocation:
      getBitrixFieldValue(
        item,
        BITRIX_APP_CONFIG.HISTORY.FIELDS.UBICACION_ANTERIOR
      ) || "",
    newLocation:
      getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.UBICACION_NUEVA) ||
      "",
    dateValue: occurredAt.dateValue,
    timeValue: occurredAt.timeValue,
    sortValue: occurredAt.sortValue,
  };
}

export function sortHistoryItemsDesc(items) {
  return [...items].sort((a, b) => {
    if (b.sortValue !== a.sortValue) {
      return b.sortValue - a.sortValue;
    }

    return String(b.id).localeCompare(String(a.id), "es");
  });
}
```

## FILE: src/lib/bitrix/install.js
```js
import { getBX24, isInstallMode } from "./bootstrap";

export function tryFinishInstall(bx24Instance = getBX24()) {
  return new Promise((resolve) => {
    if (!bx24Instance || !isInstallMode()) {
      resolve({ attempted: false, success: false });
      return;
    }

    if (typeof bx24Instance.installFinish !== "function") {
      resolve({ attempted: true, success: false });
      return;
    }

    let settled = false;

    const finish = (payload) => {
      if (settled) return;
      settled = true;
      resolve(payload);
    };

    const currentWindow = typeof window === "undefined" ? undefined : window;
    const timeoutId = currentWindow?.setTimeout(() => {
      finish({ attempted: true, success: false });
    }, 2000);

    try {
      bx24Instance.installFinish(() => {
        if (timeoutId) {
          currentWindow.clearTimeout(timeoutId);
        }
        finish({ attempted: true, success: true });
      });
    } catch (error) {
      if (timeoutId) {
        currentWindow.clearTimeout(timeoutId);
      }
      console.warn("No se pudo completar installFinish:", error);
      finish({ attempted: true, success: false });
    }
  });
}
```

## FILE: src/lib/bitrix/methods.js
```js
export function callBitrixMethod(method, params = {}) {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.BX24) {
      reject(new Error("BX24 no disponible"));
      return;
    }

    window.BX24.callMethod(method, params, function (result) {
      if (result.error()) {
        reject(result.error());
        return;
      }

      resolve(result.data());
    });
  });
}
```

## FILE: src/lib/bitrix/spa.js
```js
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig";
import { callBitrixMethod } from "./methods";

export function assertEntityTypeIdConfigured() {
  if (
    !BITRIX_APP_CONFIG.ENTITY_TYPE_ID ||
    BITRIX_APP_CONFIG.ENTITY_TYPE_ID <= 0
  ) {
    throw new Error(
      "Falta configurar ENTITY_TYPE_ID en src/config/bitrixConfig.js"
    );
  }
}

export async function getSpaFields() {
  assertEntityTypeIdConfigured();

  return await callBitrixMethod("crm.item.fields", {
    entityTypeId: BITRIX_APP_CONFIG.ENTITY_TYPE_ID,
  });
}

export async function listSpaItems(params = {}) {
  assertEntityTypeIdConfigured();

  return await callBitrixMethod("crm.item.list", {
    entityTypeId: BITRIX_APP_CONFIG.ENTITY_TYPE_ID,
    ...params,
  });
}

export async function getSpaItem(id) {
  assertEntityTypeIdConfigured();

  return await callBitrixMethod("crm.item.get", {
    entityTypeId: BITRIX_APP_CONFIG.ENTITY_TYPE_ID,
    id,
  });
}

export async function updateSpaItem(id, fields) {
  assertEntityTypeIdConfigured();

  return await callBitrixMethod("crm.item.update", {
    entityTypeId: BITRIX_APP_CONFIG.ENTITY_TYPE_ID,
    id,
    fields,
  });
}
```

## FILE: src/lib/bitrix/user.js
```js
import { callBitrixMethod } from "./methods";

export async function getCurrentBitrixUserRaw() {
  return await callBitrixMethod("user.current");
}

export function normalizeBitrixUser(rawUser) {
  if (!rawUser) return null;

  const id = Number(rawUser.ID || rawUser.id || 0);

  return {
    id,
    name:
      rawUser.NAME && rawUser.LAST_NAME
        ? `${rawUser.NAME} ${rawUser.LAST_NAME}`.trim()
        : rawUser.FULL_NAME || rawUser.NAME || rawUser.name || "Usuario",
    firstName: rawUser.NAME || "",
    lastName: rawUser.LAST_NAME || "",
    email: rawUser.EMAIL || rawUser.email || "",
    raw: rawUser,
  };
}
```

## FILE: src/lib/server/api.js
```js
export async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function getQueryParam(url, key) {
  return new URL(url).searchParams.get(key);
}

export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value;
}
```

## FILE: src/lib/server/bitrix-rest.js
```js
import { requireEnv } from "./api.js";

function normalizeBaseUrl(base) {
  return base.endsWith("/") ? base : `${base}/`;
}

export async function callBitrix(method, params = {}) {
  const baseUrl = normalizeBaseUrl(requireEnv("BITRIX_WEBHOOK_BASE"));
  const url = `${baseUrl}${method}.json`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Bitrix devolviÃ³ ${response.status} ${response.statusText}: ${text}`
    );
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(
      `Bitrix error: ${data.error_description || data.error || "Error desconocido"}`
    );
  }

  return data.result;
}

export async function crmItemList(entityTypeId, params = {}) {
  return await callBitrix("crm.item.list", {
    entityTypeId,
    ...params,
  });
}

export async function crmItemGet(entityTypeId, id, params = {}) {
  return await callBitrix("crm.item.get", {
    entityTypeId,
    id: Number(id),
    ...params,
  });
}

export async function crmItemAdd(entityTypeId, fields) {
  return await callBitrix("crm.item.add", {
    entityTypeId,
    fields,
  });
}

export async function crmItemUpdate(entityTypeId, id, fields) {
  const result = await callBitrix("crm.item.update", {
    entityTypeId,
    id: Number(id),
    fields,
  });

  console.log("[bitrix-rest] crm.item.update raw result", {
    entityTypeId,
    id: Number(id),
    fields,
    result,
  });

  return result;
}

export async function crmItemFields(entityTypeId) {
  return await callBitrix("crm.item.fields", {
    entityTypeId,
  });
}
```

## FILE: src/lib/server/news-mapper.js
```js
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig.js";
import { normalizeTextEncoding } from "../utils/text.js";

const F = BITRIX_APP_CONFIG.FIELDS;

function normalizeBoolean(value) {
  if (
    value === true ||
    value === "Y" ||
    value === "y" ||
    value === "1" ||
    value === 1
  ) {
    return true;
  }

  return false;
}

function normalizeString(value) {
  if (value === undefined || value === null) return "";
  return normalizeTextEncoding(value).trim();
}

function normalizeNullableString(value) {
  const normalized = normalizeString(value);
  return normalized || null;
}

function normalizeDate(value) {
  const normalized = normalizeString(value);
  return normalized || null;
}

function splitPipeList(value) {
  const normalized = normalizeString(value);

  if (!normalized) return [];

  if (
    (normalized.startsWith("[") && normalized.endsWith("]")) ||
    (normalized.startsWith("{") && normalized.endsWith("}"))
  ) {
    try {
      const parsed = JSON.parse(normalized);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [normalized];
    }
  }

  return normalized
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
}

function joinPipeList(values) {
  if (!Array.isArray(values)) return "";
  return values
    .map((value) => normalizeString(value))
    .filter(Boolean)
    .join(" | ");
}

function getItemSources(item) {
  const sources = [];

  if (item && typeof item === "object") {
    sources.push(item);

    if (item.item && typeof item.item === "object") {
      sources.push(item.item);
    }

    if (item.fields && typeof item.fields === "object") {
      sources.push(item.fields);
    }

    if (item.item?.fields && typeof item.item.fields === "object") {
      sources.push(item.item.fields);
    }
  }

  return sources;
}

function getFieldCandidates(fieldName) {
  const normalized = normalizeString(fieldName);
  if (!normalized) return [];

  const candidates = new Set([
    normalized,
    normalized.toLowerCase(),
    normalized.toUpperCase(),
    normalized.charAt(0).toLowerCase() + normalized.slice(1),
  ]);

  const ufMatch = normalized.match(/^UF_CRM_(\d+)_(.+)$/i);
  if (ufMatch) {
    const [, entityId, suffix] = ufMatch;
    candidates.add(`ufCrm${entityId}_${suffix}`);
    candidates.add(`UF_CRM_${entityId}_${suffix}`);
  }

  return [...candidates];
}

function readFieldValue(item, fieldName) {
  const sources = getItemSources(item);
  const candidates = getFieldCandidates(fieldName);

  for (const source of sources) {
    for (const key of candidates) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const value = source[key];
        if (value !== undefined) {
          return value;
        }
      }
    }
  }

  return undefined;
}

function debugMappedItem(rawItem, mappedItem) {
  const keysToCheck = [
    F.BITRIX_TITLE,
    F.TITLE_ORIGINAL,
    F.SOURCE_SITE,
    F.SOURCE_URL,
    F.SUMMARY,
    F.CONTENT_TEXT,
    F.SYNC_STATUS,
    F.EDITOR_NOTES,
    F.REJECTION_REASON,
  ];

  const fieldPresence = Object.fromEntries(
    keysToCheck.map((fieldKey) => [fieldKey, readFieldValue(rawItem, fieldKey) !== undefined])
  );

  console.log("[news-mapper] bitrix item", {
    topLevelKeys: Object.keys(rawItem || {}).slice(0, 30),
    hasFieldsObject: Boolean(rawItem?.fields),
    hasNestedItem: Boolean(rawItem?.item),
    fieldPresence,
    mapped: {
      id: mappedItem.id,
      titleOriginal: mappedItem.titleOriginal,
      sourceSite: mappedItem.sourceSite,
      summary: mappedItem.summary,
      syncStatus: mappedItem.syncStatus,
    },
  });
}

export function fromBitrixItem(item) {
  const syncStatus = normalizeNullableString(readFieldValue(item, F.SYNC_STATUS));
  const titleOriginal =
    normalizeNullableString(readFieldValue(item, F.TITLE_ORIGINAL)) ||
    normalizeNullableString(readFieldValue(item, F.BITRIX_TITLE)) ||
    "";

  const mapped = {
    id: Number(
      readFieldValue(item, "id") ||
        readFieldValue(item, "ID") ||
        readFieldValue(item, "Id") ||
        0
    ),

    titleOriginal,
    sourceSite: normalizeNullableString(readFieldValue(item, F.SOURCE_SITE)),
    sourceId: normalizeNullableString(readFieldValue(item, F.SOURCE_ID)),
    sourceUrl: normalizeNullableString(readFieldValue(item, F.SOURCE_URL)),
    sourceSlug: normalizeNullableString(readFieldValue(item, F.SOURCE_SLUG)),

    featuredImageUrl: normalizeNullableString(readFieldValue(item, F.FEATURED_IMAGE_URL)),
    featuredImageLocalPath: normalizeNullableString(
      readFieldValue(item, F.FEATURED_IMAGE_LOCAL_PATH)
    ),
    finalPublicationUrl: normalizeNullableString(
      readFieldValue(item, F.FINAL_PUBLICATION_URL)
    ),
    contentHash: normalizeNullableString(readFieldValue(item, F.CONTENT_HASH)),

    syncStatus,
    syncError: normalizeNullableString(readFieldValue(item, F.SYNC_ERROR)),

    publishedAt: normalizeDate(readFieldValue(item, F.PUBLISHED_AT)),
    modifiedAt: normalizeDate(readFieldValue(item, F.MODIFIED_AT)),
    scrapedAt: normalizeDate(readFieldValue(item, F.SCRAPED_AT)),
    importedAt: normalizeDate(readFieldValue(item, F.IMPORTED_AT)),
    lastSyncAt: normalizeDate(readFieldValue(item, F.LAST_SYNC_AT)),
    uploadedAt: normalizeDate(readFieldValue(item, F.UPLOADED_AT)),

    summary: normalizeNullableString(readFieldValue(item, F.SUMMARY)),
    contentText: normalizeNullableString(readFieldValue(item, F.CONTENT_TEXT)),
    contentHtml: normalizeNullableString(readFieldValue(item, F.CONTENT_HTML)),

    headings: splitPipeList(readFieldValue(item, F.HEADINGS)),
    images: splitPipeList(readFieldValue(item, F.IMAGES)),

    editorNotes: normalizeNullableString(readFieldValue(item, F.EDITOR_NOTES)),
    rejectionReason: normalizeNullableString(readFieldValue(item, F.REJECTION_REASON)),
    readyToUpload: normalizeBoolean(readFieldValue(item, F.READY_TO_UPLOAD)),
    status: syncStatus,

    featuredImageFile:
      readFieldValue(item, F.FEATURED_IMAGE_FILE) !== undefined
        ? readFieldValue(item, F.FEATURED_IMAGE_FILE)
        : null,
  };

  debugMappedItem(item, mapped);

  return mapped;
}

export function toBitrixFields(payload = {}) {
  const fields = {};

  if (payload.titleOriginal !== undefined) {
    const normalizedTitle = normalizeString(payload.titleOriginal);
    fields[F.TITLE_ORIGINAL] = normalizedTitle;
    fields[F.BITRIX_TITLE] = normalizedTitle;
  }

  if (payload.sourceSite !== undefined) {
    fields[F.SOURCE_SITE] = normalizeString(payload.sourceSite);
  }

  if (payload.sourceId !== undefined) {
    fields[F.SOURCE_ID] = normalizeString(payload.sourceId);
  }

  if (payload.sourceUrl !== undefined) {
    fields[F.SOURCE_URL] = normalizeString(payload.sourceUrl);
  }

  if (payload.sourceSlug !== undefined) {
    fields[F.SOURCE_SLUG] = normalizeString(payload.sourceSlug);
  }

  if (payload.featuredImageUrl !== undefined) {
    fields[F.FEATURED_IMAGE_URL] = normalizeString(payload.featuredImageUrl);
  }

  if (payload.featuredImageLocalPath !== undefined) {
    fields[F.FEATURED_IMAGE_LOCAL_PATH] = normalizeString(
      payload.featuredImageLocalPath
    );
  }

  if (payload.finalPublicationUrl !== undefined) {
    fields[F.FINAL_PUBLICATION_URL] = normalizeString(
      payload.finalPublicationUrl
    );
  }

  if (payload.contentHash !== undefined) {
    fields[F.CONTENT_HASH] = normalizeString(payload.contentHash);
  }

  if (payload.syncStatus !== undefined) {
    fields[F.SYNC_STATUS] = normalizeString(payload.syncStatus);
  }

  if (payload.syncError !== undefined) {
    fields[F.SYNC_ERROR] = normalizeString(payload.syncError);
  }

  if (payload.publishedAt !== undefined) {
    fields[F.PUBLISHED_AT] = payload.publishedAt || "";
  }

  if (payload.modifiedAt !== undefined) {
    fields[F.MODIFIED_AT] = payload.modifiedAt || "";
  }

  if (payload.scrapedAt !== undefined) {
    fields[F.SCRAPED_AT] = payload.scrapedAt || "";
  }

  if (payload.importedAt !== undefined) {
    fields[F.IMPORTED_AT] = payload.importedAt || "";
  }

  if (payload.lastSyncAt !== undefined) {
    fields[F.LAST_SYNC_AT] = payload.lastSyncAt || "";
  }

  if (payload.uploadedAt !== undefined) {
    fields[F.UPLOADED_AT] = payload.uploadedAt || "";
  }

  if (payload.summary !== undefined) {
    fields[F.SUMMARY] = normalizeString(payload.summary);
  }

  if (payload.contentText !== undefined) {
    fields[F.CONTENT_TEXT] = normalizeString(payload.contentText);
  }

  if (payload.contentHtml !== undefined) {
    fields[F.CONTENT_HTML] = normalizeString(payload.contentHtml);
  }

  if (payload.headings !== undefined) {
    fields[F.HEADINGS] = Array.isArray(payload.headings)
      ? joinPipeList(payload.headings)
      : normalizeString(payload.headings);
  }

  if (payload.images !== undefined) {
    fields[F.IMAGES] = Array.isArray(payload.images)
      ? joinPipeList(payload.images)
      : normalizeString(payload.images);
  }

  if (payload.editorNotes !== undefined) {
    fields[F.EDITOR_NOTES] = normalizeString(payload.editorNotes);
  }

  if (payload.rejectionReason !== undefined) {
    fields[F.REJECTION_REASON] = normalizeString(payload.rejectionReason);
  }

  if (payload.readyToUpload !== undefined) {
    fields[F.READY_TO_UPLOAD] = payload.readyToUpload ? "Y" : "N";
  }

  if (payload.featuredImageFile !== undefined) {
    fields[F.FEATURED_IMAGE_FILE] = payload.featuredImageFile;
  }

  console.log("[news-mapper] toBitrixFields", {
    keys: Object.keys(fields),
    titleOriginal: fields[F.TITLE_ORIGINAL] || "",
    bitrixTitle: fields[F.BITRIX_TITLE] || "",
    summary: fields[F.SUMMARY] || "",
    syncStatus: fields[F.SYNC_STATUS] || "",
  });

  return fields;
}
```

## FILE: src/lib/server/news-service.js
```js
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig";
import {
  crmItemAdd,
  crmItemGet,
  crmItemList,
  crmItemUpdate,
} from "./bitrix-rest.js";
import { fromBitrixItem, toBitrixFields } from "./news-mapper.js";

const ENTITY_TYPE_ID = BITRIX_APP_CONFIG.ENTITY_TYPE_ID;

function summarizeItem(item) {
  if (!item || typeof item !== "object") return null;

  return {
    id: item.id || item.ID || null,
    title: item.title || item.TITLE || null,
    titleOriginal:
      item.ufCrm25_1776172315 ||
      item.UF_CRM_25_1776172315 ||
      item.title ||
      item.TITLE ||
      null,
    sourceSite:
      item.ufCrm25_1776172329 ||
      item.UF_CRM_25_1776172329 ||
      null,
    sourceId:
      item.ufCrm25_1776172343 ||
      item.UF_CRM_25_1776172343 ||
      null,
    sourceUrl:
      item.ufCrm25_1776172353 ||
      item.UF_CRM_25_1776172353 ||
      null,
    summary:
      item.ufCrm25_1776172633 ||
      item.UF_CRM_25_1776172633 ||
      null,
    contentText:
      item.ufCrm25_1776172680 ||
      item.UF_CRM_25_1776172680 ||
      null,
    contentHtml:
      item.ufCrm25_1776172691 ||
      item.UF_CRM_25_1776172691 ||
      null,
    syncStatus:
      item.ufCrm25_1776172478 ||
      item.UF_CRM_25_1776172478 ||
      null,
    editorNotes:
      item.ufCrm25_1776172726 ||
      item.UF_CRM_25_1776172726 ||
      null,
    rejectionReason:
      item.ufCrm25_1776172742 ||
      item.UF_CRM_25_1776172742 ||
      null,
  };
}

function debugBitrixResponse(label, result) {
  const items = Array.isArray(result?.items)
    ? result.items
    : Array.isArray(result?.item)
      ? result.item
      : result?.item
        ? [result.item]
        : result && typeof result === "object"
          ? [result]
          : [];

  console.log(`[news-service] ${label}`, {
    resultType: typeof result,
    resultKeys: Object.keys(result || {}),
    itemCount: items.length,
    firstItemKeys: Object.keys(items[0] || {}).slice(0, 80),
    firstItemSummary: summarizeItem(items[0]),
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeCompare(value) {
  return String(value ?? "").trim();
}

function itemMatchesPatch(item, patch = {}) {
  if (!item) return false;

  const checks = [];

  if (patch.titleOriginal !== undefined) {
    checks.push(normalizeCompare(item.titleOriginal) === normalizeCompare(patch.titleOriginal));
  }

  if (patch.summary !== undefined) {
    checks.push(normalizeCompare(item.summary) === normalizeCompare(patch.summary));
  }

  if (patch.contentText !== undefined) {
    checks.push(normalizeCompare(item.contentText) === normalizeCompare(patch.contentText));
  }

  if (patch.editorNotes !== undefined) {
    checks.push(normalizeCompare(item.editorNotes) === normalizeCompare(patch.editorNotes));
  }

  if (patch.syncStatus !== undefined) {
    checks.push(normalizeCompare(item.syncStatus) === normalizeCompare(patch.syncStatus));
  }

  if (patch.lastSyncAt !== undefined) {
    checks.push(Boolean(item.lastSyncAt));
  }

  return checks.length > 0 && checks.every(Boolean);
}

function mergeItemWithPatch(item, patch = {}) {
  return {
    ...item,
    titleOriginal:
      patch.titleOriginal !== undefined ? patch.titleOriginal : item.titleOriginal,
    summary: patch.summary !== undefined ? patch.summary : item.summary,
    contentText:
      patch.contentText !== undefined ? patch.contentText : item.contentText,
    editorNotes:
      patch.editorNotes !== undefined ? patch.editorNotes : item.editorNotes,
    syncStatus:
      patch.syncStatus !== undefined ? patch.syncStatus : item.syncStatus,
    status: patch.syncStatus !== undefined ? patch.syncStatus : item.status,
    lastSyncAt:
      patch.lastSyncAt !== undefined ? patch.lastSyncAt : item.lastSyncAt,
  };
}

async function getNewsByIdFresh(id, expectedPatch = null) {
  const maxAttempts = expectedPatch ? 4 : 1;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const result = await crmItemGet(ENTITY_TYPE_ID, id);
    debugBitrixResponse(`crm.item.get attempt ${attempt}`, result);

    const rawItem = result?.item || result;
    const mapped = fromBitrixItem(rawItem);

    if (!expectedPatch || itemMatchesPatch(mapped, expectedPatch)) {
      return mapped;
    }

    if (attempt < maxAttempts) {
      await sleep(250);
    }
  }

  const fallbackResult = await crmItemGet(ENTITY_TYPE_ID, id);
  const fallbackRawItem = fallbackResult?.item || fallbackResult;
  return fromBitrixItem(fallbackRawItem);
}

/**
 * @typedef {Object} ListNewsParams
 * @property {string=} syncStatus
 * @property {string=} search
 * @property {number=} start
 * @property {number=} limit
 */

/**
 * @param {ListNewsParams=} params
 */
export async function listNews(params = {}) {
  const { syncStatus, search, start = 0, limit = 50 } = params;

  const filter = {};

  if (syncStatus) {
    filter[BITRIX_APP_CONFIG.FIELDS.SYNC_STATUS] = syncStatus;
  }

  const result = await crmItemList(ENTITY_TYPE_ID, {
    filter,
    start: Number(start),
    order: {
      id: "desc",
    },
  });

  debugBitrixResponse("crm.item.list", result);

  const items = Array.isArray(result?.items) ? result.items : [];
  let mapped = items.map(fromBitrixItem);

  if (search) {
    const q = String(search).trim().toLowerCase();

    mapped = mapped.filter((item) => {
      const haystack = [
        item.id,
        item.titleOriginal,
        item.summary,
        item.contentText,
        item.sourceSite,
        item.sourceSlug,
        item.sourceUrl,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }

  return mapped.slice(0, Number(limit));
}

export async function getNewsById(id) {
  const mapped = await getNewsByIdFresh(id);

  console.log("[news-service] mapped single", {
    id: mapped.id,
    titleOriginal: mapped.titleOriginal,
    sourceSite: mapped.sourceSite,
    sourceId: mapped.sourceId,
    sourceUrl: mapped.sourceUrl,
    summary: mapped.summary,
    contentText: mapped.contentText,
    contentHtml: mapped.contentHtml,
    syncStatus: mapped.syncStatus,
    editorNotes: mapped.editorNotes,
    rejectionReason: mapped.rejectionReason,
    readyToUpload: mapped.readyToUpload,
  });

  return mapped;
}

export async function createNews(payload) {
  const now = new Date().toISOString();

  const fields = toBitrixFields({
    ...payload,
    scrapedAt: payload.scrapedAt || now,
    importedAt: payload.importedAt || now,
    lastSyncAt: payload.lastSyncAt || now,
    syncStatus:
      payload.syncStatus ||
      payload.status ||
      BITRIX_APP_CONFIG.STATUS.PENDIENTE,
  });

  const result = await crmItemAdd(ENTITY_TYPE_ID, fields);

  console.log("[news-service] crm.item.add result", {
    resultKeys: Object.keys(result || {}),
    itemId: result?.item?.id || result?.id || null,
    payloadKeys: Object.keys(fields),
  });

  return {
    id: Number(result?.item?.id || result?.id || 0),
  };
}

export async function updateNews(id, payload) {
  const now = new Date().toISOString();

  const fields = toBitrixFields({
    ...payload,
    syncStatus: BITRIX_APP_CONFIG.STATUS.EDITADA,
    lastSyncAt: now,
  });

  console.log("[news-service] crm.item.update payload", {
    id: Number(id),
    fieldKeys: Object.keys(fields),
    fieldsPreview: fields,
  });

  const updateResult = await crmItemUpdate(ENTITY_TYPE_ID, id, fields);

  console.log("[news-service] crm.item.update returned", {
    id: Number(id),
    updateResult,
  });

  const updated = await getNewsById(id);

  console.log("[news-service] crm.item.get after update", {
    id: Number(id),
    updatedSummary: updated.summary,
    updatedTitle: updated.titleOriginal,
    updatedContentStart: String(updated.contentText || "").slice(0, 120),
    updatedSyncStatus: updated.syncStatus,
    updatedLastSyncAt: updated.lastSyncAt,
  });

  return {
    ...updated,
    syncStatus: updated.syncStatus || BITRIX_APP_CONFIG.STATUS.EDITADA,
    status: updated.syncStatus || BITRIX_APP_CONFIG.STATUS.EDITADA,
    lastSyncAt: updated.lastSyncAt || now,
  };
}

export async function updateNewsStatus(id, syncStatus, rejectionReason = "") {
  const now = new Date().toISOString();

  const patch = {
    syncStatus,
    rejectionReason,
    lastSyncAt: now,
  };

  const fields = toBitrixFields(patch);

  console.log("[news-service] updateNewsStatus", {
    id: Number(id),
    syncStatus,
    rejectionReason,
    fieldKeys: Object.keys(fields),
    fieldsPreview: fields,
  });

  await crmItemUpdate(ENTITY_TYPE_ID, id, fields);

  const fresh = await getNewsByIdFresh(id, patch);
  const merged = mergeItemWithPatch(fresh, patch);

  return merged;
}
```

## FILE: src/lib/server/response.js
```js
export function json(data, init = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status: init.status || 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  });
}

export function badRequest(message, extra = {}) {
  return json(
    {
      ok: false,
      error: message,
      ...extra,
    },
    { status: 400 }
  );
}

export function serverError(message, extra = {}) {
  return json(
    {
      ok: false,
      error: message,
      ...extra,
    },
    { status: 500 }
  );
}
```

## FILE: src/lib/utils/text.js
```js
const MOJIBAKE_PATTERN =
  /(?:\u00C3.|\u00C2.|\u00E2.|\u00F0\u0178|\u00D0.|\u00D1.|\uFFFD|[\u00C2-\u00C3][\u0080-\u00BF])/;

function hasMojibake(value) {
  return MOJIBAKE_PATTERN.test(value);
}

function decodeLatin1AsUtf8(value) {
  const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0) & 0xff);
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export function normalizeTextEncoding(value) {
  if (value === undefined || value === null) return "";

  const text = String(value);
  if (!text || !hasMojibake(text)) {
    return text;
  }

  try {
    const decoded = decodeLatin1AsUtf8(text);

    if (!decoded || decoded === text) {
      return text;
    }

    const originalHits = (text.match(/\u00C3|\u00C2|\u00E2|\uFFFD/g) || []).length;
    const decodedHits = (decoded.match(/\u00C3|\u00C2|\u00E2|\uFFFD/g) || []).length;

    return decodedHits <= originalHits ? decoded : text;
  } catch {
    return text;
  }
}
```

## FILE: src/pages/api/health.ts
```ts
import type { APIRoute } from "astro";
import { json, serverError } from "../../lib/server/response.js";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    return json({
      ok: true,
      service: "bitrix-noticias-backend",
      entityTypeId: 1070,
      time: new Date().toISOString(),
    });
  } catch (error: any) {
    return serverError(error?.message || "Health check failed");
  }
};
```

## FILE: src/pages/api/news/create.ts
```ts
import type { APIRoute } from "astro";
import { createNews, getNewsById } from "../../../lib/server/news-service.js";
import { badRequest, json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return badRequest("Body JSON no v\u00E1lido");
    }

    if (!body.titleOriginal) {
      return badRequest("titleOriginal es obligatorio");
    }

    const created = await createNews(body);
    const item = await getNewsById(created.id);

    return json({
      ok: true,
      item,
    });
  } catch (error: any) {
    return serverError(error?.message || "No se pudo crear la noticia");
  }
};
```

## FILE: src/pages/api/news/debug-field.js
```js
import { crmItemFields } from "../../../lib/server/bitrix-rest.js";
import { BITRIX_APP_CONFIG } from "../../../config/bitrixConfig.js";
import { json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const GET = async () => {
  try {
    const fields = await crmItemFields(BITRIX_APP_CONFIG.ENTITY_TYPE_ID);

    return json({
      ok: true,
      type: typeof fields,
      isArray: Array.isArray(fields),
      keys: fields && typeof fields === "object" ? Object.keys(fields) : [],
      sample: fields,
    });
  } catch (error) {
    return serverError(error?.message || "No se pudo leer crm.item.fields");
  }
};
```

## FILE: src/pages/api/news/get.ts
```ts
import type { APIRoute } from "astro";
import { getNewsById } from "../../../lib/server/news-service.js";
import { badRequest, json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = Number(url.searchParams.get("id") || "0");

    if (!id) {
      return badRequest("Falta el par\u00E1metro id");
    }

    const item = await getNewsById(id);

    return json({
      ok: true,
      item,
    });
  } catch (error: any) {
    return serverError(error?.message || "No se pudo obtener la noticia");
  }
};
```

## FILE: src/pages/api/news/list.ts
```ts
import type { APIRoute } from "astro";
import { listNews } from "../../../lib/server/news-service.js";
import { json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);

    const status = url.searchParams.get("status") || "";
    const search = url.searchParams.get("search") || "";
    const start = Number(url.searchParams.get("start") || "0");
    const limit = Number(url.searchParams.get("limit") || "50");

    const items = await listNews({
      syncStatus: status,
      search,
      start,
      limit,
    });

    return json({
      ok: true,
      items,
      total: items.length,
    });
  } catch (error: any) {
    return serverError(error?.message || "No se pudo listar noticias");
  }
};
```

## FILE: src/pages/api/news/update.ts
```ts
import type { APIRoute } from "astro";
import { updateNews } from "../../../lib/server/news-service.js";
import { badRequest, json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return badRequest("Body JSON no vÃ¡lido");
    }

    const id = Number(body.id || 0);

    if (!id) {
      return badRequest("id es obligatorio");
    }

    const fields =
      body.fields && typeof body.fields === "object" ? body.fields : {};

    console.log("[api/news/update] request payload", {
      rawBody: body,
      id,
      fieldKeys: Object.keys(fields),
      fields,
    });

    const item = await updateNews(id, fields);

    return json({
      ok: true,
      item,
    });
  } catch (error: any) {
    return serverError(error?.message || "No se pudo actualizar la noticia");
  }
};
```

## FILE: src/pages/api/news/update-status.ts
```ts
import type { APIRoute } from "astro";
import { updateNews } from "../../../lib/server/news-service.js";
import { badRequest, json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return badRequest("Body JSON no v\u00E1lido");
    }

    const id = Number(body.id || 0);
    const status = String(body.status || body.syncStatus || "").trim();
    const rejectionReason = String(
      body.rejectionReason || body.reviewReason || ""
    ).trim();

    if (!id) {
      return badRequest("id es obligatorio");
    }

    if (!status) {
      return badRequest("status es obligatorio");
    }

    const item = await updateNews(id, { syncStatus: status, rejectionReason });

    return json({
      ok: true,
      item,
    });
  } catch (error: any) {
    return serverError(error?.message || "No se pudo actualizar el estado");
  }
};
```

## FILE: src/pages/bitrix-entry.ts
```ts
import type { APIRoute } from "astro";

export const prerender = false;

function toQueryString(data: Record<string, string>) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, value);
    }
  }

  return params.toString();
}

async function extractParams(request: Request) {
  const url = new URL(request.url);
  const result: Record<string, string> = {};

  for (const [key, value] of url.searchParams.entries()) {
    result[key] = value;
  }

  const contentType = request.headers.get("content-type") || "";

  if (request.method === "POST") {
    if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        result[key] = String(value);
      }
    } else if (contentType.includes("application/json")) {
      try {
        const json = await request.json();
        if (json && typeof json === "object") {
          for (const [key, value] of Object.entries(json)) {
            result[key] = String(value ?? "");
          }
        }
      } catch {
        // ignorar
      }
    } else {
      try {
        const text = await request.text();
        const bodyParams = new URLSearchParams(text);
        for (const [key, value] of bodyParams.entries()) {
          result[key] = value;
        }
      } catch {
        // ignorar
      }
    }
  }

  return result;
}

async function handleRequest(request: Request) {
  const params = await extractParams(request);
  const query = toQueryString(params);
  const currentUrl = new URL(request.url);
  const targetUrl = new URL("/", currentUrl);

  targetUrl.search = query;

  return Response.redirect(targetUrl, request.method === "POST" ? 303 : 302);
}

export const GET: APIRoute = async ({ request }) => handleRequest(request);
export const POST: APIRoute = async ({ request }) => handleRequest(request);
```

## FILE: src/pages/index.astro
```astro
---
import Layout from "../layouts/Layout.astro";
import NewsApp from "../components/news/NewsApp";
import "../styles/global.css";
---

<Layout title="Noticias IA">
  <NewsApp client:load />
</Layout>
```

## FILE: src/styles/global.css
```css
@import "tailwindcss";
```

## FILE: tsconfig.json
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [
    ".astro/types.d.ts",
    "**/*"
  ],
  "exclude": [
    "dist"
  ],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```
