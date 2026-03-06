import { useEffect } from 'react';
import { Image, View } from 'react-native';
import { Href, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/ui/header';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

import { hapticError } from '@/lib/haptics/haptics';

export default function NetworkErrorScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  useEffect(() => {
    void hapticError();
  }, []);

  const rawRetryTo = params.retryTo;
  const retryTo = Array.isArray(rawRetryTo) ? rawRetryTo[0] : rawRetryTo;

  const onRetry = () => {
    if (typeof retryTo === 'string' && retryTo.length > 0) {
      router.replace(retryTo as Href);
      return;
    }
    router.back();
  };

  const onHome = () => {
    router.replace('/(tabs)' as Href);
  };

  return (
    <Screen>
      <Header title="" />

      <View className="flex-1 px-6 justify-center">
        <View className="items-center">
          <Text className="text-2xl font-semibold">Oups…</Text>

          <Image
            source={require('@/assets/images/mascotte/Painlink_Nexi_Bug.png')}
            resizeMode="contain"
            className="h-64 w-64"
            accessibilityIgnoresInvertColors
          />

          <View className="mt-4 items-center">
            <Text className="text-center font-medium">La sauvegarde a rencontré un souci</Text>

            <Text className="mt-2 text-center text-muted-foreground">
              Vérifie ta connexion internet et réessaie.
            </Text>
          </View>
        </View>
      </View>

      <View style={{ paddingBottom: Math.max(insets.bottom, 16) + 16 }} className="px-6">
        <View className="gap-3">
          <Button onPress={onRetry}>Réessayer</Button>

          <Button variant="secondary" onPress={onHome}>
            Retourner à l’accueil
          </Button>
        </View>
      </View>
    </Screen>
  );
}
