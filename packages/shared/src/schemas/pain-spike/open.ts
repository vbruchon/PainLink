import { z } from 'zod';
import { BODY_REGION_IDS } from '../../body/regions';
import { PAIN_INTENSITY_IDS } from '../../pain/intensity';
import { PAIN_TYPE_IDS } from '../../pain/types';
import { EPISODE_START_IDS } from '../../pain/episode-start';
import { TRIGGER_IDS } from '../../pain/trigger';

const PainIntensityEnum = z.enum(PAIN_INTENSITY_IDS);
const PainTypeEnum = z.enum(PAIN_TYPE_IDS);
const BodyRegionEnum = z.enum(BODY_REGION_IDS);
const EpisodeStartEnum = z.enum(EPISODE_START_IDS);
const TriggerEnum = z.enum(TRIGGER_IDS);

export const openPainSpikeSchema = z.object({
  occurredAt: z.coerce.date().optional(),
  intensity: PainIntensityEnum,
  painTypes: z.array(PainTypeEnum).default([]),
  radiationZones: z.array(BodyRegionEnum).default([]),

  episodeStart: EpisodeStartEnum.default('NOW'),

  trigger: TriggerEnum.default('UNKNOWN'),
  note: z.string().trim().min(1).max(1000).optional(),
});

export type OpenPainSpikeInput = z.infer<typeof openPainSpikeSchema>;
