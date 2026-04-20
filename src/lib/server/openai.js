import OpenAI from "openai";
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig.js";
import {
  buildLinkedinSourceContext,
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

function buildOpenAIInput(prompt, item, options = {}) {
  const contextBuilder =
    typeof options.contextBuilder === "function"
      ? options.contextBuilder
      : buildSourceContext;

  const context = contextBuilder(item);

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
      // probar siguiente candidato
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
  const contentValue = data.contentHtml ?? data.content;

  return {
    aiWebTitle: requireNonEmptyString(data.title, "title", "web"),
    aiWebExcerpt: requireNonEmptyString(data.excerpt, "excerpt", "web"),
    aiWebContent: requireNonEmptyString(contentValue, "contentHtml", "web"),
  };
}

function validateLinkedinPayload(payload) {
  const data = assertPlainObject(payload, "linkedin");

  return {
    aiLinkedinPost: requireNonEmptyString(data.post, "post", "linkedin"),
    aiLinkedinHashtags: requireNonEmptyString(data.hashtags, "hashtags", "linkedin"),
  };
}

function pushCandidate(bucket, value) {
  const text = String(value || "").trim();
  if (text && !bucket.includes(text)) {
    bucket.push(text);
  }
}

function collectTextFromNode(node, bucket) {
  if (!node) return;

  if (typeof node === "string") {
    pushCandidate(bucket, node);
    return;
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      collectTextFromNode(item, bucket);
    }
    return;
  }

  if (typeof node !== "object") {
    return;
  }

  // Casos comunes del SDK / Responses API
  if (typeof node.output_text === "string") {
    pushCandidate(bucket, node.output_text);
  }

  if (typeof node.text === "string") {
    pushCandidate(bucket, node.text);
  }

  if (typeof node.content === "string") {
    pushCandidate(bucket, node.content);
  }

  // Explorar estructuras anidadas habituales
  if (Array.isArray(node.output)) {
    collectTextFromNode(node.output, bucket);
  }

  if (Array.isArray(node.content)) {
    collectTextFromNode(node.content, bucket);
  }

  if (Array.isArray(node.contents)) {
    collectTextFromNode(node.contents, bucket);
  }

  if (node.type === "output_text" && typeof node.text === "string") {
    pushCandidate(bucket, node.text);
  }

  if (node.type === "text" && typeof node.text === "string") {
    pushCandidate(bucket, node.text);
  }

  if (node.type === "message" && Array.isArray(node.content)) {
    collectTextFromNode(node.content, bucket);
  }
}

function extractResponseText(response) {
  const candidates = [];

  // helper oficial del SDK
  pushCandidate(candidates, response?.output_text);

  // fallback robusto recorriendo output
  collectTextFromNode(response?.output, candidates);

  return candidates.join("\n\n").trim();
}

function summarizeResponse(response) {
  const output = Array.isArray(response?.output) ? response.output : [];

  return {
    id: response?.id || null,
    model: response?.model || null,
    status: response?.status || null,
    outputCount: output.length,
    outputTypes: output.map((item) => item?.type || "unknown"),
    incompleteDetails: response?.incomplete_details || null,
    usage: response?.usage
      ? {
          input_tokens: response.usage.input_tokens ?? null,
          output_tokens: response.usage.output_tokens ?? null,
          total_tokens: response.usage.total_tokens ?? null,
        }
      : null,
  };
}

function isRetriableExtractionError(error) {
  const message = String(error?.message || "").toLowerCase();

  return (
    message.includes("no devolvió texto") ||
    message.includes("respuesta vacía") ||
    message.includes("no se pudo parsear")
  );
}

async function requestOpenAIJson(prompt, item, options = {}) {
  const client = getOpenAIClient();

  const requestPayload = {
    model: getOpenAIModel(),
    input: buildOpenAIInput(prompt, item, options),
  };

  if (Number(options.maxOutputTokens) > 0) {
    requestPayload.max_output_tokens = Number(options.maxOutputTokens);
  }

  let lastError = null;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await client.responses.create(requestPayload);
      const rawText = extractResponseText(response);

      if (!rawText) {
        console.warn("[openai] respuesta sin texto utilizable", {
          attempt,
          summary: summarizeResponse(response),
        });
        throw new Error("OpenAI no devolvió texto utilizable en la respuesta");
      }

      try {
        return parseJsonResponse(rawText);
      } catch (parseError) {
        console.warn("[openai] no se pudo parsear JSON", {
          attempt,
          summary: summarizeResponse(response),
          rawTextPreview: rawText.slice(0, 1200),
        });
        throw parseError;
      }
    } catch (error) {
      lastError = error;

      if (attempt >= 2 || !isRetriableExtractionError(error)) {
        break;
      }

      console.warn("[openai] reintentando petición por respuesta incompleta", {
        attempt,
        reason: error?.message || "unknown",
      });
    }
  }

  throw lastError || new Error("No se pudo obtener una respuesta válida de OpenAI");
}

async function generateWebContent(item, promptOverride = "") {
  const prompt = String(promptOverride || "").trim() || DEFAULT_WEB_PROMPT;
  const payload = await requestOpenAIJson(prompt, item);
  return validateWebPayload(payload);
}

async function generateLinkedinContent(item, promptOverride = "") {
  const prompt = String(promptOverride || "").trim() || DEFAULT_LINKEDIN_PROMPT;
  const payload = await requestOpenAIJson(prompt, item, {
    contextBuilder: buildLinkedinSourceContext,
    maxOutputTokens: 500,
  });
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