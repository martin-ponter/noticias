import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig.js";
import {
  crmItemAdd,
  crmItemGet,
  crmItemList,
  crmItemUpdate,
} from "./bitrix-rest.js";
import { fromBitrixItem, toBitrixFields } from "./news-mapper.js";

const ENTITY_TYPE_ID = BITRIX_APP_CONFIG.ENTITY_TYPE_ID;

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
  const {
    syncStatus,
    search,
    start = 0,
    limit = 50,
  } = params;

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
  const result = await crmItemGet(ENTITY_TYPE_ID, id);
  return fromBitrixItem(result);
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

  return {
    id: Number(result?.item?.id || result?.id || 0),
  };
}

export async function updateNews(id, payload) {
  const fields = toBitrixFields(payload);
  await crmItemUpdate(ENTITY_TYPE_ID, id, fields);
  return await getNewsById(id);
}

export async function updateNewsStatus(id, syncStatus, rejectionReason = "") {
  const fields = toBitrixFields({
    syncStatus,
    rejectionReason,
    lastSyncAt: new Date().toISOString(),
  });

  await crmItemUpdate(ENTITY_TYPE_ID, id, fields);
  return await getNewsById(id);
}