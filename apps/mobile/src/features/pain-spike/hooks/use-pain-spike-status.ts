import { useEffect, useState } from 'react';
import { ApiError } from '@/lib/api/api-error';
import { getPainSpikeStatus } from '@/lib/pain/pain-spike-api';

type State = {
  loading: boolean;
  hasOpen: boolean;
  openId: string | null;
  error: 'NETWORK' | 'UNKNOWN' | null;
};

export function usePainSpikeStatus(open: boolean) {
  const [state, setState] = useState<State>({
    loading: false,
    hasOpen: false,
    openId: null,
    error: null,
  });

  useEffect(() => {
    if (!open) return;

    let active = true;

    (async () => {
      setState((s) => ({ ...s, loading: true, error: null }));

      try {
        const res = await getPainSpikeStatus();
        if (!active) return;

        setState({
          loading: false,
          hasOpen: res.hasOpen,
          openId: res.openId,
          error: null,
        });
      } catch (err) {
        if (!active) return;

        const isNetwork = err instanceof ApiError && err.code === 'NETWORK_ERROR';

        setState((s) => ({
          ...s,
          loading: false,
          error: isNetwork ? 'NETWORK' : 'UNKNOWN',
        }));
      }
    })();

    return () => {
      active = false;
    };
  }, [open]);

  return state;
}
