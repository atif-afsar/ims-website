/*
 * Small client for the Node backend (backend/). Same-origin in production;
 * in development Vite proxies /api to localhost:4000.
 */
const BASE = import.meta.env.VITE_API_URL || "";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(method, path, body) {
  const isForm = body instanceof FormData;
  const res = await fetch(`${BASE}/api${path}`, {
    method,
    credentials: "include",
    headers: body && !isForm ? { "Content-Type": "application/json" } : undefined,
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    /* non-JSON (e.g. the dev proxy can't reach the backend) */
  }
  if (!res.ok || (data === null && text)) throw new ApiError(data?.error || `Request failed (${res.status})`, res.status);
  return data;
}

export const api = {
  get: (path) => request("GET", path),
  post: (path, body = {}) => request("POST", path, body),
  put: (path, body = {}) => request("PUT", path, body),
  del: (path, body) => request("DELETE", path, body),
  upload: (file, folder = "general") => {
    const form = new FormData();
    form.append("file", file);
    return request("POST", `/admin/uploads?folder=${encodeURIComponent(folder)}`, form);
  },
};
