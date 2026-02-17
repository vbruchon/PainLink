import '../global.css';
import 'react-native-reanimated';

import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider } from '@/providers/auth-provider';
import { useAuthBootstrap } from '@/hooks/navigation/use-auth-bootstrap';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <AuthProvider>
          <RootLayoutInner />
        </AuthProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
