export type BodySide = 'front' | 'back';

export type BodyRegionId =
  | 'head'
  | 'neck'
  | 'shoulder_left'
  | 'shoulder_right'
  | 'upper_arm_left'
  | 'upper_arm_right'
  | 'lower_arm_left'
  | 'lower_arm_right'
  | 'hand_left'
  | 'hand_right'
  // FRONT
  | 'chest'
  | 'belly'
  // BACK
  | 'upper_back'
  | 'lower_back'
  //
  | 'thigh_left'
  | 'thigh_right'
  | 'lower_leg_left'
  | 'lower_leg_right'
  | 'foot_left'
  | 'foot_right';

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

  // FRONT
  chest: 'Poitrine',
  belly: 'Ventre',

  // BACK
  upper_back: 'Haut du dos',
  lower_back: 'Bas du dos',

  thigh_left: 'Cuisse gauche',
  thigh_right: 'Cuisse droite',

  lower_leg_left: 'Jambe (bas) gauche',
  lower_leg_right: 'Jambe (bas) droite',

  foot_left: 'Pied gauche',
  foot_right: 'Pied droit',
};

export const BILATERAL_REGIONS: BodyRegionId[] = [
  'shoulder_left',
  'shoulder_right',
  'upper_arm_left',
  'upper_arm_right',
  'lower_arm_left',
  'lower_arm_right',
  'hand_left',
  'hand_right',
  'thigh_left',
  'thigh_right',
  'lower_leg_left',
  'lower_leg_right',
  'foot_left',
  'foot_right',
];
