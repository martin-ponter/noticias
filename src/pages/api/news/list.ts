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