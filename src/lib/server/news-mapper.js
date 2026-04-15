import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig.js";

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
  return String(value).trim();
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

export function fromBitrixItem(item) {
  const fields = item?.fields || {};

  return {
    id: Number(item?.id || 0),

    titleOriginal: normalizeString(fields[F.TITLE_ORIGINAL]),
    sourceSite: normalizeNullableString(fields[F.SOURCE_SITE]),
    sourceId: normalizeNullableString(fields[F.SOURCE_ID]),
    sourceUrl: normalizeNullableString(fields[F.SOURCE_URL]),
    sourceSlug: normalizeNullableString(fields[F.SOURCE_SLUG]),

    featuredImageUrl: normalizeNullableString(fields[F.FEATURED_IMAGE_URL]),
    featuredImageLocalPath: normalizeNullableString(
      fields[F.FEATURED_IMAGE_LOCAL_PATH]
    ),
    finalPublicationUrl: normalizeNullableString(
      fields[F.FINAL_PUBLICATION_URL]
    ),
    contentHash: normalizeNullableString(fields[F.CONTENT_HASH]),

    syncStatus: normalizeNullableString(fields[F.SYNC_STATUS]),
    syncError: normalizeNullableString(fields[F.SYNC_ERROR]),

    publishedAt: normalizeDate(fields[F.PUBLISHED_AT]),
    modifiedAt: normalizeDate(fields[F.MODIFIED_AT]),
    scrapedAt: normalizeDate(fields[F.SCRAPED_AT]),
    importedAt: normalizeDate(fields[F.IMPORTED_AT]),
    lastSyncAt: normalizeDate(fields[F.LAST_SYNC_AT]),
    uploadedAt: normalizeDate(fields[F.UPLOADED_AT]),

    summary: normalizeNullableString(fields[F.SUMMARY]),
    contentText: normalizeNullableString(fields[F.CONTENT_TEXT]),
    contentHtml: normalizeNullableString(fields[F.CONTENT_HTML]),

    headings: splitPipeList(fields[F.HEADINGS]),
    images: splitPipeList(fields[F.IMAGES]),

    editorNotes: normalizeNullableString(fields[F.EDITOR_NOTES]),
    rejectionReason: normalizeNullableString(fields[F.REJECTION_REASON]),
    readyToUpload: normalizeBoolean(fields[F.READY_TO_UPLOAD]),

    featuredImageFile:
      fields[F.FEATURED_IMAGE_FILE] !== undefined
        ? fields[F.FEATURED_IMAGE_FILE]
        : null,
  };
}

export function toBitrixFields(payload = {}) {
  const fields = {};

  if (payload.titleOriginal !== undefined) {
    fields[F.TITLE_ORIGINAL] = normalizeString(payload.titleOriginal);
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

  return fields;
}