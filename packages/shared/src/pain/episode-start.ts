export const EPISODE_START_PRESETS = [
  'NOW',
  'MIN_15',
  'HOUR_1',
  'HOUR_3',
  'TODAY_EARLIER',
  'LAST_NIGHT',
  'YESTERDAY',
] as const;

export type EpisodeStartPreset = (typeof EPISODE_START_PRESETS)[number];

export const EPISODE_START_LABEL: Record<EpisodeStartPreset, string> = {
  NOW: 'Maintenant',
  MIN_15: 'Il y a 15 min',
  HOUR_1: 'Il y a 1 h',
  HOUR_3: 'Il y a 3 h',
  TODAY_EARLIER: 'Aujourd’hui (plus tôt)',
  LAST_NIGHT: 'La nuit dernière',
  YESTERDAY: 'Hier',
};
