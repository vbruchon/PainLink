import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/auth-provider';
import { getUser } from '@/lib/user/user-api';

type User = Awaited<ReturnType<typeof getUser>>;

export const useUser = () => {
  const { status } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(status === 'authenticated');

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (status !== 'authenticated') {
        setUser(null);
        return;
      }

      setLoading(true);
      try {
        const user = await getUser();
        if (!cancelled) setUser(user);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [status]);

  return { user, loading };
};
