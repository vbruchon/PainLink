import { useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { useAuth } from '@/providers/auth-provider';

SplashScreen.preventAutoHideAsync().catch(() => {});

export const useAuthBootstrap = () => {
  const { initSession } = useAuth();

  const [ready, setReady] = useState(false);

  const didInitRef = useRef(false);
  const didHideSplashRef = useRef(false);

  // ---------- Boot ----------
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    let cancelled = false;

    (async () => {
      try {
        await initSession();
      } finally {
        if (!cancelled) setReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [initSession]);

  useEffect(() => {
    if (!ready) return;
    if (didHideSplashRef.current) return;
    didHideSplashRef.current = true;

    SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  return { ready };
};
