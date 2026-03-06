export const PAIN_INTENSITY_IDS = ['LIGHT', 'MODERATE', 'STRONG', 'VERY_STRONG'] as const;

export type PainIntensityId = (typeof PAIN_INTENSITY_IDS)[number];

export const PAIN_INTENSITY_LABEL: Record<PainIntensityId, string> = {
  LIGHT: 'Légère',
  MODERATE: 'Modérée',
  STRONG: 'Forte',
  VERY_STRONG: 'Très forte',
};
