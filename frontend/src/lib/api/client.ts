// src/lib/api/client.ts
export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1337/api';
console.log('API URL:', API_URL);

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data as T;
}
