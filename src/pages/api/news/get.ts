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
