import { authClient } from '@/lib/auth/auth-client';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) throw new Error('Missing EXPO_PUBLIC_API_URL');

export const apiFetch = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const cookies = authClient.getCookie();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(cookies ? { Cookie: cookies } : {}),
      ...(options.headers ?? {}),
    },
    credentials: 'omit',
  });

  if (!res.ok) {
    const json = await res.json().catch(() => null);
    throw new Error(json?.error ?? `Request failed (${res.status})`);
  }

  return res.json();
};
