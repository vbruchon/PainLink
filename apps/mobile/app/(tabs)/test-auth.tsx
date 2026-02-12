import { Button } from 'react-native';
import { useSession } from '@/lib/auth/auth-client';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { useAuth } from '@/providers/auth-provider';

export default function TestAuth() {
  const { data } = useSession();
  const { signOut } = useAuth();

  return (
    <Screen>
      <Button title="Sign up" onPress={() => router.push('/sign-up')} />
      <Button title="Sign in" onPress={() => router.push('/sign-in')} />

      <Text className="text-2xl">Session: {data ? data.user.email : 'no session'}</Text>

      <Button
        title="Logout"
        onPress={async () => {
          await signOut();
        }}
      />
    </Screen>
  );
}
