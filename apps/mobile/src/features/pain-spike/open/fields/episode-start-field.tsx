import { FormControlField } from '@/components/ui/form/form-control-field';
import { OpenPainSpikeForm, OpenPainSpikeFormValues } from '../open-pain-spike-flow';
import { EPISODE_START_PRESETS, EPISODE_START_LABEL, EpisodeStartPreset } from '@painlink/shared';
import { View } from 'react-native';
import { SelectablePill } from '@/components/ui/selectable-pill';

export const EpisodeStartField = ({ form }: { form: OpenPainSpikeForm }) => {
  return (
    <FormControlField<OpenPainSpikeFormValues, EpisodeStartPreset>
      control={form.control}
      name="episodeStart"
      render={({ value, onChange }) => (
        <View className="flex-row flex-wrap gap-3 mt-1">
          {EPISODE_START_PRESETS.map((id) => (
            <SelectablePill
              key={id}
              label={EPISODE_START_LABEL[id]}
              selected={value === id}
              onPress={() => onChange(id)}
              fullWidth={id === 'TODAY_EARLIER'}
            />
          ))}
        </View>
      )}
    />
  );
};
