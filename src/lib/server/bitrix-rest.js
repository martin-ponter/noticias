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
    entityTypeId: Number(entityTypeId),
    ...params,
  });
}

export async function crmItemGet(entityTypeId, id, params = {}) {
  return await callBitrix("crm.item.get", {
    entityTypeId: Number(entityTypeId),
    id: Number(id),
    ...params,
  });
}

export async function crmItemAdd(entityTypeId, fields) {
  return await callBitrix("crm.item.add", {
    entityTypeId: Number(entityTypeId),
    fields,
  });
}

export async function crmItemUpdate(entityTypeId, id, fields) {
  return await callBitrix("crm.item.update", {
    entityTypeId: Number(entityTypeId),
    id: Number(id),
    fields,
  });
}

export async function crmItemFields(entityTypeId) {
  return await callBitrix("crm.item.fields", {
    entityTypeId: Number(entityTypeId),
  });
}