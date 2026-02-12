export type AuthStatus = 'loading' | 'guest' | 'authenticated';

export function getRedirectForLayouts(params: {
  status: AuthStatus;
  inAuthGroup: boolean;
  inTabsGroup: boolean;
}) {
  const { status, inAuthGroup, inTabsGroup } = params;

  if (status === 'authenticated' && inAuthGroup) return '/(tabs)';
  if (status !== 'authenticated' && inTabsGroup) return '/(auth)/welcome';

  return null;
}
