import { z } from 'zod';
import { BODY_REGION_IDS } from '../body/regions';

export const mainPainZoneSchema = z.object({
  mainPainZone: z.enum(BODY_REGION_IDS),
});
