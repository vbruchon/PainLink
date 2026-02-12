import { View, Image } from 'react-native';
import { Link } from 'expo-router';

import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { Header } from '@/components/ui/header';
import { SignUpForm } from '@/components/auth/sign-up-form';

export default function SignUpScreen() {
  return (
    <Screen className="px-5 pt-6">
      <Header title="Inscription" />

      <View className="mb-8">
        <Text variant="body" className="text-muted">
          Trois informations pour commencer.
        </Text>
      </View>

      <SignUpForm />

      <View className="flex-row items-center my-8">
        <View className="flex-1 h-px bg-border" />
        <Text variant="caption" className="mx-3">
          Ou s’inscrire avec
        </Text>
        <View className="flex-1 h-px bg-border" />
      </View>

      <View className="mt-6 flex-row justify-center gap-1">
        <Text variant="small" className="text-muted">
          Tu as déjà un compte ?
        </Text>
        <Link href="/sign-in">
          <Text variant="small" className="text-primary font-semibold">
            Connecte-toi !
          </Text>
        </Link>
      </View>

      <View className="mt-8 absolute -bottom-10 -right-10">
        <Image
          source={require('../../assets/images/mascotte/Painlink_Nexi_Heureux.png')}
          resizeMode="contain"
          className="size-[200px] -rotate-12"
          accessibilityIgnoresInvertColors
        />
      </View>
    </Screen>
  );
}
