import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

import { getPainSpikeStatus } from '@/lib/pain/pain-spike-api';
import { goNetworkErrorScreen } from '@/features/feedback/variants/navigation';
import { resolveOpenPainSpikeGuardResult } from './open-pain-spike-guard';

export function useGuardOpenPainSpike() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const status = await getPainSpikeStatus();
        if (!active) return;

        const result = resolveOpenPainSpikeGuardResult({
          hasOpen: status.hasOpen,
        });

        if (result.type === 'already-open') {
          Alert.alert(
            'Pic déjà ouvert',
            'Un pic est déjà en cours. Tu peux le mettre à jour ou le clôturer.',
            [{ text: 'OK', onPress: () => router.replace('/(tabs)') }],
          );
        }
      } catch (error) {
        if (!active) return;

        const result = resolveOpenPainSpikeGuardResult({ error });

        if (result.type === 'network-error') {
          goNetworkErrorScreen('/(user-action)/open-pain-spike');
          return;
        }

        if (result.type === 'fallback-tabs') {
          router.replace('/(tabs)');
        }
      } finally {
        if (active) setIsChecking(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [router]);

  return { isChecking };
}
