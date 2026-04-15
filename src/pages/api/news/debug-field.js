import { crmItemFields } from "../../../lib/server/bitrix-rest.js";
import { BITRIX_APP_CONFIG } from "../../../config/bitrixConfig.js";
import { json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const GET = async () => {
  try {
    const fields = await crmItemFields(BITRIX_APP_CONFIG.ENTITY_TYPE_ID);

    return json({
      ok: true,
      type: typeof fields,
      isArray: Array.isArray(fields),
      keys: fields && typeof fields === "object" ? Object.keys(fields) : [],
      sample: fields,
    });
  } catch (error) {
    return serverError(error?.message || "No se pudo leer crm.item.fields");
  }
};