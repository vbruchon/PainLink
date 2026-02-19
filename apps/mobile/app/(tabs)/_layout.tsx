import { Redirect, Tabs } from 'expo-router';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { getRedirectForLayouts } from '@/lib/auth/guard';
import { HapticTab } from '@/components/haptic-tab';
import { useAuth } from '@/providers/auth-provider';
import { useUser } from '@/hooks/use-user';

export default function TabLayout() {
  const { status } = useAuth();

  const { user, loading } = useUser();

  const redirect = getRedirectForLayouts({
    status,
    inAuthGroup: false,
    inTabsGroup: true,
    inOnboardingGroup: false,
    user,
    userLoading: loading,
  });

  if (redirect) return <Redirect href={redirect} />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'hsl(173 70% 43%)',
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
