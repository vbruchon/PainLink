import { FormControlField } from '@/components/ui/form/form-control-field';
import { OpenPainSpikeForm, OpenPainSpikeFormValues } from '../open-pain-spike-flow';
import { View } from 'react-native';
import { TextArea } from '@/components/ui/textarea';

export const NoteField = ({ form }: { form: OpenPainSpikeForm }) => {
  return (
    <FormControlField<OpenPainSpikeFormValues, string>
      control={form.control}
      name="note"
      render={({ value, onChange }) => (
        <View className="gap-4">
          <TextArea
            value={value}
            onChangeText={onChange}
            placeholder="Tout détail utile : position, contexte, sensation…"
            minHeight={120}
            maxLength={500}
          />
        </View>
      )}
    />
  );
};
