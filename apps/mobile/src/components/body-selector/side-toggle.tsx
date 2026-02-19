import { Pressable, View } from 'react-native';
import type { BodySide } from './body';
import { Text } from '@/components/ui/text';

export const SideToggle = ({
  value,
  onChange,
}: {
  value: BodySide;
  onChange: (v: BodySide) => void;
}) => {
  return (
    <View className="flex-row rounded-full bg-background border border-secondary p-0.5">
      <Pressable
        onPress={() => onChange('front')}
        className={[
          'rounded-full px-2 py-1 flex-1',
          value === 'front' ? 'bg-primary' : 'bg-transparent',
        ].join(' ')}
      >
        <Text className="text-center text-sm">Face</Text>
      </Pressable>

      <Pressable
        onPress={() => onChange('back')}
        className={[
          'rounded-full px-2 py-1 flex-1',
          value === 'back' ? 'bg-primary' : 'bg-transparent',
        ].join(' ')}
      >
        <Text className="text-center text-sm">Dos</Text>
      </Pressable>
    </View>
  );
};
