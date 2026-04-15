import type { APIRoute } from "astro";
import { createNews, getNewsById } from "../../../lib/server/news-service.js";
import { badRequest, json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return badRequest("Body JSON no válido");
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