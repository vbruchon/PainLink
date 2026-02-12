import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { useSession } from '@/lib/auth/auth-client';

export default function HomeScreen() {
  const { data } = useSession();
  return (
    <Screen className="items-center justify-center">
      <Text variant="h1">Welcome {data?.user.name} </Text>
    </Screen>
  );
}
