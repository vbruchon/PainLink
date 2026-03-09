import type { OpenPainSpikeInput } from '@painlink/shared';
import { apiFetch } from '@/lib/api/api-client';

export const openPainSpike = (input: OpenPainSpikeInput) => {
  return apiFetch('/api/pain-spike/open', {
    method: 'POST',
    body: JSON.stringify(input),
  });
};

export type PainSpikeStatusResponse = {
  hasOpen: boolean;
  openId: string | null;
  openedAt: string | null;
  closedAt: string | null;
  entry: {
    id: string;
    type: 'OPEN' | 'UPDATE' | 'CLOSE';
    occurredAt: string;
    intensity: string;
    painTypes: string[];
    radiationZones: string[];
    trigger: string | null;
    note: string | null;
    createdAt: string;
  } | null;
};

export async function getPainSpikeStatus() {
  return apiFetch<PainSpikeStatusResponse>('/api/pain-spike/status');
}
