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
    aiWebTitle:
      item.ufCrm25_1776418820 ||
      item.UF_CRM_25_1776418820 ||
      null,
    aiWebExcerpt:
      item.ufCrm25_1776418835 ||
      item.UF_CRM_25_1776418835 ||
      null,
    aiWebContent:
      item.ufCrm25_1776418853 ||
      item.UF_CRM_25_1776418853 ||
      null,
    aiLinkedinPost:
      item.ufCrm25_1776418701 ||
      item.UF_CRM_25_1776418701 ||
      null,
    aiLinkedinHashtags:
      item.ufCrm25_1776418735 ||
      item.UF_CRM_25_1776418735 ||
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
    checks.push(
      normalizeCompare(item.titleOriginal) === normalizeCompare(patch.titleOriginal)
    );
  }

  if (patch.summary !== undefined) {
    checks.push(normalizeCompare(item.summary) === normalizeCompare(patch.summary));
  }

  if (patch.contentText !== undefined) {
    checks.push(
      normalizeCompare(item.contentText) === normalizeCompare(patch.contentText)
    );
  }

  if (patch.editorNotes !== undefined) {
    checks.push(
      normalizeCompare(item.editorNotes) === normalizeCompare(patch.editorNotes)
    );
  }

  if (patch.aiWebTitle !== undefined) {
    checks.push(
      normalizeCompare(item.aiWebTitle) === normalizeCompare(patch.aiWebTitle)
    );
  }

  if (patch.aiWebExcerpt !== undefined) {
    checks.push(
      normalizeCompare(item.aiWebExcerpt) === normalizeCompare(patch.aiWebExcerpt)
    );
  }

  if (patch.aiWebContent !== undefined) {
    checks.push(
      normalizeCompare(item.aiWebContent) === normalizeCompare(patch.aiWebContent)
    );
  }

  if (patch.aiWebStatus !== undefined) {
    checks.push(
      normalizeCompare(item.aiWebStatus) === normalizeCompare(patch.aiWebStatus)
    );
  }

  if (patch.aiWebError !== undefined) {
    checks.push(
      normalizeCompare(item.aiWebError) === normalizeCompare(patch.aiWebError)
    );
  }

  if (patch.aiWebGeneratedAt !== undefined) {
    checks.push(Boolean(item.aiWebGeneratedAt));
  }

  if (patch.aiLinkedinPost !== undefined) {
    checks.push(
      normalizeCompare(item.aiLinkedinPost) ===
        normalizeCompare(patch.aiLinkedinPost)
    );
  }

  if (patch.aiLinkedinHashtags !== undefined) {
    checks.push(
      normalizeCompare(item.aiLinkedinHashtags) ===
        normalizeCompare(patch.aiLinkedinHashtags)
    );
  }

  if (patch.aiLinkedinStatus !== undefined) {
    checks.push(
      normalizeCompare(item.aiLinkedinStatus) ===
        normalizeCompare(patch.aiLinkedinStatus)
    );
  }

  if (patch.aiLinkedinError !== undefined) {
    checks.push(
      normalizeCompare(item.aiLinkedinError) ===
        normalizeCompare(patch.aiLinkedinError)
    );
  }

  if (patch.aiLinkedinGeneratedAt !== undefined) {
    checks.push(Boolean(item.aiLinkedinGeneratedAt));
  }

  if (patch.syncStatus !== undefined) {
    checks.push(
      normalizeCompare(item.syncStatus) === normalizeCompare(patch.syncStatus)
    );
  }

  if (patch.rejectionReason !== undefined) {
    checks.push(
      normalizeCompare(item.rejectionReason) ===
        normalizeCompare(patch.rejectionReason)
    );
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
    aiWebTitle:
      patch.aiWebTitle !== undefined ? patch.aiWebTitle : item.aiWebTitle,
    aiWebExcerpt:
      patch.aiWebExcerpt !== undefined ? patch.aiWebExcerpt : item.aiWebExcerpt,
    aiWebContent:
      patch.aiWebContent !== undefined ? patch.aiWebContent : item.aiWebContent,
    aiWebStatus:
      patch.aiWebStatus !== undefined ? patch.aiWebStatus : item.aiWebStatus,
    aiWebGeneratedAt:
      patch.aiWebGeneratedAt !== undefined
        ? patch.aiWebGeneratedAt
        : item.aiWebGeneratedAt,
    aiWebError:
      patch.aiWebError !== undefined ? patch.aiWebError : item.aiWebError,
    aiLinkedinPost:
      patch.aiLinkedinPost !== undefined
        ? patch.aiLinkedinPost
        : item.aiLinkedinPost,
    aiLinkedinHashtags:
      patch.aiLinkedinHashtags !== undefined
        ? patch.aiLinkedinHashtags
        : item.aiLinkedinHashtags,
    aiLinkedinStatus:
      patch.aiLinkedinStatus !== undefined
        ? patch.aiLinkedinStatus
        : item.aiLinkedinStatus,
    aiLinkedinGeneratedAt:
      patch.aiLinkedinGeneratedAt !== undefined
        ? patch.aiLinkedinGeneratedAt
        : item.aiLinkedinGeneratedAt,
    aiLinkedinError:
      patch.aiLinkedinError !== undefined
        ? patch.aiLinkedinError
        : item.aiLinkedinError,
    rejectionReason:
      patch.rejectionReason !== undefined
        ? patch.rejectionReason
        : item.rejectionReason,
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
    aiWebTitle: mapped.aiWebTitle,
    aiWebExcerpt: mapped.aiWebExcerpt,
    aiWebContent: mapped.aiWebContent,
    aiWebStatus: mapped.aiWebStatus,
    aiWebGeneratedAt: mapped.aiWebGeneratedAt,
    aiWebError: mapped.aiWebError,
    aiLinkedinPost: mapped.aiLinkedinPost,
    aiLinkedinHashtags: mapped.aiLinkedinHashtags,
    aiLinkedinStatus: mapped.aiLinkedinStatus,
    aiLinkedinGeneratedAt: mapped.aiLinkedinGeneratedAt,
    aiLinkedinError: mapped.aiLinkedinError,
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
    aiWebTitle: merged.aiWebTitle,
    aiWebStatus: merged.aiWebStatus,
    aiLinkedinPost: merged.aiLinkedinPost,
    aiLinkedinStatus: merged.aiLinkedinStatus,
    syncStatus: merged.syncStatus,
    lastSyncAt: merged.lastSyncAt,
  });

  return merged;
}

export async function applyNewsPatch(id, patch = {}) {
  const fields = toBitrixFields(patch);

  console.log("[news-service] applyNewsPatch payload", {
    id: Number(id),
    fieldKeys: Object.keys(fields),
    fieldsPreview: fields,
  });

  await crmItemUpdate(ENTITY_TYPE_ID, id, fields);

  const fresh = await getNewsByIdFresh(id, patch);
  const merged = mergeItemWithPatch(fresh, patch);

  console.log("[news-service] applyNewsPatch merged result", {
    id: merged.id,
    syncStatus: merged.syncStatus,
    rejectionReason: merged.rejectionReason,
    lastSyncAt: merged.lastSyncAt,
    finalPublicationUrl: merged.finalPublicationUrl,
    uploadedAt: merged.uploadedAt,
  });

  return merged;
}

export async function updateNewsStatus(id, syncStatus, rejectionReason = "") {
  const now = new Date().toISOString();

  return applyNewsPatch(id, {
    syncStatus,
    rejectionReason,
    lastSyncAt: now,
  });
}
