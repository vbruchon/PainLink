import { router } from 'expo-router';
import type { ImageSourcePropType } from 'react-native';

export type AppHref = Parameters<typeof router.replace>[0];

export type SuccessId = 'open-pain-spike';

export type SuccessVariant = {
  title: string;
  description?: string;
  ctaLabel: string;
  autoRedirectMs?: number;
  redirectTo?: AppHref;
  nexiImage: ImageSourcePropType;
};
