# Project Dump For ChatGPT

## Resumen inicial

- Nombre del proyecto: dispositivos-perifericos
- Fecha y hora local de generación: 2026-04-15 12:22:45 +02:00
- Stack detectado: Astro, React, Vercel adapter, Tailwind CSS v4
- Estructura resumida de carpetas:
  - src/components/news
  - src/config
  - src/layouts
  - src/lib/bitrix
  - src/lib/server
  - src/lib/utils
  - src/pages
  - src/pages/api/news
  - src/styles
- Variables de entorno detectadas por nombre:
  - BITRIX_WEBHOOK_BASE=***REDACTED***
- Archivos ignorados o excluidos:
  - node_modules
  - .git
  - .astro
  - .vercel
  - package-lock.json (excluido por tamaño)
  - .env values (secretos redactados)
  - binarios e imágenes del proyecto (no incluidos)
- Breve explicación de la app: app local Bitrix24 con Astro + React desplegable en Vercel para listar noticias del SPA/CRM de Bitrix, ver detalle y ejecutar acciones editoriales sobre items de Smart Process.

## Árbol del proyecto

```txt
.
+-- .vscode
|   +-- extensions.json
|   \-- launch.json
+-- public
+-- src
|   +-- components
|   |   \-- news
|   |       +-- NewsApp.jsx
|   |       +-- NewsCard.jsx
|   |       +-- NewsDetail.jsx
|   |       +-- NewsSidebar.jsx
|   |       +-- NewsToolbar.jsx
|   |       \-- StatusBadge.jsx
|   +-- config
|   |   \-- bitrixConfig.js
|   +-- layouts
|   |   \-- Layout.astro
|   +-- lib
|   |   +-- bitrix
|   |   |   +-- bootstrap.js
|   |   |   +-- history.js
|   |   |   +-- install.js
|   |   |   +-- methods.js
|   |   |   +-- spa.js
|   |   |   \-- user.js
|   |   +-- server
|   |   |   +-- api.js
|   |   |   +-- bitrix-rest.js
|   |   |   +-- news-mapper.js
|   |   |   +-- news-service.js
|   |   |   \-- response.js
|   |   \-- utils
|   |       \-- text.js
|   +-- pages
|   |   +-- api
|   |   |   +-- news
|   |   |   |   +-- create.ts
|   |   |   |   +-- get.ts
|   |   |   |   +-- list.ts
|   |   |   |   +-- update.ts
|   |   |   |   \-- update-status.ts
|   |   |   \-- health.ts
|   |   +-- bitrix-entry.ts
|   |   \-- index.astro
|   \-- styles
|       \-- global.css
+-- .env
+-- .gitignore
+-- astro.config.mjs
+-- package.json
+-- README.md
\-- tsconfig.json
```

## Configuración detectada

- npm scripts:
  - dev: astro dev
  - build: astro build
  - preview: astro preview
  - astro: astro
- Adapter: `@astrojs/vercel`
- Integrations: `@astrojs/react`
- Vite/Tailwind: Tailwind CSS v4 vía `@tailwindcss/vite` en `astro.config.mjs`
- Rewrites / vercel.json: no existe en la raíz actual.
- ESLint: no se detecta configuración dedicada en la raíz actual.
- Prettier: no se detecta configuración dedicada en la raíz actual.
- Tailwind config: no se detecta `tailwind.config.*` en la raíz actual.
- PostCSS config: no se detecta `postcss.config.*` en la raíz actual.
- Variables públicas: no se detectan variables `PUBLIC_*` en `.env`.

## Contenido completo de archivos importantes

===== FILE: .gitignore =====
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


===== FILE: astro.config.mjs =====
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

===== FILE: package.json =====
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


===== FILE: README.md =====
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


===== FILE: src\components\news\NewsApp.jsx =====
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
            Esta aplicaci\u00F3n solo puede abrirse desde un portal Bitrix24 con un contexto
            v\u00E1lido de la app.
          </p>
        </div>
      </div>
    );
  }

  if (!bitrixReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600 shadow-sm">
          Iniciando aplicaci\u00F3n...
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


===== FILE: src\components\news\NewsCard.jsx =====
import StatusBadge from "./StatusBadge";

export default function NewsCard({ item, isSelected, onSelect }) {
  const status = item.syncStatus || item.status || "";
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
        <StatusBadge status={status} />
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


===== FILE: src\components\news\NewsDetail.jsx =====
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

  const status = item.syncStatus || item.status || "";
  const relevantDate =
    item.publishedAt || item.scrapedAt || item.importedAt || item.lastSyncAt || "-";

  return (
    <div className="flex h-full flex-col bg-slate-100">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="mb-3 flex items-center gap-3">
          <StatusBadge status={status} />
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
          <Block title="Resumen">
            {item.summary || "Sin resumen"}
          </Block>

          <Block title="Estado editorial">
            <div className="space-y-2">
              <div>
                <strong>Estado:</strong> {status || "Sin estado"}
              </div>
              <div>
                <strong>Lista para subir:</strong> {item.readyToUpload ? "S\u00ED" : "No"}
              </div>
              <div>
                <strong>\u00DAltima fecha relevante:</strong> {relevantDate}
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
                <strong>Fecha publicaci\u00F3n:</strong> {item.publishedAt || "-"}
              </li>
              <li>
                <strong>Fecha scraping:</strong> {item.scrapedAt || "-"}
              </li>
              <li>
                <strong>Fecha importaci\u00F3n:</strong> {item.importedAt || "-"}
              </li>
              <li>
                <strong>\u00DAltima sincronizaci\u00F3n:</strong> {item.lastSyncAt || "-"}
              </li>
              <li>
                <strong>Error de sincronizaci\u00F3n:</strong> {item.syncError || "-"}
              </li>
            </ul>
          </Block>
        </div>
      </div>
    </div>
  );
}


===== FILE: src\components\news\NewsSidebar.jsx =====
import NewsCard from "./NewsCard";

export default function NewsSidebar({
  items,
  selectedItem,
  onSelect,
  loading,
  error,
}) {
  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-slate-50">
      <div className="border-b border-slate-200 px-4 py-4">
        <h2 className="text-lg font-semibold text-slate-900">Noticias</h2>
        <p className="mt-1 text-sm text-slate-500">
          Listado real de noticias disponibles en el SPA de Bitrix24.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
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
            No hay noticias disponibles en el SPA.
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
    </aside>
  );
}


===== FILE: src\components\news\NewsToolbar.jsx =====
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


===== FILE: src\components\news\StatusBadge.jsx =====
const STATUS_STYLES = {
  pendiente: "bg-slate-100 text-slate-700 border-slate-200",
  generando: "bg-amber-100 text-amber-800 border-amber-200",
  generada: "bg-blue-100 text-blue-800 border-blue-200",
  revisar: "bg-orange-100 text-orange-800 border-orange-200",
  aprobada: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rechazada: "bg-rose-100 text-rose-800 border-rose-200",
  "error ia": "bg-red-100 text-red-800 border-red-200",
  subida: "bg-cyan-100 text-cyan-800 border-cyan-200",
};

export default function StatusBadge({ status }) {
  const safeStatus = String(status || "Pendiente").trim();
  const normalizedStatus = safeStatus.toLowerCase();
  const className =
    STATUS_STYLES[normalizedStatus] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {safeStatus}
    </span>
  );
}


===== FILE: src\config\bitrixConfig.js =====
export const BITRIX_APP_CONFIG = {
  APP_NAME: "App local noticias",
  ENTITY_TYPE_ID: 1070,

  STATUS: {
    PENDIENTE: "Pendiente",
    GENERANDO: "Generando",
    GENERADA: "Generada",
    REVISAR: "Revisar",
    APROBADA: "Aprobada",
    RECHAZADA: "Rechazada",
    ERROR_IA: "Error IA",
    SUBIDA: "Subida",
  },

  FIELDS: {
    BITRIX_TITLE: "title",

    TITLE_ORIGINAL: "UF_CRM_25_1776172315",
    SOURCE_SITE: "UF_CRM_25_1776172329",
    SOURCE_ID: "UF_CRM_25_1776172343",
    SOURCE_URL: "UF_CRM_25_1776172353",
    SOURCE_SLUG: "UF_CRM_25_1776172366",

    FEATURED_IMAGE_URL: "UF_CRM_25_1776172413",
    FEATURED_IMAGE_LOCAL_PATH: "UF_CRM_25_1776172428",
    FINAL_PUBLICATION_URL: "UF_CRM_25_1776172447",
    CONTENT_HASH: "UF_CRM_25_1776172463",
    SYNC_STATUS: "UF_CRM_25_1776172478",
    SYNC_ERROR: "UF_CRM_25_1776172491",

    PUBLISHED_AT: "UF_CRM_25_1776172502",
    MODIFIED_AT: "UF_CRM_25_1776172524",
    SCRAPED_AT: "UF_CRM_25_1776172541",
    IMPORTED_AT: "UF_CRM_25_1776172560",
    LAST_SYNC_AT: "UF_CRM_25_1776172599",
    UPLOADED_AT: "UF_CRM_25_1776172614",

    SUMMARY: "UF_CRM_25_1776172633",
    CONTENT_TEXT: "UF_CRM_25_1776172680",
    CONTENT_HTML: "UF_CRM_25_1776172691",
    HEADINGS: "UF_CRM_25_1776172701",
    IMAGES: "UF_CRM_25_1776172714",

    EDITOR_NOTES: "UF_CRM_25_1776172726",
    REJECTION_REASON: "UF_CRM_25_1776172742",
    READY_TO_UPLOAD: "UF_CRM_25_1776172770",
    FEATURED_IMAGE_FILE: "UF_CRM_25_1776172784",
  },
};


===== FILE: src\layouts\Layout.astro =====
---
const { title = "Noticias IA" } = Astro.props;
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
  </head>
  <body class="min-h-screen bg-slate-100 text-slate-900">
    <slot />
  </body>
</html>


===== FILE: src\lib\bitrix\bootstrap.js =====
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
  const params = getQueryParams();
  const matchedQueryKeys = BITRIX_QUERY_KEYS.filter((key) => {
    const value = params.get(key);
    return value !== null && String(value).trim() !== "";
  });
  const bx24Available = hasBX24();
  const insideIframe = safeIsInsideIframe();
  const referrer = safeGetReferrer();
  const bitrixReferrer = hasBitrixReferrer(referrer);
  const domain = params.get("DOMAIN") || "";
  const placement = normalizeValue(params.get("PLACEMENT"));
  const installFlag = normalizeValue(params.get("install"));
  const strongQuerySignal =
    matchedQueryKeys.includes("DOMAIN") ||
    matchedQueryKeys.includes("AUTH_ID") ||
    matchedQueryKeys.includes("APP_SID");
  const hasQuerySignals = matchedQueryKeys.length > 0;
  const iframeSignal = insideIframe && (bitrixReferrer || hasQuerySignals);
  const probableBitrix = bx24Available || strongQuerySignal || iframeSignal;

  return {
    params,
    bx24Available,
    matchedQueryKeys,
    hasQuerySignals,
    strongQuerySignal,
    insideIframe,
    referrer,
    bitrixReferrer,
    iframeSignal,
    probableBitrix,
    domain,
    placement,
    installFlag,
  };
}

export function isInsideBitrix() {
  return getBitrixContextSnapshot().probableBitrix;
}

export function isInstallMode() {
  const { placement, installFlag } = getBitrixContextSnapshot();
  return placement.includes("install") || isTruthyInstallFlag(installFlag);
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
      reject(new Error("BX24 no esta disponible"));
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


===== FILE: src\lib\bitrix\history.js =====
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


===== FILE: src\lib\bitrix\install.js =====
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


===== FILE: src\lib\bitrix\methods.js =====
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

===== FILE: src\lib\bitrix\spa.js =====
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

===== FILE: src\lib\bitrix\user.js =====
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

===== FILE: src\lib\server\api.js =====
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

===== FILE: src\lib\server\bitrix-rest.js =====
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
      `Bitrix devolvi\u00F3 ${response.status} ${response.statusText}: ${text}`
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

export async function crmItemGet(entityTypeId, id) {
  return await callBitrix("crm.item.get", {
    entityTypeId,
    id: Number(id),
  });
}

export async function crmItemAdd(entityTypeId, fields) {
  return await callBitrix("crm.item.add", {
    entityTypeId,
    fields,
  });
}

export async function crmItemUpdate(entityTypeId, id, fields) {
  return await callBitrix("crm.item.update", {
    entityTypeId,
    id: Number(id),
    fields,
  });
}

export async function crmItemFields(entityTypeId) {
  return await callBitrix("crm.item.fields", {
    entityTypeId,
  });
}


===== FILE: src\lib\server\news-mapper.js =====
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

  const camelCase = normalized
    .toLowerCase()
    .replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());
  const lowerCase = normalized.toLowerCase();
  const upperCase = normalized.toUpperCase();
  const firstLower = normalized.charAt(0).toLowerCase() + normalized.slice(1);

  return [...new Set([normalized, camelCase, lowerCase, upperCase, firstLower])];
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
    fields[F.TITLE_ORIGINAL] = normalizeString(payload.titleOriginal);
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
    summary: fields[F.SUMMARY] || "",
    syncStatus: fields[F.SYNC_STATUS] || "",
  });

  return fields;
}


===== FILE: src\lib\server\news-service.js =====
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig.js";
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
      item.ufCrm25_1776172315 || item.UF_CRM_25_1776172315 || null,
    sourceSite:
      item.ufCrm25_1776172329 || item.UF_CRM_25_1776172329 || null,
    summary:
      item.ufCrm25_1776172633 || item.UF_CRM_25_1776172633 || null,
    syncStatus:
      item.ufCrm25_1776172478 || item.UF_CRM_25_1776172478 || null,
  };
}

function debugBitrixResponse(label, result) {
  const items = Array.isArray(result?.items)
    ? result.items
    : Array.isArray(result?.item)
      ? result.item
      : result?.item
        ? [result.item]
        : [];

  console.log(`[news-service] ${label}`, {
    resultKeys: Object.keys(result || {}),
    itemCount: items.length,
    firstItemKeys: Object.keys(items[0] || {}).slice(0, 40),
    firstItemSummary: summarizeItem(items[0]),
  });
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

  console.log(
    "[news-service] mapped list sample",
    mapped.slice(0, 3).map((item) => ({
      id: item.id,
      titleOriginal: item.titleOriginal,
      summary: item.summary,
      sourceSite: item.sourceSite,
      syncStatus: item.syncStatus,
    }))
  );

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
  const result = await crmItemGet(ENTITY_TYPE_ID, id);

  debugBitrixResponse("crm.item.get", result);

  const rawItem = result?.item || result;
  const mapped = fromBitrixItem(rawItem);

  console.log("[news-service] mapped single", {
    id: mapped.id,
    titleOriginal: mapped.titleOriginal,
    summary: mapped.summary,
    sourceSite: mapped.sourceSite,
    syncStatus: mapped.syncStatus,
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
  });

  return {
    id: Number(result?.item?.id || result?.id || 0),
  };
}

export async function updateNews(id, payload) {
  const fields = toBitrixFields(payload);

  console.log("[news-service] crm.item.update payload", {
    id: Number(id),
    fieldKeys: Object.keys(fields),
  });

  await crmItemUpdate(ENTITY_TYPE_ID, id, fields);
  return await getNewsById(id);
}

export async function updateNewsStatus(id, syncStatus, rejectionReason = "") {
  const fields = toBitrixFields({
    syncStatus,
    rejectionReason,
    lastSyncAt: new Date().toISOString(),
  });

  console.log("[news-service] updateNewsStatus", {
    id: Number(id),
    syncStatus,
    rejectionReason,
    fieldKeys: Object.keys(fields),
  });

  await crmItemUpdate(ENTITY_TYPE_ID, id, fields);
  return await getNewsById(id);
}


===== FILE: src\lib\server\response.js =====
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

===== FILE: src\lib\utils\text.js =====
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


===== FILE: src\pages\api\health.ts =====
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

===== FILE: src\pages\api\news\create.ts =====
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


===== FILE: src\pages\api\news\get.ts =====
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


===== FILE: src\pages\api\news\list.ts =====
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

===== FILE: src\pages\api\news\update.ts =====
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

    if (!id) {
      return badRequest("id es obligatorio");
    }

    const fields =
      body.fields && typeof body.fields === "object" ? body.fields : {};

    const item = await updateNews(id, fields);

    return json({
      ok: true,
      item,
    });
  } catch (error: any) {
    return serverError(error?.message || "No se pudo actualizar la noticia");
  }
};


===== FILE: src\pages\api\news\update-status.ts =====
import type { APIRoute } from "astro";
import { updateNewsStatus } from "../../../lib/server/news-service.js";
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

    const item = await updateNewsStatus(id, status, rejectionReason);

    return json({
      ok: true,
      item,
    });
  } catch (error: any) {
    return serverError(error?.message || "No se pudo actualizar el estado");
  }
};


===== FILE: src\pages\bitrix-entry.ts =====
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

===== FILE: src\pages\index.astro =====
---
import Layout from "../layouts/Layout.astro";
import NewsApp from "../components/news/NewsApp";
import "../styles/global.css";
---

<Layout title="Noticias IA">
  <NewsApp client:load />
</Layout>


===== FILE: src\styles\global.css =====
@import "tailwindcss";

===== FILE: tsconfig.json =====
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

## Problemas conocidos

- Integración Bitrix/BX24: la app depende de embed real en Bitrix24 y del contexto inyectado; fuera de Bitrix muestra acceso denegado.
- Shape real de Bitrix SPA: `crm.item.list` devuelve `result.items[]` y `crm.item.get` devuelve `result.item`, con UFs planos; esto fue una fuente de fallos de mapeo.
- Campos del SPA: el título custom `UF_CRM_25_1776172315` puede venir vacío y se usa fallback a `title` estándar de Bitrix.
- UTF-8 / encoding: hubo mojibake en textos y se añadió una utilidad de normalización en `src/lib/utils/text.js`.
- API/news: el frontend ya consume `/api/news/list` y acciones reales de `/api/news/update-status`; si el backend falla se muestran estados de error/vacío.
- Build Astro: anteriormente hubo un fallo de build relacionado con `astro/entrypoints/prerender` según el historial reciente.
- Logs temporales: `news-service.js` y `news-mapper.js` contienen logs de depuración del shape de Bitrix y del objeto mapeado.
