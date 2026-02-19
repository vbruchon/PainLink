import { View } from 'react-native';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/auth/auth-client';
import { useAuth } from '@/providers/auth-provider';
import { getUser } from '@/lib/user/user-api';
import { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string | null;
  email: string;
  mainPainZone: string | null;
};

export default function TestAuth() {
  const { data } = useSession();
  const { signOut } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await getUser();
        setUser(me);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <Screen className="flex-1 px-6 pt-10">
      <View className="flex-1 gap-8">
        <View className="items-center gap-2">
          <Text className="text-2xl font-bold">Test Auth</Text>
          <Text className="text-base opacity-60">Vérification session & profil utilisateur</Text>
        </View>

        <View className="bg-card rounded-2xl p-5 gap-2 border">
          <Text className="text-sm opacity-60">Session</Text>
          <Text className="text-base">
            {data ? data.session.userAgent : 'Aucune session active'}
          </Text>
        </View>

        <View className="bg-card rounded-2xl p-5 gap-2 border">
          <Text className="text-sm opacity-60">Utilisateur</Text>

          {loading ? (
            <Text>Chargement...</Text>
          ) : user ? (
            <>
              <Text>Nom : {user.name}</Text>
              <Text>Email : {user.email}</Text>
              <Text>Main Pain Zone : {user.mainPainZone ?? 'Non définie'}</Text>
            </>
          ) : (
            <Text>Aucun utilisateur récupéré</Text>
          )}
        </View>

        <View className="flex-1" />

        <Button variant="secondary" onPress={signOut}>
          Se déconnecter
        </Button>
      </View>
    </Screen>
  );
}
