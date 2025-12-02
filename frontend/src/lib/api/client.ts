export const API_URL =  import.meta.env.VITE_API_URL || "https://api.jobresultdekho.com/api";
console.log("API URL:", API_URL);

// GET wrapper
export async function apiGet<T>(endpoint: string, customFetch: typeof fetch = fetch): Promise<T> {
  const res = await customFetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return (json.data ?? json) as T;
}

// POST wrapper
export async function apiPost<T>(endpoint: string, body: any, customFetch: typeof fetch = fetch): Promise<T> {
  const res = await customFetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return (json.data ?? json) as T;
}

// PUT wrapper
export async function apiPut<T>(endpoint: string, body: any, customFetch: typeof fetch = fetch): Promise<T> {
  const res = await customFetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return (json.data ?? json) as T;
}

// DELETE wrapper
export async function apiDelete<T>(endpoint: string, customFetch: typeof fetch = fetch): Promise<T> {
  const res = await customFetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return (json.data ?? json) as T;
}
