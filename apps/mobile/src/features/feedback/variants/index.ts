import type { SuccessVariant, SuccessId } from './types';
import { painSpikeSuccessVariants } from './pain-spike.success';

export const SUCCESS_VARIANTS: Record<SuccessId | 'default', SuccessVariant> = {
  ...painSpikeSuccessVariants,
  default: {
    title: 'Enregistré',
    description: 'Ton action a bien été prise en compte.',
    ctaLabel: 'Retour à l’accueil',
    autoRedirectMs: 5000,
    redirectTo: '/(tabs)',
    nexiImage: require('@/assets/images/mascotte/Painlink_Nexi_Heureux.png'),
  },
};
