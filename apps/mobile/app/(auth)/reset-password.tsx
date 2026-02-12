import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/ui/header';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export default function ResetPasswordScreen() {
  return (
    <Screen className="px-5 pt-6">
      <Header title="Nouveau mot de passe" />

      <ResetPasswordForm />
    </Screen>
  );
}
