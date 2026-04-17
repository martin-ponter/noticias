export const ACCESS_DENIED_MESSAGE = "Acceso no permitido fuera de Bitrix24";

export const BITRIX_CONTEXT_STATES = {
  CHECKING: "checking",
  INSIDE: "inside_bitrix",
  OUTSIDE: "outside_bitrix",
};

const REQUIRED_CONTEXT_KEYS = ["AUTH_ID", "APP_SID", "member_id"];

const BITRIX_QUERY_KEYS = [
  "DOMAIN",
  "AUTH_ID",
  "AUTH_EXPIRES",
  "APP_SID",
  "PLACEMENT",
  "PLACEMENT_OPTIONS",
  "PROTOCOL",
  "LANG",
  "member_id",
  "REFRESH_ID",
];

function getGlobalWindow() {
  return typeof window === "undefined" ? undefined : window;
}

function normalizeValue(value) {
  return String(value || "").trim().toLowerCase();
}

function isTruthyInstallFlag(value) {
  return ["y", "yes", "true", "1"].includes(normalizeValue(value));
}

function safeGetReferrer() {
  if (typeof document === "undefined") return "";
  return document.referrer || "";
}

function safeIsInsideIframe() {
  const currentWindow = getGlobalWindow();
  if (!currentWindow) return false;

  try {
    return currentWindow.self !== currentWindow.top;
  } catch {
    return true;
  }
}

function matchesBitrixHost(value) {
  const normalized = normalizeValue(value);
  return normalized.includes("bitrix24.") || normalized.includes(".bitrix.");
}

function hasAnyMatchedKey(matchedQueryKeys, keys) {
  return keys.some((key) => matchedQueryKeys.includes(key));
}

function hasBitrixReferrer(referrer) {
  if (!referrer) return false;

  try {
    return matchesBitrixHost(new URL(referrer).hostname);
  } catch {
    return matchesBitrixHost(referrer);
  }
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

export function getBitrixContextSnapshot() {
  const currentWindow = getGlobalWindow();
  const params = getQueryParams();
  const matchedQueryKeys = BITRIX_QUERY_KEYS.filter((key) => {
    const value = params.get(key);
    return value !== null && String(value).trim() !== "";
  });
  const bx24Available = hasBX24();
  const insideIframe = safeIsInsideIframe();
  const referrer = safeGetReferrer();
  const bitrixReferrer = hasBitrixReferrer(referrer);
  const domain = params.get("DOMAIN") || "";
  const placement = normalizeValue(params.get("PLACEMENT"));
  const installFlag = normalizeValue(params.get("install"));
  const hasBitrixDomain = matchesBitrixHost(domain);
  const hasRequiredContextKey = hasAnyMatchedKey(
    matchedQueryKeys,
    REQUIRED_CONTEXT_KEYS
  );
  const strongQuerySignal =
    hasBitrixDomain && hasRequiredContextKey;
  const hasQuerySignals = matchedQueryKeys.length > 0;
  const iframeSignal = insideIframe && (bitrixReferrer || hasQuerySignals);
  const installMode =
    placement.includes("install") || isTruthyInstallFlag(installFlag);
  const installContextValid =
    hasBitrixDomain &&
    installMode &&
    matchedQueryKeys.includes("APP_SID");
  const contextValidatedByParams = strongQuerySignal || installContextValid;
  const bx24ShapeValid =
    bx24Available &&
    typeof currentWindow?.BX24 === "object" &&
    (typeof currentWindow?.BX24?.init === "function" ||
      typeof currentWindow?.BX24?.callMethod === "function" ||
      typeof currentWindow?.BX24?.installFinish === "function");

  return {
    params,
    bx24Available,
    bx24ShapeValid,
    matchedQueryKeys,
    hasQuerySignals,
    strongQuerySignal,
    hasBitrixDomain,
    hasRequiredContextKey,
    contextValidatedByParams,
    insideIframe,
    referrer,
    bitrixReferrer,
    iframeSignal,
    installMode,
    installContextValid,
    domain,
    placement,
    installFlag,
  };
}

export function isInsideBitrix() {
  return getBitrixContextSnapshot().contextValidatedByParams;
}

export function isInstallMode() {
  return getBitrixContextSnapshot().installMode;
}

export function waitForBitrixContext({
  timeoutMs = 4500,
  intervalMs = 125,
} = {}) {
  return new Promise((resolve) => {
    const currentWindow = getGlobalWindow();
    const initialSnapshot = getBitrixContextSnapshot();

    if (!currentWindow) {
      resolve({
        state: BITRIX_CONTEXT_STATES.OUTSIDE,
        snapshot: initialSnapshot,
      });
      return;
    }

    if (initialSnapshot.contextValidatedByParams) {
      resolve({
        state: BITRIX_CONTEXT_STATES.INSIDE,
        snapshot: initialSnapshot,
      });
      return;
    }

    const startedAt = Date.now();
    const timer = currentWindow.setInterval(() => {
      const snapshot = getBitrixContextSnapshot();

      if (snapshot.contextValidatedByParams) {
        currentWindow.clearInterval(timer);
        resolve({
          state: BITRIX_CONTEXT_STATES.INSIDE,
          snapshot,
        });
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        currentWindow.clearInterval(timer);
        resolve({
          state: BITRIX_CONTEXT_STATES.OUTSIDE,
          snapshot,
        });
      }
    }, intervalMs);
  });
}

function initBX24Instance(bx24, initTimeoutMs) {
  return new Promise((resolve, reject) => {
    if (!bx24) {
      reject(new Error("BX24 no esta disponible"));
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
  contextTimeoutMs = 4500,
  contextIntervalMs = 125,
  initTimeoutMs = 4000,
} = {}) {
  const contextCheck = await waitForBitrixContext({
    timeoutMs: contextTimeoutMs,
    intervalMs: contextIntervalMs,
  });

  console.log("[bitrix-bootstrap] context check", {
    state: contextCheck.state,
    matchedQueryKeys: contextCheck.snapshot.matchedQueryKeys,
    hasBitrixDomain: contextCheck.snapshot.hasBitrixDomain,
    hasRequiredContextKey: contextCheck.snapshot.hasRequiredContextKey,
    contextValidatedByParams: contextCheck.snapshot.contextValidatedByParams,
    bx24Available: contextCheck.snapshot.bx24Available,
    bx24ShapeValid: contextCheck.snapshot.bx24ShapeValid,
    insideIframe: contextCheck.snapshot.insideIframe,
    bitrixReferrer: contextCheck.snapshot.bitrixReferrer,
    installMode: contextCheck.snapshot.installMode,
    installContextValid: contextCheck.snapshot.installContextValid,
    placement: contextCheck.snapshot.placement,
    domain: contextCheck.snapshot.domain,
  });

  if (contextCheck.state === BITRIX_CONTEXT_STATES.OUTSIDE) {
    return {
      status: BITRIX_CONTEXT_STATES.OUTSIDE,
      bx24: null,
      context: contextCheck.snapshot,
    };
  }

  const bx24 = getBX24();

  if (!bx24) {
    return {
      status: BITRIX_CONTEXT_STATES.INSIDE,
      bx24: null,
      context: contextCheck.snapshot,
    };
  }

  await initBX24Instance(bx24, initTimeoutMs);

  return {
    status: BITRIX_CONTEXT_STATES.INSIDE,
    bx24,
    context: getBitrixContextSnapshot(),
  };
}
