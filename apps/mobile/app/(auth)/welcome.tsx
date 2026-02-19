import React from 'react';
import { Image, View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export const unstable_settings = {
  anchor: 'welcome',
};

const WelcomeScreen = () => {
  return (
    <Screen className="flex-1">
      <View className="flex-1 items-center justify-center px-8">
        <Image
          source={require('../../src/assets/images/splash-icon.png')}
          className="size-40"
          resizeMode="contain"
          accessibilityRole="image"
          accessibilityLabel="PainLink"
        />
        <View className="h-4" />
        <Text className="text-center text-base leading-6 text-teal-950/80">
          Bienvenue sur PainLink,{'\n'}
          L’application qui t’aide à suivre tes{'\n'}
          douleurs au quotidien et facilite la{'\n'}
          communication avec tes praticiens.
        </Text>
        <View className="h-10" />
        <View className="w-full max-w-[320px] gap-4">
          <Button className="h-12 rounded-full" onPress={() => router.push('/sign-in')}>
            Connexion
          </Button>

          <Button
            variant="secondary"
            className="h-12 rounded-full"
            onPress={() => router.push('/sign-up')}
          >
            Inscription
          </Button>
        </View>
      </View>
    </Screen>
  );
};

export default WelcomeScreen;
