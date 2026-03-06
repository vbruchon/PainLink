import type {
  OpenPainSpikeForm,
  OpenPainSpikeFormValues,
} from '@/features/pain-spike/open/open-pain-spike-flow';
import { View } from 'react-native';
import { FormControlField } from '@/components/ui/form/form-control-field';
import { RadioCard } from '@/components/ui/radio-card';

export const RadiatesField = ({
  form,
  onSelectYes,
  onSelectNo,
}: {
  form: OpenPainSpikeForm;
  onSelectYes: () => void;
  onSelectNo: () => void;
}) => {
  return (
    <FormControlField<OpenPainSpikeFormValues, boolean | null>
      control={form.control}
      name="radiates"
      render={({ value, onChange }) => (
        <View className="gap-3">
          <RadioCard
            label="Oui"
            active={value === true}
            onPress={() => {
              const wasTrue = value === true;
              onChange(true);
              form.clearErrors('radiationZones');
              if (!wasTrue) onSelectYes();
            }}
          />
          <RadioCard
            label="Non"
            active={value === false}
            onPress={() => {
              onChange(false);
              form.setValue('radiationZones', [], { shouldValidate: true });
              form.clearErrors('radiationZones');
              onSelectNo();
            }}
          />
        </View>
      )}
    />
  );
};
