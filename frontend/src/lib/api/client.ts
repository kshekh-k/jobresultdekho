// src/lib/api/client.ts
export const API_URL = import.meta.env.VITE_API_URL || 'https://api.jobresultdekho.com/api';
console.log('API URL:', API_URL);

export async function apiGet<T>(endpoint: string, customFetch: typeof fetch = fetch): Promise<T> {
  const res = await customFetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return (json.data ?? json) as T;
}
