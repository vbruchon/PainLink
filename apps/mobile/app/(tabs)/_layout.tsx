import { Redirect, Tabs, useRouter } from 'expo-router';
import { Home, Code2 } from 'lucide-react-native';
import { getRedirectForLayouts } from '@/lib/auth/guard';
import { useAuth } from '@/providers/auth-provider';
import { useUser } from '@/hooks/use-user';
import { TabBar } from '@/components/ui/tab-bar/tab-bar';

export default function TabLayout() {
  const router = useRouter();
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
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { position: 'absolute', backgroundColor: 'transparent', borderTopWidth: 0 },
      }}
      tabBar={(props) => <TabBar {...props} onHref={(href) => router.push(href as any)} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <Home size={24} color={color} strokeWidth={focused ? 2.6 : 2} />
          ),
        }}
      />

      <Tabs.Screen
        name="test-auth"
        options={{
          title: 'Test',
          tabBarIcon: ({ color, focused }) => (
            <Code2 size={24} color={color} strokeWidth={focused ? 2.6 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}
