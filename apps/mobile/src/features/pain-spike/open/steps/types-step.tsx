import {
  OpenPainSpikeForm,
  OpenPainSpikeFormValues,
} from '@/features/pain-spike/open/open-pain-spike-flow';
import { PAIN_TYPE_IDS, PAIN_TYPE_LABEL, PainTypeId } from '@painlink/shared';
import { View } from 'react-native';
import { FormControlField } from '@/components/ui/form/form-control-field';
import { TypeCard } from '@/components/ui/pain-spike/type-card';
import { Text } from '@/components/ui/text';

const TYPE_OPTIONS = PAIN_TYPE_IDS.map((id) => ({
  value: id,
  label: PAIN_TYPE_LABEL[id],
}));

export const TypesStep = ({ form }: { form: OpenPainSpikeForm }) => {
  return (
    <View className="flex-1 gap-6">
      <View>
        <Text variant="strong">Quel est le type ta douleur ?</Text>
        <Text variant="caption">Plusieurs réponses possibles</Text>
      </View>

      <View className="">
        <FormControlField<OpenPainSpikeFormValues, PainTypeId[]>
          control={form.control}
          name="types"
          render={({ value, onChange }) => {
            const selected = value ?? [];

            const toggle = (id: PainTypeId) => {
              onChange(
                selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id],
              );
            };

            return (
              <View className="flex-row flex-wrap justify-between">
                {TYPE_OPTIONS.map((opt) => {
                  const isOther = opt.value === 'OTHER_UNSURE';

                  return (
                    <View key={opt.value} className={isOther ? 'mb-2 w-full' : 'mb-4 w-[48%]'}>
                      <TypeCard
                        label={opt.label}
                        selected={selected.includes(opt.value)}
                        onPress={() => toggle(opt.value)}
                      />
                    </View>
                  );
                })}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
