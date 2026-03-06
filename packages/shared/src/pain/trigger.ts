export const TRIGGER_IDS = [
  'UNKNOWN',

  'STRESS',
  'EFFORT',
  'POSTURE',
  'MOVEMENT',
  'EMOTION',
  'WEATHER',
  'FATIGUE',
  'PHYSICAL_ACTIVITY',
] as const;

export type TriggerId = (typeof TRIGGER_IDS)[number];

export const TRIGGER_LABEL: Record<TriggerId, string> = {
  UNKNOWN: 'Je ne sais pas',

  STRESS: 'Stress',
  EFFORT: 'Effort',
  POSTURE: 'Posture',
  MOVEMENT: 'Mouvement',
  EMOTION: 'Émotion',
  WEATHER: 'Météo',
  FATIGUE: 'Fatigue',
  PHYSICAL_ACTIVITY: 'Activité physique',
};
