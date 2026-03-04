import type { OpenPainSpikeFormValues } from '@/features/pain-spike/open/open-pain-spike-flow';
import type { OpenPainSpikeInput } from '@painlink/shared';

const toOptionalText = (v: string | undefined | null) => {
  const s = (v ?? '').trim();
  return s.length ? s : undefined;
};

export const mapOpenPainSpike = (values: OpenPainSpikeFormValues): OpenPainSpikeInput => {
  return {
    intensity: values.intensity!,
    painTypes: values.types ?? [],
    radiationZones: values.radiationZones ?? [],
    episodeStart: values.episodeStart,
    trigger: values.trigger,
    note: toOptionalText(values.note),
  };
};
