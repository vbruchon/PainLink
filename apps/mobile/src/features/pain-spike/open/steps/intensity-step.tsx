import {
  OpenPainSpikeForm,
  OpenPainSpikeFormValues,
} from '@/features/pain-spike/open/open-pain-spike-flow';
import { PAIN_INTENSITY_IDS, PAIN_INTENSITY_LABEL, PainIntensityId } from '@painlink/shared';
import { View } from 'react-native';
import { FormControlField } from '@/components/ui/form/form-control-field';
import { IntensityCard } from '@/components/ui/pain-spike/intensity-card';
import { Text } from '@/components/ui/text';
import { PAIN_INTENSITY_UI } from '@/lib/pain/intensity-ui';

const INTENSITY_OPTIONS = PAIN_INTENSITY_IDS.map((id) => ({
  value: id,
  label: PAIN_INTENSITY_LABEL[id],
  ...PAIN_INTENSITY_UI[id],
}));

export const IntensityStep = ({ form }: { form: OpenPainSpikeForm }) => {
  return (
    <View className="flex-1 gap-6">
      <View>
        <Text variant="strong">Quel est l&apos;intensité ta douleur ?</Text>
        <Text variant="caption">Sélectionne l’intensité actuelle que tu ressens.</Text>
      </View>

      <View>
        <FormControlField<OpenPainSpikeFormValues, PainIntensityId | null>
          control={form.control}
          name="intensity"
          render={({ value, onChange }) => (
            <View className="gap-4">
              {INTENSITY_OPTIONS.map((opt) => (
                <IntensityCard
                  key={opt.value}
                  label={opt.label}
                  selected={value === opt.value}
                  bg={opt.bg}
                  DropIcon={opt.DropIcon}
                  onPress={() => onChange(opt.value)}
                />
              ))}
            </View>
          )}
        />
      </View>
    </View>
  );
};
