import { requireEnv } from "./api.js";

const ALLOWED_MANUAL_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];
const MAX_MANUAL_IMAGE_SIZE = 5 * 1024 * 1024;

function normalizeBaseUrl(value) {
  const normalized = String(value || "").trim();
  if (!normalized) {
    throw new Error("Falta la variable de entorno WP_URL");
  }

  return normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
}

function buildAuthHeaders(extraHeaders = {}) {
  const username = requireEnv("WP_USERNAME");
  const password = requireEnv("WP_PASSWORD");
  const appName = requireEnv("WP_APP_NAME");
  const token = Buffer.from(`${username}:${password}`).toString("base64");

  return {
    Authorization: `Basic ${token}`,
    "User-Agent": appName,
    ...extraHeaders,
  };
}

async function parseWordPressError(response) {
  const text = await response.text();

  try {
    const parsed = JSON.parse(text);
    if (parsed?.message) {
      return parsed.message;
    }
  } catch {
    return text || response.statusText;
  }

  return text || response.statusText;
}

async function fetchWordPress(path, init = {}) {
  const baseUrl = normalizeBaseUrl(requireEnv("WP_URL"));
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: buildAuthHeaders(init.headers || {}),
  });

  if (!response.ok) {
    const details = await parseWordPressError(response);
    throw new Error(`WordPress devolvió ${response.status}: ${details}`);
  }

  return response;
}

function sanitizeFilename(filename, fallback = "imagen.jpg") {
  const normalized = String(filename || "").trim() || fallback;
  return normalized.replace(/[^\w.\-]+/g, "-");
}

function detectContentType(filename, fallback = "image/jpeg") {
  const lower = String(filename || "").toLowerCase();

  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".avif")) return "image/avif";
  return fallback;
}

async function uploadMediaBuffer(buffer, { filename, contentType, altText = "" }) {
  const safeFilename = sanitizeFilename(filename);
  const response = await fetchWordPress("/wp-json/wp/v2/media", {
    method: "POST",
    headers: {
      "Content-Disposition": `attachment; filename="${safeFilename}"`,
      "Content-Type": contentType || detectContentType(safeFilename),
    },
    body: buffer,
  });

  const media = await response.json();

  if (altText) {
    try {
      await fetchWordPress(`/wp-json/wp/v2/media/${media.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alt_text: altText,
        }),
      });
    } catch (error) {
      console.warn("[wordpress] No se pudo guardar alt_text de la imagen", error);
    }
  }

  return media;
}

export async function uploadMediaFromUrl(imageUrl, options = {}) {
  const response = await fetch(imageUrl);

  if (!response.ok) {
    throw new Error(
      `No se pudo descargar la imagen original (${response.status} ${response.statusText})`
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  const url = new URL(imageUrl);
  const pathname = url.pathname.split("/").filter(Boolean);
  const rawFilename = pathname[pathname.length - 1] || "imagen-original.jpg";
  const contentType =
    response.headers.get("content-type") || detectContentType(rawFilename);

  return uploadMediaBuffer(Buffer.from(arrayBuffer), {
    filename: options.filename || rawFilename,
    contentType,
    altText: options.altText,
  });
}

export async function uploadMediaFromFile(file, options = {}) {
  if (!(file instanceof File) || Number(file.size || 0) <= 0) {
    throw new Error("No se recibió una imagen manual válida");
  }

  if (!ALLOWED_MANUAL_IMAGE_TYPES.includes(file.type)) {
    throw new Error("La imagen manual debe ser JPG, PNG, WEBP, GIF o AVIF");
  }

  if (Number(file.size || 0) > MAX_MANUAL_IMAGE_SIZE) {
    throw new Error("La imagen manual no puede superar los 5 MB");
  }

  const arrayBuffer = await file.arrayBuffer();

  return uploadMediaBuffer(Buffer.from(arrayBuffer), {
    filename: options.filename || file.name || "imagen-manual.jpg",
    contentType: file.type || detectContentType(file.name || ""),
    altText: options.altText,
  });
}

export async function createDraftPost(payload) {
  const response = await fetchWordPress("/wp-json/wp/v2/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: payload.title,
      excerpt: payload.excerpt || "",
      content: payload.content,
      status: "draft",
      ...(payload.featuredMediaId ? { featured_media: payload.featuredMediaId } : {}),
    }),
  });

  return await response.json();
}

export async function publishNewsToWordPress({
  title,
  excerpt,
  content,
  originalImageUrl,
  manualImageFile,
  imageSource = "none",
}) {
  let media = null;

  if (imageSource === "original") {
    if (!originalImageUrl) {
      throw new Error("La noticia no tiene una imagen original utilizable");
    }

    media = await uploadMediaFromUrl(originalImageUrl, {
      altText: title,
    });
  }

  if (imageSource === "manual") {
    if (!manualImageFile) {
      throw new Error("No se recibió la imagen manual");
    }

    media = await uploadMediaFromFile(manualImageFile, {
      altText: title,
    });
  }

  const post = await createDraftPost({
    title,
    excerpt,
    content,
    featuredMediaId: media?.id || null,
  });

  return {
    post,
    media,
  };
}
