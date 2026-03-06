import type { OpenPainSpikeForm } from '@/features/pain-spike/open/open-pain-spike-flow';
import { BODY_REGION_LABEL } from '@painlink/shared';
import { View, Pressable } from 'react-native';
import { useWatch } from 'react-hook-form';

import { Text } from '@/components/ui/text';
import { Chip } from '@/components/ui/chip';
import { RadiatesField } from '../fields/radiates-field';

type Props = {
  form: OpenPainSpikeForm;
  onPickZones: () => void;
};

export const RadiationZonesStep = ({ form, onPickZones }: Props) => {
  const radiates = useWatch({ control: form.control, name: 'radiates' });
  const zones = useWatch({ control: form.control, name: 'radiationZones' }) ?? [];

  return (
    <View className="flex-1">
      <Text variant="strong">La douleur se propage ?</Text>
      <Text variant="caption" className="mt-2">
        Par exemple : dans le bras, la jambe, le dos…
      </Text>

      <View className="mt-6 gap-3">
        <RadiatesField form={form} onSelectYes={onPickZones} onSelectNo={() => {}} />
      </View>

      {radiates === true ? (
        <View className="mt-6 gap-3">
          <Pressable
            onPress={() => {
              form.clearErrors('radiationZones');
              onPickZones();
            }}
            className="rounded-2xl border border-muted/20 bg-white px-4 py-4"
          >
            <Text variant="strong">
              {zones.length ? 'Modifier les zones' : 'Choisir les zones'}
            </Text>
            <Text className="mt-1">
              {zones.length
                ? `${zones.length} zone(s) sélectionnée(s)`
                : 'Aucune zone sélectionnée'}
            </Text>
          </Pressable>

          {form.formState.errors.radiationZones?.message ? (
            <Text variant="small" className="mt-2 text-red-600">
              {String(form.formState.errors.radiationZones.message)}
            </Text>
          ) : null}

          <View className="flex-row flex-wrap gap-2">
            {zones.map((z) => (
              <Chip key={z} label={BODY_REGION_LABEL[z] ?? z} />
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
};
