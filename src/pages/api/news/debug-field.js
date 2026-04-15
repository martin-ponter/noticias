import { crmItemFields } from "../../../lib/server/bitrix-rest.js";
import { BITRIX_APP_CONFIG } from "../../../config/bitrixConfig.js";
import { json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const GET = async () => {
  try {
    const fields = await crmItemFields(BITRIX_APP_CONFIG.ENTITY_TYPE_ID);
    const target = fields?.[BITRIX_APP_CONFIG.FIELDS.SYNC_STATUS] || null;

    return json({
      ok: true,
      fieldKey: BITRIX_APP_CONFIG.FIELDS.SYNC_STATUS,
      field: target,
    });
  } catch (error) {
    return serverError(error?.message || "No se pudo leer el campo");
  }
};