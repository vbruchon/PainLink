import { BodyRegionId, mainPainZoneSchema } from '@painlink/shared';
import { apiFetch } from '@/lib/api/api-client';

export const updateMainPainZone = (mainPainZone: BodyRegionId) => {
  const payload = mainPainZoneSchema.parse({ mainPainZone });

  return apiFetch<{ ok: true }>('/api/user/main-pain-zone', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};
