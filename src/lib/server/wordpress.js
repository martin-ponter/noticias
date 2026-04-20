import { requireEnv } from "./api.js";

const ALLOWED_MANUAL_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];
const MAX_MANUAL_IMAGE_SIZE = 5 * 1024 * 1024;
const PONTER_CLINIC_SLUG = "ponter-clinic";
const PONTER_CLINIC_NAME = "Ponter Clinic";

let cachedPonterClinicCategoryId = null;

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

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function normalizePlainTextToHtml(value) {
  const normalized = String(value || "").replace(/\r\n/g, "\n").trim();
  if (!normalized) return "";

  return normalized
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`)
    .join("\n");
}

function sanitizeAllowedHtml(html) {
  let sanitized = String(html || "").replace(/\r\n/g, "\n").trim();

  sanitized = sanitized.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  sanitized = sanitized.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  sanitized = sanitized.replace(/<\s*b\b[^>]*>/gi, "<strong>");
  sanitized = sanitized.replace(/<\s*\/\s*b\s*>/gi, "</strong>");

  sanitized = sanitized.replace(/<\s*p\b[^>]*>/gi, "<p>");
  sanitized = sanitized.replace(/<\s*\/\s*p\s*>/gi, "</p>");
  sanitized = sanitized.replace(/<\s*h2\b[^>]*>/gi, "<h2>");
  sanitized = sanitized.replace(/<\s*\/\s*h2\s*>/gi, "</h2>");
  sanitized = sanitized.replace(/<\s*strong\b[^>]*>/gi, "<strong>");
  sanitized = sanitized.replace(/<\s*\/\s*strong\s*>/gi, "</strong>");
  sanitized = sanitized.replace(/<\s*br\s*\/?\s*>/gi, "<br>");

  sanitized = sanitized.replace(/<(?!\/?(p|h2|strong|br)\b)[^>]+>/gi, "");
  sanitized = sanitized.replace(/<p>\s*(?:<br>\s*)*<\/p>/gi, "");
  sanitized = sanitized.replace(/<h2>\s*<\/h2>/gi, "");

  return sanitized.trim();
}

function stripHtml(value) {
  return String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function normalizeWordPressContent(content, contentSource = "ai") {
  const normalizedSource = String(contentSource || "ai").trim().toLowerCase();
  const rawContent = String(content || "").trim();

  if (!rawContent) {
    throw new Error("El contenido está vacío y no se puede subir a WordPress");
  }

  const hasHtmlTags = /<[^>]+>/.test(rawContent);
  const baseHtml =
    normalizedSource === "original" && !hasHtmlTags
      ? normalizePlainTextToHtml(rawContent)
      : rawContent;

  const sanitized = sanitizeAllowedHtml(baseHtml);
  const plainText = stripHtml(sanitized);

  if (plainText.length < 80) {
    throw new Error("El contenido es demasiado corto o no tiene estructura suficiente para WordPress");
  }

  if (normalizedSource === "ai" && !/<h2>/i.test(sanitized)) {
    throw new Error("El contenido IA web debe incluir subtítulos H2 antes de subirlo a WordPress");
  }

  return sanitized;
}

async function findCategoryBySlug() {
  const response = await fetchWordPress(
    `/wp-json/wp/v2/categories?slug=${encodeURIComponent(PONTER_CLINIC_SLUG)}&per_page=100`
  );
  const categories = await response.json();
  return Array.isArray(categories) ? categories[0] || null : null;
}

async function findCategoryByName() {
  const response = await fetchWordPress(
    `/wp-json/wp/v2/categories?search=${encodeURIComponent(PONTER_CLINIC_NAME)}&per_page=100`
  );
  const categories = await response.json();

  if (!Array.isArray(categories)) {
    return null;
  }

  return (
    categories.find((category) => String(category?.name || "").trim() === PONTER_CLINIC_NAME) ||
    null
  );
}

export async function getPonterClinicCategoryId() {
  if (cachedPonterClinicCategoryId) {
    return cachedPonterClinicCategoryId;
  }

  const bySlug = await findCategoryBySlug();
  if (bySlug?.id) {
    cachedPonterClinicCategoryId = bySlug.id;
    return cachedPonterClinicCategoryId;
  }

  const byName = await findCategoryByName();
  if (byName?.id) {
    cachedPonterClinicCategoryId = byName.id;
    return cachedPonterClinicCategoryId;
  }

  throw new Error('No se encontró la categoría "Ponter Clinic" en WordPress');
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
  const categoryId = await getPonterClinicCategoryId();

  const response = await fetchWordPress("/wp-json/wp/v2/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: payload.title,
      content: payload.content,
      status: "draft",
      categories: [categoryId],
      ...(payload.featuredMediaId ? { featured_media: payload.featuredMediaId } : {}),
    }),
  });

  return await response.json();
}

export async function publishNewsToWordPress({
  title,
  excerpt,
  content,
  contentSource = "ai",
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

  const normalizedContent = normalizeWordPressContent(content, contentSource);

  const post = await createDraftPost({
    title,
    excerpt,
    content: normalizedContent,
    featuredMediaId: media?.id || null,
  });

  return {
    post,
    media,
    normalizedContent,
  };
}
