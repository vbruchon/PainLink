import type { OpenPainSpikeInput } from '@painlink/shared';
import { apiFetch } from '@/lib/api/api-client';

export const openPainSpike = (input: OpenPainSpikeInput) => {
  return apiFetch('/api/pain-spike/open', {
    method: 'POST',
    body: JSON.stringify(input),
  });
};

export type PainSpikeStatus = {
  hasOpen: boolean;
  openId: string | null;
};

export const getPainSpikeStatus = () => {
  return apiFetch<PainSpikeStatus>('/api/pain-spike/status');
};
