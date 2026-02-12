import { View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { Header } from '@/components/ui/header';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export default function ForgotPasswordScreen() {
  return (
    <Screen className="px-5 pt-6">
      <Header title="Mot de passe oublié" />

      <View className="mb-6">
        <Text variant="body" className="text-muted">
          On t’envoie un lien pour choisir un nouveau mot de passe.
        </Text>
      </View>

      <ForgotPasswordForm />
    </Screen>
  );
}
