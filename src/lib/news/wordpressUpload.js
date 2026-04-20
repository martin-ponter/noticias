function normalizeValue(value) {
  return String(value || "").trim();
}

export function isUploadedToWordPress(item = {}) {
  return Boolean(
    normalizeValue(item?.finalPublicationUrl) || normalizeValue(item?.uploadedAt)
  );
}

