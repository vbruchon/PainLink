import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/providers/auth-provider';
import { getRedirectForLayouts } from '@/lib/auth/guard';

export default function AuthLayout() {
  const { status } = useAuth();
  const redirect = getRedirectForLayouts({ status, inAuthGroup: true, inTabsGroup: false });

  if (redirect) return <Redirect href={redirect} />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
