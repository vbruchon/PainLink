import { FormControlField } from '@/components/ui/form/form-control-field';
import { OpenPainSpikeForm, OpenPainSpikeFormValues } from '../open-pain-spike-flow';
import { TRIGGER_IDS, TRIGGER_LABEL, TriggerId } from '@painlink/shared';
import { View } from 'react-native';
import { SelectablePill } from '@/components/ui/selectable-pill';

export const TriggerField = ({ form }: { form: OpenPainSpikeForm }) => {
  return (
    <FormControlField<OpenPainSpikeFormValues, TriggerId>
      control={form.control}
      name="trigger"
      render={({ value, onChange }) => (
        <View className="flex-row flex-wrap gap-3 mt-1">
          {TRIGGER_IDS.map((id) => (
            <SelectablePill
              key={id}
              label={TRIGGER_LABEL[id]}
              selected={value === id}
              onPress={() => onChange(id)}
              fullWidth={id === 'PHYSICAL_ACTIVITY'}
            />
          ))}
        </View>
      )}
    />
  );
};
