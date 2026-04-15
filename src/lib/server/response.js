export function json(data, init = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status: init.status || 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  });
}

export function badRequest(message, extra = {}) {
  return json(
    {
      ok: false,
      error: message,
      ...extra,
    },
    { status: 400 }
  );
}

export function serverError(message, extra = {}) {
  return json(
    {
      ok: false,
      error: message,
      ...extra,
    },
    { status: 500 }
  );
}