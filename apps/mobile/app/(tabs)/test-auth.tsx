import { View } from 'react-native';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/auth/auth-client';
import { useAuth } from '@/providers/auth-provider';
import { getUser } from '@/lib/user/user-api';
import { useEffect, useState } from 'react';
import { getPainSpikeStatus, type PainSpikeStatusResponse } from '@/lib/pain/pain-spike-api';

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
  const [painSpikeStatus, setPainSpikeStatus] = useState<PainSpikeStatusResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await getUser();
        setUser(me);

        const status = await getPainSpikeStatus();
        setPainSpikeStatus(status);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <Screen scrollable className="flex-1 px-6 pt-10">
      <View className="flex-1 gap-8">
        <View className="items-center gap-2">
          <Text className="text-2xl font-bold">Test Auth</Text>
          <Text className="text-base opacity-60">
            Vérification session, profil utilisateur et pain spike
          </Text>
        </View>

        <View className="rounded-2xl border bg-card p-5 gap-2">
          <Text className="text-sm opacity-60">Session</Text>
          <Text className="text-base">
            {data ? data.session.userAgent : 'Aucune session active'}
          </Text>
        </View>

        <View className="rounded-2xl border bg-card p-5 gap-2">
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

        <View className="rounded-2xl border bg-card p-5 gap-2">
          <Text className="text-sm opacity-60">Pain Spike Status</Text>

          {loading ? (
            <Text>Chargement...</Text>
          ) : painSpikeStatus ? (
            <>
              <Text>Has open spike : {painSpikeStatus.hasOpen ? 'Oui' : 'Non'}</Text>
              <Text>Open id : {painSpikeStatus.openId ?? 'Aucun'}</Text>
              <Text>Opened at : {painSpikeStatus.openedAt ?? 'Aucun'}</Text>
              <Text>Closed at : {painSpikeStatus.closedAt ?? 'null'}</Text>

              <View className="my-2 h-px bg-border" />

              <Text className="font-medium">Open Entry</Text>

              {painSpikeStatus.entry ? (
                <>
                  <Text>Entry id : {painSpikeStatus.entry.id}</Text>
                  <Text>Type : {painSpikeStatus.entry.type}</Text>
                  <Text>Occurred at : {painSpikeStatus.entry.occurredAt}</Text>
                  <Text>Intensity : {painSpikeStatus.entry.intensity}</Text>
                  <Text>Pain types : {painSpikeStatus.entry.painTypes.join(', ') || 'Aucun'}</Text>
                  <Text>
                    Radiation zones : {painSpikeStatus.entry.radiationZones.join(', ') || 'Aucune'}
                  </Text>
                  <Text>Trigger : {painSpikeStatus.entry.trigger ?? 'null'}</Text>
                  <Text>Note : {painSpikeStatus.entry.note ?? 'null'}</Text>
                  <Text>Entry created at : {painSpikeStatus.entry.createdAt}</Text>
                  <Text>
                    OpenedAt === OccurredAt :{' '}
                    {painSpikeStatus.openedAt === painSpikeStatus.entry.occurredAt ? 'Oui' : 'Non'}
                  </Text>
                </>
              ) : (
                <Text>Aucune entry OPEN disponible</Text>
              )}
            </>
          ) : (
            <Text>Impossible de récupérer le statut</Text>
          )}
        </View>

        <Button variant="secondary" onPress={signOut}>
          Se déconnecter
        </Button>
      </View>
    </Screen>
  );
}
