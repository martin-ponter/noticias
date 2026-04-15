import type { APIRoute } from "astro";
import { updateNews } from "../../../lib/server/news-service.js";
import { badRequest, json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return badRequest("Body JSON no válido");
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