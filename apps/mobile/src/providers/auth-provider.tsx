import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { authClient } from '@/lib/auth/auth-client';
import type { Session } from 'better-auth';

type AuthStatus = 'loading' | 'authenticated' | 'guest';

type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  emailVerified?: boolean;
  image?: string | null;
};

export type AuthSession = {
  session: Session;
  user: AuthUser;
};

type AuthState = {
  status: AuthStatus;
  data: AuthSession | null;
  initSession: () => Promise<void>;
  refresh: () => Promise<void>;
  setAuth: (data: AuthSession | null) => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

const toAuthSession = (res: unknown): AuthSession | null => {
  if (!res || typeof res !== 'object') return null;

  const data = (res as { data?: unknown }).data;
  if (!data || typeof data !== 'object') return null;

  const s = (data as { session?: unknown }).session;
  const u = (data as { user?: unknown }).user;

  if (!s || !u) return null;

  return {
    session: s as Session,
    user: {
      id: (u as { id: string }).id,
      email: (u as { email: string }).email,
      name: (u as { name?: string | null }).name ?? null,
      emailVerified: (u as { emailVerified?: boolean }).emailVerified,
      image: (u as { image?: string | null }).image ?? null,
    },
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [data, setData] = useState<AuthSession | null>(null);

  const setAuth = useCallback((next: AuthSession | null) => {
    setData(next);
    setStatus(next ? 'authenticated' : 'guest');
  }, []);

  const refresh = useCallback(async () => {
    setStatus('loading');

    try {
      const res = await authClient.getSession();
      const next = toAuthSession(res);
      setAuth(next);
    } catch {
      setAuth(null);
    }
  }, [setAuth]);

  const initSession = refresh;

  const signOut = useCallback(async () => {
    await authClient.signOut();
    setAuth(null);
  }, [setAuth]);

  const value = useMemo(
    () => ({ status, data, initSession, refresh, setAuth, signOut }),
    [status, data, initSession, refresh, setAuth, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
