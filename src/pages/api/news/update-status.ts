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
