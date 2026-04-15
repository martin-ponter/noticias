export const ACCESS_DENIED_MESSAGE = "Acceso no permitido fuera de Bitrix24";

const REQUIRED_BITRIX_QUERY_KEYS = ["DOMAIN", "AUTH_ID", "APP_SID"];
const OPTIONAL_BITRIX_QUERY_KEYS = [
  "AUTH_EXPIRES",
  "REFRESH_ID",
  "PLACEMENT",
  "PLACEMENT_OPTIONS",
  "PROTOCOL",
  "LANG",
  "member_id",
];

function getGlobalWindow() {
  return typeof window === "undefined" ? undefined : window;
}

export function hasBX24() {
  const currentWindow = getGlobalWindow();
  return typeof currentWindow?.BX24 !== "undefined";
}

export function getBX24() {
  return hasBX24() ? window.BX24 : null;
}

export function getQueryParams() {
  const currentWindow = getGlobalWindow();
  if (!currentWindow) return new URLSearchParams();

  return new URL(currentWindow.location.href).searchParams;
}

export function getBitrixContext() {
  const params = getQueryParams();
  const requiredKeys = REQUIRED_BITRIX_QUERY_KEYS.filter((key) => params.has(key));
  const optionalKeys = OPTIONAL_BITRIX_QUERY_KEYS.filter((key) => params.has(key));
  const placement = (params.get("PLACEMENT") || "").toLowerCase();
  const installFlag = (params.get("install") || "").toLowerCase();
  const bx24Available = hasBX24();
  const hasRequiredQuery = requiredKeys.length === REQUIRED_BITRIX_QUERY_KEYS.length;
  const hasBitrixHints = hasRequiredQuery || bx24Available;

  return {
    params,
    bx24Available,
    hasRequiredQuery,
    hasBitrixHints,
    requiredKeys,
    optionalKeys,
    placement,
    installFlag,
  };
}

export function isInsideBitrix() {
  return getBitrixContext().hasBitrixHints;
}

export function isInstallMode() {
  const { placement, installFlag } = getBitrixContext();

  return (
    placement.includes("install") ||
    installFlag === "y" ||
    installFlag === "yes" ||
    installFlag === "true" ||
    installFlag === "1"
  );
}

export function waitForBX24({ timeoutMs = 4000, intervalMs = 100 } = {}) {
  return new Promise((resolve) => {
    const existingBX24 = getBX24();

    if (existingBX24) {
      resolve(existingBX24);
      return;
    }

    const currentWindow = getGlobalWindow();
    if (!currentWindow) {
      resolve(null);
      return;
    }

    const startedAt = Date.now();
    const timer = currentWindow.setInterval(() => {
      const bx24 = getBX24();
      if (bx24) {
        currentWindow.clearInterval(timer);
        resolve(bx24);
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        currentWindow.clearInterval(timer);
        resolve(null);
      }
    }, intervalMs);
  });
}

function initBX24Instance(bx24, initTimeoutMs) {
  return new Promise((resolve, reject) => {
    if (!bx24) {
      reject(new Error(ACCESS_DENIED_MESSAGE));
      return;
    }

    if (typeof bx24.init !== "function") {
      resolve(bx24);
      return;
    }

    let settled = false;
    const currentWindow = getGlobalWindow();

    const finish = (callback) => (value) => {
      if (settled) return;
      settled = true;
      callback(value);
    };

    const resolveOnce = finish(resolve);
    const rejectOnce = finish(reject);

    const timeoutId = currentWindow?.setTimeout(() => {
      rejectOnce(new Error("No se pudo inicializar el contexto de Bitrix24"));
    }, initTimeoutMs);

    try {
      bx24.init(() => {
        if (timeoutId) {
          currentWindow.clearTimeout(timeoutId);
        }
        resolveOnce(bx24);
      });
    } catch (error) {
      if (timeoutId) {
        currentWindow.clearTimeout(timeoutId);
      }
      rejectOnce(error);
    }
  });
}

export async function initBitrix({
  waitTimeoutMs = 4000,
  waitIntervalMs = 100,
  initTimeoutMs = 4000,
} = {}) {
  const context = getBitrixContext();

  if (!context.hasBitrixHints) {
    throw new Error(ACCESS_DENIED_MESSAGE);
  }

  const bx24 =
    getBX24() ||
    (await waitForBX24({
      timeoutMs: waitTimeoutMs,
      intervalMs: waitIntervalMs,
    }));

  if (!bx24) {
    throw new Error(ACCESS_DENIED_MESSAGE);
  }

  await initBX24Instance(bx24, initTimeoutMs);

  return {
    bx24,
    context: getBitrixContext(),
  };
}
