import type { Href } from 'expo-router';

type Args = {
  status: 'loading' | 'authenticated' | 'guest';
  inAuthGroup: boolean;
  inTabsGroup: boolean;
  inOnboardingGroup?: boolean;
  user?: { mainPainZone: string | null } | null;
  userLoading?: boolean;
};

export const getRedirectForLayouts = (args: Args): Href | null => {
  const { status, inAuthGroup, inOnboardingGroup, user, userLoading } = args;

  if (status === 'loading') return null;

  if (status !== 'authenticated') {
    if (!inAuthGroup) return '/(auth)/welcome';
    return null;
  }

  if (userLoading) return null;

  const needsOnboarding = !user?.mainPainZone;

  if (needsOnboarding) {
    if (!inOnboardingGroup) return '/onboarding/body-selector';
    return null;
  }

  if (inAuthGroup) return '/(tabs)';

  return null;
};
