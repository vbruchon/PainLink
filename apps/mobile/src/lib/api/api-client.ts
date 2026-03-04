import { authClient } from '@/lib/auth/auth-client';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
if (!BASE_URL) throw new Error('Missing EXPO_PUBLIC_API_URL');

export class ApiError extends Error {
  status: number;
  code: string;
  issues?: unknown;

  constructor(args: { status: number; code: string; message?: string; issues?: unknown }) {
    super(args.message ?? args.code);
    this.name = 'ApiError';
    this.status = args.status;
    this.code = args.code;
    this.issues = args.issues;
  }
}

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

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError({
      status: res.status,
      code: json?.error ?? `HTTP_${res.status}`,
      message: json?.error ?? `Request failed (${res.status})`,
      issues: json?.issues,
    });
  }

  return json as T;
};
