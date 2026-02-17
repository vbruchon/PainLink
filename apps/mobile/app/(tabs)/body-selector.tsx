import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

import { Text } from '@/components/ui/text';
import { Header } from '@/components/ui/header';
import type { BodyRegionId, BodySide } from '@/components/body-selector/regions';
import { BODY_REGION_LABEL } from '@/components/body-selector/regions';
import { SideToggle } from '@/components/body-selector/side-toggle';
import { BodyRegionPicker } from '@/components/body-selector/body-region-picker';
import { BodySelectionSheet } from '@/components/body-selector/body-selection-sheet';
import { Screen } from '@/components/ui/screen';

export default function BodySelectorScreen() {
  const [side, setSide] = useState<BodySide>('front');
  const [region, setRegion] = useState<BodyRegionId | null>(null);

  const regionLabel = useMemo(() => (region ? BODY_REGION_LABEL[region] : null), [region]);
  const canSave = !!region;

  const onSave = async () => {
    if (!region) return;
    // TODO: persister la zone principale
    // await updateUserPainMainRegion({ region })

    router.back();
  };

  return (
    <View className="flex-1">
      <Screen
        scrollable
        className="flex-1 px-5 pt-6"
        contentStyle={{ paddingBottom: canSave ? 200 : 0 }}
      >
        <Header title="Zone principale" />

        <View className="gap-2">
          <Text variant="strong">Touches la zone la plus gênante aujourd’hui</Text>
          <Text variant="caption">Tu pourras la modifier plus tard.</Text>
        </View>

        <View className="mt-4">
          <SideToggle value={side} onChange={setSide} />
        </View>

        <View className="mt-4 w-full items-center justify-center">
          <BodyRegionPicker side={side} value={region} onChange={setRegion} />
        </View>
      </Screen>

      <BodySelectionSheet
        open={canSave}
        label={regionLabel}
        onClear={() => setRegion(null)}
        onSave={onSave}
      />
    </View>
  );
}
