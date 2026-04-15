import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig.js";
import { normalizeTextEncoding } from "../utils/text.js";

const F = BITRIX_APP_CONFIG.FIELDS;

function normalizeBoolean(value) {
  if (
    value === true ||
    value === "Y" ||
    value === "y" ||
    value === "1" ||
    value === 1
  ) {
    return true;
  }

  return false;
}

function normalizeString(value) {
  if (value === undefined || value === null) return "";
  return normalizeTextEncoding(value).trim();
}

function normalizeNullableString(value) {
  const normalized = normalizeString(value);
  return normalized || null;
}

function normalizeDate(value) {
  const normalized = normalizeString(value);
  return normalized || null;
}

function splitPipeList(value) {
  const normalized = normalizeString(value);

  if (!normalized) return [];

  if (
    (normalized.startsWith("[") && normalized.endsWith("]")) ||
    (normalized.startsWith("{") && normalized.endsWith("}"))
  ) {
    try {
      const parsed = JSON.parse(normalized);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [normalized];
    }
  }

  return normalized
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
}

function joinPipeList(values) {
  if (!Array.isArray(values)) return "";
  return values
    .map((value) => normalizeString(value))
    .filter(Boolean)
    .join(" | ");
}

function getItemSources(item) {
  const sources = [];

  if (item && typeof item === "object") {
    sources.push(item);

    if (item.item && typeof item.item === "object") {
      sources.push(item.item);
    }

    if (item.fields && typeof item.fields === "object") {
      sources.push(item.fields);
    }

    if (item.item?.fields && typeof item.item.fields === "object") {
      sources.push(item.item.fields);
    }
  }

  return sources;
}

function getFieldCandidates(fieldName) {
  const normalized = normalizeString(fieldName);
  if (!normalized) return [];

  const candidates = new Set([
    normalized,
    normalized.toLowerCase(),
    normalized.toUpperCase(),
    normalized.charAt(0).toLowerCase() + normalized.slice(1),
  ]);

  // Caso especial Bitrix:
  // UF_CRM_25_1776172329 -> ufCrm25_1776172329
  const ufMatch = normalized.match(/^UF_CRM_(\d+)_(.+)$/i);
  if (ufMatch) {
    const [, entityId, suffix] = ufMatch;
    candidates.add(`ufCrm${entityId}_${suffix}`);
    candidates.add(`UF_CRM_${entityId}_${suffix}`);
  }

  return [...candidates];
}

function readFieldValue(item, fieldName) {
  const sources = getItemSources(item);
  const candidates = getFieldCandidates(fieldName);

  for (const source of sources) {
    for (const key of candidates) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const value = source[key];
        if (value !== undefined) {
          return value;
        }
      }
    }
  }

  return undefined;
}

function debugMappedItem(rawItem, mappedItem) {
  const keysToCheck = [
    F.BITRIX_TITLE,
    F.TITLE_ORIGINAL,
    F.SOURCE_SITE,
    F.SOURCE_URL,
    F.SUMMARY,
    F.CONTENT_TEXT,
    F.SYNC_STATUS,
    F.EDITOR_NOTES,
    F.REJECTION_REASON,
  ];

  const fieldPresence = Object.fromEntries(
    keysToCheck.map((fieldKey) => [fieldKey, readFieldValue(rawItem, fieldKey) !== undefined])
  );

  console.log("[news-mapper] bitrix item", {
    topLevelKeys: Object.keys(rawItem || {}).slice(0, 30),
    hasFieldsObject: Boolean(rawItem?.fields),
    hasNestedItem: Boolean(rawItem?.item),
    fieldPresence,
    mapped: {
      id: mappedItem.id,
      titleOriginal: mappedItem.titleOriginal,
      sourceSite: mappedItem.sourceSite,
      summary: mappedItem.summary,
      syncStatus: mappedItem.syncStatus,
    },
  });
}

export function fromBitrixItem(item) {
  const syncStatus = normalizeNullableString(readFieldValue(item, F.SYNC_STATUS));
  const titleOriginal =
    normalizeNullableString(readFieldValue(item, F.TITLE_ORIGINAL)) ||
    normalizeNullableString(readFieldValue(item, F.BITRIX_TITLE)) ||
    "";

  const mapped = {
    id: Number(
      readFieldValue(item, "id") ||
        readFieldValue(item, "ID") ||
        readFieldValue(item, "Id") ||
        0
    ),

    titleOriginal,
    sourceSite: normalizeNullableString(readFieldValue(item, F.SOURCE_SITE)),
    sourceId: normalizeNullableString(readFieldValue(item, F.SOURCE_ID)),
    sourceUrl: normalizeNullableString(readFieldValue(item, F.SOURCE_URL)),
    sourceSlug: normalizeNullableString(readFieldValue(item, F.SOURCE_SLUG)),

    featuredImageUrl: normalizeNullableString(readFieldValue(item, F.FEATURED_IMAGE_URL)),
    featuredImageLocalPath: normalizeNullableString(
      readFieldValue(item, F.FEATURED_IMAGE_LOCAL_PATH)
    ),
    finalPublicationUrl: normalizeNullableString(
      readFieldValue(item, F.FINAL_PUBLICATION_URL)
    ),
    contentHash: normalizeNullableString(readFieldValue(item, F.CONTENT_HASH)),

    syncStatus,
    syncError: normalizeNullableString(readFieldValue(item, F.SYNC_ERROR)),

    publishedAt: normalizeDate(readFieldValue(item, F.PUBLISHED_AT)),
    modifiedAt: normalizeDate(readFieldValue(item, F.MODIFIED_AT)),
    scrapedAt: normalizeDate(readFieldValue(item, F.SCRAPED_AT)),
    importedAt: normalizeDate(readFieldValue(item, F.IMPORTED_AT)),
    lastSyncAt: normalizeDate(readFieldValue(item, F.LAST_SYNC_AT)),
    uploadedAt: normalizeDate(readFieldValue(item, F.UPLOADED_AT)),

    summary: normalizeNullableString(readFieldValue(item, F.SUMMARY)),
    contentText: normalizeNullableString(readFieldValue(item, F.CONTENT_TEXT)),
    contentHtml: normalizeNullableString(readFieldValue(item, F.CONTENT_HTML)),

    headings: splitPipeList(readFieldValue(item, F.HEADINGS)),
    images: splitPipeList(readFieldValue(item, F.IMAGES)),

    editorNotes: normalizeNullableString(readFieldValue(item, F.EDITOR_NOTES)),
    rejectionReason: normalizeNullableString(readFieldValue(item, F.REJECTION_REASON)),
    readyToUpload: normalizeBoolean(readFieldValue(item, F.READY_TO_UPLOAD)),
    status: syncStatus,

    featuredImageFile:
      readFieldValue(item, F.FEATURED_IMAGE_FILE) !== undefined
        ? readFieldValue(item, F.FEATURED_IMAGE_FILE)
        : null,
  };

  debugMappedItem(item, mapped);

  return mapped;
}

export function toBitrixFields(payload = {}) {
  const fields = {};

  if (payload.titleOriginal !== undefined) {
  const normalizedTitle = normalizeString(payload.titleOriginal);
  fields[F.TITLE_ORIGINAL] = normalizedTitle;
  fields[F.BITRIX_TITLE] = normalizedTitle;
}
  if (payload.sourceSite !== undefined) {
    fields[F.SOURCE_SITE] = normalizeString(payload.sourceSite);
  }

  if (payload.sourceId !== undefined) {
    fields[F.SOURCE_ID] = normalizeString(payload.sourceId);
  }

  if (payload.sourceUrl !== undefined) {
    fields[F.SOURCE_URL] = normalizeString(payload.sourceUrl);
  }

  if (payload.sourceSlug !== undefined) {
    fields[F.SOURCE_SLUG] = normalizeString(payload.sourceSlug);
  }

  if (payload.featuredImageUrl !== undefined) {
    fields[F.FEATURED_IMAGE_URL] = normalizeString(payload.featuredImageUrl);
  }

  if (payload.featuredImageLocalPath !== undefined) {
    fields[F.FEATURED_IMAGE_LOCAL_PATH] = normalizeString(
      payload.featuredImageLocalPath
    );
  }

  if (payload.finalPublicationUrl !== undefined) {
    fields[F.FINAL_PUBLICATION_URL] = normalizeString(
      payload.finalPublicationUrl
    );
  }

  if (payload.contentHash !== undefined) {
    fields[F.CONTENT_HASH] = normalizeString(payload.contentHash);
  }

  if (payload.syncStatus !== undefined) {
    fields[F.SYNC_STATUS] = normalizeString(payload.syncStatus);
  }

  if (payload.syncError !== undefined) {
    fields[F.SYNC_ERROR] = normalizeString(payload.syncError);
  }

  if (payload.publishedAt !== undefined) {
    fields[F.PUBLISHED_AT] = payload.publishedAt || "";
  }

  if (payload.modifiedAt !== undefined) {
    fields[F.MODIFIED_AT] = payload.modifiedAt || "";
  }

  if (payload.scrapedAt !== undefined) {
    fields[F.SCRAPED_AT] = payload.scrapedAt || "";
  }

  if (payload.importedAt !== undefined) {
    fields[F.IMPORTED_AT] = payload.importedAt || "";
  }

  if (payload.lastSyncAt !== undefined) {
    fields[F.LAST_SYNC_AT] = payload.lastSyncAt || "";
  }

  if (payload.uploadedAt !== undefined) {
    fields[F.UPLOADED_AT] = payload.uploadedAt || "";
  }

  if (payload.summary !== undefined) {
    fields[F.SUMMARY] = normalizeString(payload.summary);
  }

  if (payload.contentText !== undefined) {
    fields[F.CONTENT_TEXT] = normalizeString(payload.contentText);
  }

  if (payload.contentHtml !== undefined) {
    fields[F.CONTENT_HTML] = normalizeString(payload.contentHtml);
  }

  if (payload.headings !== undefined) {
    fields[F.HEADINGS] = Array.isArray(payload.headings)
      ? joinPipeList(payload.headings)
      : normalizeString(payload.headings);
  }

  if (payload.images !== undefined) {
    fields[F.IMAGES] = Array.isArray(payload.images)
      ? joinPipeList(payload.images)
      : normalizeString(payload.images);
  }

  if (payload.editorNotes !== undefined) {
    fields[F.EDITOR_NOTES] = normalizeString(payload.editorNotes);
  }

  if (payload.rejectionReason !== undefined) {
    fields[F.REJECTION_REASON] = normalizeString(payload.rejectionReason);
  }

  if (payload.readyToUpload !== undefined) {
    fields[F.READY_TO_UPLOAD] = payload.readyToUpload ? "Y" : "N";
  }

  if (payload.featuredImageFile !== undefined) {
    fields[F.FEATURED_IMAGE_FILE] = payload.featuredImageFile;
  }

  console.log("[news-mapper] toBitrixFields", {
    keys: Object.keys(fields),
    titleOriginal: fields[F.TITLE_ORIGINAL] || "",
    summary: fields[F.SUMMARY] || "",
    syncStatus: fields[F.SYNC_STATUS] || "",
  });

  return fields;
}
