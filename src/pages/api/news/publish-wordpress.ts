import type { APIRoute } from "astro";
import { BITRIX_APP_CONFIG } from "../../../config/bitrixConfig";
import { isUploadedToWordPress } from "../../../lib/news/wordpressUpload.js";
import {
  applyNewsPatch,
  getNewsById,
} from "../../../lib/server/news-service.js";
import { badRequest, json, serverError } from "../../../lib/server/response.js";
import {
  normalizeWordPressContent,
  publishNewsToWordPress,
} from "../../../lib/server/wordpress.js";

export const prerender = false;

const ALLOWED_MANUAL_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];
const MAX_MANUAL_IMAGE_SIZE = 5 * 1024 * 1024;

function normalizeValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function buildWordPressPayload(item: any, contentSource: string) {
  if (contentSource === "ai") {
    if (!String(item?.aiWebContent || "").trim()) {
      throw new Error("Para subir con IA web, aiWebContent es obligatorio");
    }

    return {
      title: String(item?.aiWebTitle || item?.titleOriginal || "").trim(),
      content: normalizeWordPressContent(
        String(item?.aiWebContent || "").trim(),
        "ai"
      ),
    };
  }

  if (contentSource === "original") {
    if (!String(item?.contentText || "").trim()) {
      throw new Error("Para subir contenido original, contentText es obligatorio");
    }

    return {
      title: String(item?.titleOriginal || "").trim(),
      content: normalizeWordPressContent(
        String(item?.contentText || "").trim(),
        "original"
      ),
    };
  }

  throw new Error("contentSource no válido");
}

export const POST: APIRoute = async ({ request }) => {
  let approvedItem: any = null;

  try {
    const formData = await request.formData();
    const id = Number(normalizeValue(formData.get("id")) || "0");
    const contentSource = normalizeValue(formData.get("contentSource"));
    const imageSource = normalizeValue(formData.get("imageSource")) || "none";
    const manualImage = formData.get("manualImage");

    if (!id) {
      return badRequest("id es obligatorio");
    }

    if (!["ai", "original"].includes(contentSource)) {
      return badRequest('contentSource debe ser "ai" o "original"');
    }

    if (!["original", "manual", "none"].includes(imageSource)) {
      return badRequest('imageSource debe ser "original", "manual" o "none"');
    }

    if (imageSource === "manual") {
      const isValidFile =
        manualImage instanceof File && Number(manualImage.size || 0) > 0;

      if (!isValidFile) {
        return badRequest("Debes adjuntar una imagen manual válida");
      }
    }

    const item = await getNewsById(id);

    if (isUploadedToWordPress(item)) {
      return badRequest("Esta noticia ya ha sido subida a WordPress");
    }

    const wpPayload = buildWordPressPayload(item, contentSource);

    if (imageSource === "original" && !String(item?.featuredImageUrl || "").trim()) {
      return badRequest("Esta noticia no tiene foto original disponible");
    }

    if (imageSource === "manual") {
      const file = manualImage instanceof File ? manualImage : null;

      if (!file || Number(file.size || 0) <= 0) {
        return badRequest("No se recibió una imagen manual válida");
      }

      if (!ALLOWED_MANUAL_IMAGE_TYPES.includes(file.type)) {
        return badRequest("La imagen manual debe ser JPG, PNG, WEBP, GIF o AVIF");
      }

      if (Number(file.size || 0) > MAX_MANUAL_IMAGE_SIZE) {
        return badRequest("La imagen manual no puede superar los 5 MB");
      }
    }

    approvedItem = await applyNewsPatch(id, {
      syncStatus: BITRIX_APP_CONFIG.STATUS.APROBADA,
      rejectionReason: "",
      syncError: "",
      lastSyncAt: new Date().toISOString(),
    });

    const { post } = await publishNewsToWordPress({
      ...wpPayload,
      contentSource,
      originalImageUrl: item?.featuredImageUrl || "",
      manualImageFile: manualImage instanceof File ? manualImage : null,
      imageSource,
    });

    const publishedItem = await applyNewsPatch(id, {
      syncStatus: BITRIX_APP_CONFIG.STATUS.SUBIDA,
      syncError: "",
      uploadedAt: new Date().toISOString(),
      finalPublicationUrl: post?.link || post?.guid?.rendered || "",
      lastSyncAt: new Date().toISOString(),
    });

    return json({
      ok: true,
      item: publishedItem,
      wordpress: {
        postId: post?.id || null,
        postUrl: post?.link || post?.guid?.rendered || "",
        status: post?.status || "draft",
      },
    });
  } catch (error: any) {
    const message = error?.message || "No se pudo subir la noticia a WordPress";

    if (approvedItem?.id) {
      try {
        const currentItem = await applyNewsPatch(approvedItem.id, {
          syncError: message,
          lastSyncAt: new Date().toISOString(),
        });

        return serverError(message, {
          item: currentItem,
        });
      } catch (patchError: any) {
        return serverError(message, {
          item: approvedItem,
          patchError:
            patchError?.message ||
            "No se pudo registrar el error de subida en Bitrix",
        });
      }
    }

    return serverError(message);
  }
};