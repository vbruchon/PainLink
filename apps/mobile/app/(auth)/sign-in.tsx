import { View, Image } from 'react-native';
import { Link } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { Header } from '@/components/ui/header';
import { SignInForm } from '@/components/auth/sign-in-form';

export default function SignInScreen() {
  return (
    <Screen className="relative flex-1 px-5 pt-6">
      <Header title="Connexion" />

      <View className="mb-8">
        <Text variant="body" className="mb-1">
          Ravi de te revoir.
        </Text>
        <Text variant="body" className="text-muted">
          Connecte-toi pour continuer ton suivi.
        </Text>
      </View>

      <SignInForm />

      <View className="flex-row items-center my-8">
        <View className="flex-1 h-px bg-border" />
        <Text variant="caption" className="mx-3">
          Ou se connecter avec
        </Text>
        <View className="flex-1 h-px bg-border" />
      </View>

      <View className="mt-6 flex-row justify-center gap-1">
        <Text variant="small" className="text-muted">
          Tu n’as pas de compte ?
        </Text>
        <Link href="/sign-up">
          <Text variant="small" className="text-primary font-semibold">
            Crées-en un !
          </Text>
        </Link>
      </View>

      <View className="absolute -bottom-8 left-0 right-0 items-center">
        <Image
          source={require('../../assets/images/mascotte/Painlink_Nexi_Salue.png')}
          resizeMode="contain"
          className="size-[220px]"
          accessibilityIgnoresInvertColors
        />
      </View>
    </Screen>
  );
}
