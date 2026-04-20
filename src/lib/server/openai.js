import OpenAI from "openai";
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig.js";
import {
  DEFAULT_LINKEDIN_PROMPT,
  DEFAULT_WEB_PROMPT,
  buildSourceContext,
} from "../news/aiPromptTemplates.js";
import { requireEnv } from "./api.js";

const DEFAULT_OPENAI_MODEL = "gpt-5-mini";

function getOpenAIClient() {
  return new OpenAI({
    apiKey: requireEnv("OPENAI_API_KEY"),
  });
}

function getOpenAIModel() {
  return String(process.env.OPENAI_MODEL || "").trim() || DEFAULT_OPENAI_MODEL;
}

function buildOpenAIInput(prompt, item) {
  const context = buildSourceContext(item);

  return [
    prompt,
    "",
    "Contexto de entrada:",
    context || "Sin contenido disponible.",
    "",
    "Recuerda: devuelve solo JSON limpio y parseable, sin bloques markdown.",
  ].join("\n");
}

function parseJsonResponse(rawText) {
  const attempts = [];
  const trimmed = String(rawText || "").trim();

  if (!trimmed) {
    throw new Error("OpenAI devolvió una respuesta vacía");
  }

  attempts.push(trimmed);

  const fenced = trimmed
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  if (fenced && fenced !== trimmed) {
    attempts.push(fenced);
  }

  const firstBrace = fenced.indexOf("{");
  const lastBrace = fenced.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    const extracted = fenced.slice(firstBrace, lastBrace + 1).trim();
    if (extracted && !attempts.includes(extracted)) {
      attempts.push(extracted);
    }
  }

  for (const candidate of attempts) {
    try {
      return JSON.parse(candidate);
    } catch {
      // seguir
    }
  }

  throw new Error("No se pudo parsear el JSON devuelto por OpenAI");
}

function assertPlainObject(value, contextLabel) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`OpenAI devolvió un payload inválido para ${contextLabel}`);
  }

  return value;
}

function normalizeModelString(value) {
  return String(value ?? "").trim();
}

function requireNonEmptyString(value, fieldLabel, contextLabel) {
  const normalized = normalizeModelString(value);

  if (!normalized) {
    throw new Error(
      `OpenAI no devolvió un valor válido para "${fieldLabel}" en ${contextLabel}`
    );
  }

  return normalized;
}

function validateWebPayload(payload) {
  const data = assertPlainObject(payload, "web");

  return {
    aiWebTitle: requireNonEmptyString(data.title, "title", "web"),
    aiWebExcerpt: requireNonEmptyString(data.excerpt, "excerpt", "web"),
    aiWebContent: requireNonEmptyString(data.content, "content", "web"),
  };
}

function validateLinkedinPayload(payload) {
  const data = assertPlainObject(payload, "linkedin");

  return {
    aiLinkedinPost: requireNonEmptyString(data.post, "post", "linkedin"),
    aiLinkedinHashtags: requireNonEmptyString(data.hashtags, "hashtags", "linkedin"),
  };
}

async function requestOpenAIJson(prompt, item) {
  const client = getOpenAIClient();

  const response = await client.responses.create({
    model: getOpenAIModel(),
    input: buildOpenAIInput(prompt, item),
  });

  const rawText = String(response.output_text || "").trim();

  if (!rawText) {
    throw new Error("OpenAI no devolvió texto en la respuesta");
  }

  return parseJsonResponse(rawText);
}

async function generateWebContent(item, promptOverride = "") {
  const prompt = String(promptOverride || "").trim() || DEFAULT_WEB_PROMPT;
  const payload = await requestOpenAIJson(prompt, item);
  return validateWebPayload(payload);
}

async function generateLinkedinContent(item, promptOverride = "") {
  const prompt = String(promptOverride || "").trim() || DEFAULT_LINKEDIN_PROMPT;
  const payload = await requestOpenAIJson(prompt, item);
  return validateLinkedinPayload(payload);
}

export async function generateNewsChannels(item, options = {}) {
  const channels = Array.isArray(options.channels) ? options.channels : [];
  const prompts =
    options.prompts && typeof options.prompts === "object" ? options.prompts : {};
  const now = new Date().toISOString();
  const patch = {};
  const results = {};

  for (const channel of channels) {
    try {
      if (channel === "web") {
        const web = await generateWebContent(item, prompts.web);

        patch.aiWebTitle = web.aiWebTitle;
        patch.aiWebExcerpt = web.aiWebExcerpt;
        patch.aiWebContent = web.aiWebContent;
        patch.aiWebStatus = BITRIX_APP_CONFIG.STATUS.GENERADA;
        patch.aiWebGeneratedAt = now;
        patch.aiWebError = "";
        results.web = { ok: true };
      }

      if (channel === "linkedin") {
        const linkedin = await generateLinkedinContent(item, prompts.linkedin);

        patch.aiLinkedinPost = linkedin.aiLinkedinPost;
        patch.aiLinkedinHashtags = linkedin.aiLinkedinHashtags;
        patch.aiLinkedinStatus = BITRIX_APP_CONFIG.STATUS.GENERADA;
        patch.aiLinkedinGeneratedAt = now;
        patch.aiLinkedinError = "";
        results.linkedin = { ok: true };
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error desconocido de OpenAI";

      if (channel === "web") {
        patch.aiWebStatus = BITRIX_APP_CONFIG.STATUS.ERROR_IA;
        patch.aiWebError = message;
        results.web = { ok: false, error: message };
      }

      if (channel === "linkedin") {
        patch.aiLinkedinStatus = BITRIX_APP_CONFIG.STATUS.ERROR_IA;
        patch.aiLinkedinError = message;
        results.linkedin = { ok: false, error: message };
      }
    }
  }

  return {
    patch,
    results,
  };
}

export { DEFAULT_OPENAI_MODEL };