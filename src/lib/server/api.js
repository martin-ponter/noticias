export async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function getQueryParam(url, key) {
  return new URL(url).searchParams.get(key);
}

export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value;
}