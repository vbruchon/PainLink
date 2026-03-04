import type { OpenPainSpikeInput } from '@painlink/shared';
import { apiFetch } from '@/lib/api/api-client';

export const openPainSpike = (input: OpenPainSpikeInput) => {
  return apiFetch('/api/pain-spike/open', {
    method: 'POST',
    body: JSON.stringify(input),
  });
};
