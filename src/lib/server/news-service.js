import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig";
import {
  crmItemAdd,
  crmItemGet,
  crmItemList,
  crmItemUpdate,
} from "./bitrix-rest.js";
import { fromBitrixItem, toBitrixFields } from "./news-mapper.js";

const ENTITY_TYPE_ID = BITRIX_APP_CONFIG.ENTITY_TYPE_ID;

function summarizeItem(item) {
  if (!item || typeof item !== "object") return null;

  return {
    id: item.id || item.ID || null,
    title: item.title || item.TITLE || null,
    titleOriginal:
      item.ufCrm25_1776172315 ||
      item.UF_CRM_25_1776172315 ||
      item.title ||
      item.TITLE ||
      null,
    sourceSite:
      item.ufCrm25_1776172329 ||
      item.UF_CRM_25_1776172329 ||
      null,
    sourceId:
      item.ufCrm25_1776172343 ||
      item.UF_CRM_25_1776172343 ||
      null,
    sourceUrl:
      item.ufCrm25_1776172353 ||
      item.UF_CRM_25_1776172353 ||
      null,
    summary:
      item.ufCrm25_1776172633 ||
      item.UF_CRM_25_1776172633 ||
      null,
    contentText:
      item.ufCrm25_1776172680 ||
      item.UF_CRM_25_1776172680 ||
      null,
    contentHtml:
      item.ufCrm25_1776172691 ||
      item.UF_CRM_25_1776172691 ||
      null,
    syncStatus:
      item.ufCrm25_1776172478 ||
      item.UF_CRM_25_1776172478 ||
      null,
    editorNotes:
      item.ufCrm25_1776172726 ||
      item.UF_CRM_25_1776172726 ||
      null,
    rejectionReason:
      item.ufCrm25_1776172742 ||
      item.UF_CRM_25_1776172742 ||
      null,
  };
}

function debugBitrixResponse(label, result) {
  const items = Array.isArray(result?.items)
    ? result.items
    : Array.isArray(result?.item)
      ? result.item
      : result?.item
        ? [result.item]
        : result && typeof result === "object"
          ? [result]
          : [];

  console.log(`[news-service] ${label}`, {
    resultType: typeof result,
    resultKeys: Object.keys(result || {}),
    itemCount: items.length,
    firstItemKeys: Object.keys(items[0] || {}).slice(0, 80),
    firstItemSummary: summarizeItem(items[0]),
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeCompare(value) {
  return String(value ?? "").trim();
}

function itemMatchesPatch(item, patch = {}) {
  if (!item) return false;

  const checks = [];

  if (patch.titleOriginal !== undefined) {
    checks.push(normalizeCompare(item.titleOriginal) === normalizeCompare(patch.titleOriginal));
  }

  if (patch.summary !== undefined) {
    checks.push(normalizeCompare(item.summary) === normalizeCompare(patch.summary));
  }

  if (patch.contentText !== undefined) {
    checks.push(normalizeCompare(item.contentText) === normalizeCompare(patch.contentText));
  }

  if (patch.editorNotes !== undefined) {
    checks.push(normalizeCompare(item.editorNotes) === normalizeCompare(patch.editorNotes));
  }

  if (patch.syncStatus !== undefined) {
    checks.push(normalizeCompare(item.syncStatus) === normalizeCompare(patch.syncStatus));
  }

  if (patch.lastSyncAt !== undefined) {
    checks.push(Boolean(item.lastSyncAt));
  }

  return checks.length > 0 && checks.every(Boolean);
}

function mergeItemWithPatch(item, patch = {}) {
  return {
    ...item,
    titleOriginal:
      patch.titleOriginal !== undefined ? patch.titleOriginal : item.titleOriginal,
    summary: patch.summary !== undefined ? patch.summary : item.summary,
    contentText:
      patch.contentText !== undefined ? patch.contentText : item.contentText,
    editorNotes:
      patch.editorNotes !== undefined ? patch.editorNotes : item.editorNotes,
    syncStatus:
      patch.syncStatus !== undefined ? patch.syncStatus : item.syncStatus,
    status: patch.syncStatus !== undefined ? patch.syncStatus : item.status,
    lastSyncAt:
      patch.lastSyncAt !== undefined ? patch.lastSyncAt : item.lastSyncAt,
  };
}

async function getNewsByIdFresh(id, expectedPatch = null) {
  const maxAttempts = expectedPatch ? 4 : 1;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const result = await crmItemGet(ENTITY_TYPE_ID, id);
    debugBitrixResponse(`crm.item.get attempt ${attempt}`, result);

    const rawItem = result?.item || result;
    const mapped = fromBitrixItem(rawItem);

    if (!expectedPatch || itemMatchesPatch(mapped, expectedPatch)) {
      return mapped;
    }

    if (attempt < maxAttempts) {
      await sleep(250);
    }
  }

  const fallbackResult = await crmItemGet(ENTITY_TYPE_ID, id);
  const fallbackRawItem = fallbackResult?.item || fallbackResult;
  return fromBitrixItem(fallbackRawItem);
}

/**
 * @typedef {Object} ListNewsParams
 * @property {string=} syncStatus
 * @property {string=} search
 * @property {number=} start
 * @property {number=} limit
 */

/**
 * @param {ListNewsParams=} params
 */
export async function listNews(params = {}) {
  const { syncStatus, search, start = 0, limit = 50 } = params;

  const filter = {};

  if (syncStatus) {
    filter[BITRIX_APP_CONFIG.FIELDS.SYNC_STATUS] = syncStatus;
  }

  const result = await crmItemList(ENTITY_TYPE_ID, {
    filter,
    start: Number(start),
    order: {
      id: "desc",
    },
  });

  debugBitrixResponse("crm.item.list", result);

  const items = Array.isArray(result?.items) ? result.items : [];
  let mapped = items.map(fromBitrixItem);

  if (search) {
    const q = String(search).trim().toLowerCase();

    mapped = mapped.filter((item) => {
      const haystack = [
        item.id,
        item.titleOriginal,
        item.summary,
        item.contentText,
        item.sourceSite,
        item.sourceSlug,
        item.sourceUrl,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }

  return mapped.slice(0, Number(limit));
}

export async function getNewsById(id) {
  const mapped = await getNewsByIdFresh(id);

  console.log("[news-service] mapped single", {
    id: mapped.id,
    titleOriginal: mapped.titleOriginal,
    sourceSite: mapped.sourceSite,
    sourceId: mapped.sourceId,
    sourceUrl: mapped.sourceUrl,
    summary: mapped.summary,
    contentText: mapped.contentText,
    contentHtml: mapped.contentHtml,
    syncStatus: mapped.syncStatus,
    editorNotes: mapped.editorNotes,
    rejectionReason: mapped.rejectionReason,
    readyToUpload: mapped.readyToUpload,
  });

  return mapped;
}

export async function createNews(payload) {
  const now = new Date().toISOString();

  const fields = toBitrixFields({
    ...payload,
    scrapedAt: payload.scrapedAt || now,
    importedAt: payload.importedAt || now,
    lastSyncAt: payload.lastSyncAt || now,
    syncStatus:
      payload.syncStatus ||
      payload.status ||
      BITRIX_APP_CONFIG.STATUS.PENDIENTE,
  });

  const result = await crmItemAdd(ENTITY_TYPE_ID, fields);

  console.log("[news-service] crm.item.add result", {
    resultKeys: Object.keys(result || {}),
    itemId: result?.item?.id || result?.id || null,
    payloadKeys: Object.keys(fields),
  });

  return {
    id: Number(result?.item?.id || result?.id || 0),
  };
}

export async function updateNews(id, payload) {
  const now = new Date().toISOString();

  const patch = {
    ...payload,
    syncStatus: BITRIX_APP_CONFIG.STATUS.EDITADA,
    lastSyncAt: now,
  };

  const fields = toBitrixFields(patch);

  console.log("[news-service] crm.item.update payload", {
    id: Number(id),
    fieldKeys: Object.keys(fields),
    fieldsPreview: fields,
  });

  await crmItemUpdate(ENTITY_TYPE_ID, id, fields);

  const fresh = await getNewsByIdFresh(id, patch);
  const merged = mergeItemWithPatch(fresh, patch);

  console.log("[news-service] updateNews merged result", {
    id: merged.id,
    titleOriginal: merged.titleOriginal,
    summary: merged.summary,
    contentText: merged.contentText?.slice?.(0, 120) || "",
    editorNotes: merged.editorNotes,
    syncStatus: merged.syncStatus,
    lastSyncAt: merged.lastSyncAt,
  });

  return merged;
}

export async function updateNewsStatus(id, syncStatus, rejectionReason = "") {
  const now = new Date().toISOString();

  const patch = {
    syncStatus,
    rejectionReason,
    lastSyncAt: now,
  };

  const fields = toBitrixFields(patch);

  console.log("[news-service] updateNewsStatus", {
    id: Number(id),
    syncStatus,
    rejectionReason,
    fieldKeys: Object.keys(fields),
    fieldsPreview: fields,
  });

  await crmItemUpdate(ENTITY_TYPE_ID, id, fields);

  const fresh = await getNewsByIdFresh(id, patch);
  const merged = mergeItemWithPatch(fresh, patch);

  return merged;
}