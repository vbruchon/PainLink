import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/providers/auth-provider';
import { useUser } from '@/hooks/use-user';
import { getRedirectForLayouts } from '@/lib/auth/guard';

export default function AuthLayout() {
  const { status } = useAuth();
  const { user, loading } = useUser();

  const redirect = getRedirectForLayouts({
    status,
    inAuthGroup: true,
    inTabsGroup: false,
    inOnboardingGroup: false,
    user,
    userLoading: loading,
  });

  if (redirect) return <Redirect href={redirect} />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
