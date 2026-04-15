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