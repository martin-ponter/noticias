import { requireEnv } from "./api.js";

function normalizeBaseUrl(base) {
  return base.endsWith("/") ? base : `${base}/`;
}

export async function callBitrix(method, params = {}) {
  const baseUrl = normalizeBaseUrl(requireEnv("BITRIX_WEBHOOK_BASE"));
  const url = `${baseUrl}${method}.json`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Bitrix devolvió ${response.status} ${response.statusText}: ${text}`
    );
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(
      `Bitrix error: ${data.error_description || data.error || "Error desconocido"}`
    );
  }

  return data.result;
}

export async function crmItemList(entityTypeId, params = {}) {
  return await callBitrix("crm.item.list", {
    entityTypeId,
    ...params,
  });
}

export async function crmItemGet(entityTypeId, id, params = {}) {
  return await callBitrix("crm.item.get", {
    entityTypeId,
    id: Number(id),
    ...params,
  });
}

export async function crmItemAdd(entityTypeId, fields) {
  return await callBitrix("crm.item.add", {
    entityTypeId,
    fields,
  });
}

export async function crmItemUpdate(entityTypeId, id, fields) {
  const result = await callBitrix("crm.item.update", {
    entityTypeId,
    id: Number(id),
    fields,
  });

  console.log("[bitrix-rest] crm.item.update raw result", {
    entityTypeId,
    id: Number(id),
    fields,
    result,
  });

  return result;
}

export async function crmItemFields(entityTypeId) {
  return await callBitrix("crm.item.fields", {
    entityTypeId,
  });
}