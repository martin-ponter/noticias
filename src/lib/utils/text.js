const MOJIBAKE_PATTERN =
  /(?:\u00C3.|\u00C2.|\u00E2.|\u00F0\u0178|\u00D0.|\u00D1.|\uFFFD|[\u00C2-\u00C3][\u0080-\u00BF])/;

function hasMojibake(value) {
  return MOJIBAKE_PATTERN.test(value);
}

function decodeLatin1AsUtf8(value) {
  const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0) & 0xff);
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export function normalizeTextEncoding(value) {
  if (value === undefined || value === null) return "";

  const text = String(value);
  if (!text || !hasMojibake(text)) {
    return text;
  }

  try {
    const decoded = decodeLatin1AsUtf8(text);

    if (!decoded || decoded === text) {
      return text;
    }

    const originalHits = (text.match(/\u00C3|\u00C2|\u00E2|\uFFFD/g) || []).length;
    const decodedHits = (decoded.match(/\u00C3|\u00C2|\u00E2|\uFFFD/g) || []).length;

    return decodedHits <= originalHits ? decoded : text;
  } catch {
    return text;
  }
}
