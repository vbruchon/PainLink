export const PAIN_TYPE_IDS = [
  'COLD_SENSATION',
  'HEAT_SENSATION',
  'BURNING',
  'PRESSURE_CRUSHING',
  'HEAVINESS',
  'TINGLING',
  'ELECTRIC_SHOCK',
  'STABBING',
  'ITCHING',
  'THROBBING',
  'EXPLOSIVE',
  'DIFFUSE',
  'OTHER_UNSURE',
] as const;

export type PainTypeId = (typeof PAIN_TYPE_IDS)[number];

export const PAIN_TYPE_LABEL: Record<PainTypeId, string> = {
  COLD_SENSATION: 'Sensation de froid',
  HEAT_SENSATION: 'Sensation de chaud',
  BURNING: 'Brûlure',
  PRESSURE_CRUSHING: 'Pression / Écrasement',
  HEAVINESS: 'Lourdeur',
  TINGLING: 'Fourmillement',
  ELECTRIC_SHOCK: 'Décharge électrique',
  STABBING: 'Coup de poignard',
  ITCHING: 'Démangeaison',
  THROBBING: 'Pulsatile',
  EXPLOSIVE: 'Explosive',
  DIFFUSE: 'Diffuse',
  OTHER_UNSURE: 'Autre / Je ne sais pas',
};
