import '../global.css';
import 'react-native-reanimated';

import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';

import { AuthProvider } from '@/providers/auth-provider';
import { useAuthBootstrap } from '@/hooks/navigation/use-auth-bootstrap';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutInner() {
  const { ready } = useAuthBootstrap();

  return (
    <View className="flex-1">
      {ready ? (
        <>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen
              name="modal"
              options={{ presentation: 'modal', headerShown: true, title: 'Modal' }}
            />
          </Stack>
          <StatusBar style="auto" />
        </>
      ) : null}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutInner />
    </AuthProvider>
  );
}
