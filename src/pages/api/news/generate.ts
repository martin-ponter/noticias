import type { APIRoute } from "astro";
import { generateNewsChannels } from "../../../lib/server/openai.js";
import { getNewsById, updateNews } from "../../../lib/server/news-service.js";
import { badRequest, json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

function normalizeChannels(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => String(entry || "").trim().toLowerCase())
    .filter((entry) => entry === "web" || entry === "linkedin");
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return badRequest("Body JSON no válido");
    }

    const id = Number((body as any).id || 0);
    const channels = normalizeChannels((body as any).channels);
    const prompts =
      (body as any).prompts && typeof (body as any).prompts === "object"
        ? (body as any).prompts
        : {};

    if (!id) {
      return badRequest("id es obligatorio");
    }

    if (channels.length === 0) {
      return badRequest("Debe indicarse al menos un canal");
    }

    const currentItem = await getNewsById(id);
    const { patch, results } = await generateNewsChannels(currentItem, {
      channels,
      prompts,
    });

    const item = await updateNews(id, patch);
    const errors = Object.values(results)
      .map((result: any) => result?.error || "")
      .filter(Boolean);

    return json({
      ok: true,
      item,
      results,
      hasErrors: errors.length > 0,
      errorSummary: errors.join(" | "),
    });
  } catch (error: any) {
    return serverError(error?.message || "No se pudo generar el contenido IA");
  }
};
