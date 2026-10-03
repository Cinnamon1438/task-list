const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Helper terpusat untuk HTTP Request ke Laravel Backend
 */
export async function apiFetch(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // Pastikan tidak tersimpan di cache saat server-side rendering
    cache: 'no-store',
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  return response;
}
