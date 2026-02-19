import { BodyRegionId, mainPainZoneSchema } from '@painlink/shared';
import { apiFetch } from '@/lib/api/api-client';

type MeResponse = {
  data: {
    id: string;
    name: string | null;
    email: string;
    mainPainZone: BodyRegionId | null;
  } | null;
};

export const getUser = async (): Promise<MeResponse['data']> => {
  const res = await apiFetch<MeResponse>('/api/user/me', { method: 'GET' });
  return res.data;
};

export const updateMainPainZone = (mainPainZone: BodyRegionId) => {
  const payload = mainPainZoneSchema.parse({ mainPainZone });

  return apiFetch<{ ok: true }>('/api/user/main-pain-zone', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};
