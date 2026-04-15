import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig.js";
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
      item.ufCrm25_1776172315 || item.UF_CRM_25_1776172315 || null,
    sourceSite:
      item.ufCrm25_1776172329 || item.UF_CRM_25_1776172329 || null,
    summary:
      item.ufCrm25_1776172633 || item.UF_CRM_25_1776172633 || null,
    syncStatus:
      item.ufCrm25_1776172478 || item.UF_CRM_25_1776172478 || null,
  };
}

function debugBitrixResponse(label, result) {
  const items = Array.isArray(result?.items)
    ? result.items
    : Array.isArray(result?.item)
      ? result.item
      : result?.item
        ? [result.item]
        : [];

  console.log(`[news-service] ${label}`, {
    resultKeys: Object.keys(result || {}),
    itemCount: items.length,
    firstItemKeys: Object.keys(items[0] || {}).slice(0, 40),
    firstItemSummary: summarizeItem(items[0]),
  });
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

  console.log(
    "[news-service] mapped list sample",
    mapped.slice(0, 3).map((item) => ({
      id: item.id,
      titleOriginal: item.titleOriginal,
      summary: item.summary,
      sourceSite: item.sourceSite,
      syncStatus: item.syncStatus,
    }))
  );

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
  const result = await crmItemGet(ENTITY_TYPE_ID, id);

  debugBitrixResponse("crm.item.get", result);

  const rawItem = result?.item || result;
  const mapped = fromBitrixItem(rawItem);

  console.log("[news-service] mapped single", {
    id: mapped.id,
    titleOriginal: mapped.titleOriginal,
    summary: mapped.summary,
    sourceSite: mapped.sourceSite,
    syncStatus: mapped.syncStatus,
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
  });

  return {
    id: Number(result?.item?.id || result?.id || 0),
  };
}

export async function updateNews(id, payload) {
  const fields = toBitrixFields(payload);

  console.log("[news-service] crm.item.update payload", {
    id: Number(id),
    fieldKeys: Object.keys(fields),
  });

  await crmItemUpdate(ENTITY_TYPE_ID, id, fields);
  return await getNewsById(id);
}

export async function updateNewsStatus(id, syncStatus, rejectionReason = "") {
  const fields = toBitrixFields({
    syncStatus,
    rejectionReason,
    lastSyncAt: new Date().toISOString(),
  });

  console.log("[news-service] updateNewsStatus", {
    id: Number(id),
    syncStatus,
    rejectionReason,
    fieldKeys: Object.keys(fields),
  });

  await crmItemUpdate(ENTITY_TYPE_ID, id, fields);
  return await getNewsById(id);
}
