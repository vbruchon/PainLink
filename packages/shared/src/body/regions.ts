export const BODY_REGION_IDS = [
  'head',
  'neck',
  'shoulder_left',
  'shoulder_right',
  'upper_arm_left',
  'upper_arm_right',
  'lower_arm_left',
  'lower_arm_right',
  'hand_left',
  'hand_right',
  'chest',
  'belly',
  'upper_back',
  'lower_back',
  'thigh_left',
  'thigh_right',
  'lower_leg_left',
  'lower_leg_right',
  'foot_left',
  'foot_right',
] as const;

export type BodyRegionId = (typeof BODY_REGION_IDS)[number];

export const BODY_REGION_LABEL: Record<BodyRegionId, string> = {
  head: 'Tête',
  neck: 'Cou',
  shoulder_left: 'Épaule gauche',
  shoulder_right: 'Épaule droite',
  upper_arm_left: 'Bras (haut) gauche',
  upper_arm_right: 'Bras (haut) droit',
  lower_arm_left: 'Avant-bras gauche',
  lower_arm_right: 'Avant-bras droit',
  hand_left: 'Main gauche',
  hand_right: 'Main droite',
  chest: 'Poitrine',
  belly: 'Ventre',
  upper_back: 'Haut du dos',
  lower_back: 'Bas du dos',
  thigh_left: 'Cuisse gauche',
  thigh_right: 'Cuisse droite',
  lower_leg_left: 'Jambe (bas) gauche',
  lower_leg_right: 'Jambe (bas) droite',
  foot_left: 'Pied gauche',
  foot_right: 'Pied droit',
};

export type SectionKey = 'TETE' | 'BRAS' | 'TRONC' | 'JAMBES' | 'AUTRE';

export const sectionTitle: Record<SectionKey, string> = {
  TETE: 'Tête & cou',
  BRAS: 'Bras',
  TRONC: 'Tronc',
  JAMBES: 'Jambes',
  AUTRE: 'Autres',
};

export const getSectionKey = (id: BodyRegionId): SectionKey => {
  const s = String(id);

  if (s.includes('head') || s.includes('neck') || s.includes('face')) return 'TETE';
  if (
    s.includes('arm') ||
    s.includes('hand') ||
    s.includes('wrist') ||
    s.includes('elbow') ||
    s.includes('shoulder')
  )
    return 'BRAS';
  if (s.includes('back') || s.includes('chest') || s.includes('abdomen') || s.includes('belly'))
    return 'TRONC';
  if (
    s.includes('leg') ||
    s.includes('knee') ||
    s.includes('ankle') ||
    s.includes('foot') ||
    s.includes('thigh')
  )
    return 'JAMBES';

  return 'AUTRE';
};
