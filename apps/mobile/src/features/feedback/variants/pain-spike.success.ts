import { SuccessId, type SuccessVariant } from './types';

const goToHome = '/(tabs)';
const defaultDelay = 5000;

export const painSpikeSuccessVariants: Record<SuccessId, SuccessVariant> = {
  'open-pain-spike': {
    title: 'Pic de douleur enregistré',
    description:
      'Nous avons bien noté ton pic de douleur.\nNous restons à tes côtés pour suivre son évolution.',
    ctaLabel: 'Retour à l’accueil',
    autoRedirectMs: defaultDelay,
    redirectTo: goToHome,
    nexiImage: require('@/assets/images/mascotte/Painlink_Nexi_Pain_Spike.png'),
  },
};
