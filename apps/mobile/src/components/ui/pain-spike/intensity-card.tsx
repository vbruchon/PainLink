import type React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { clsx } from 'clsx';
import { hapticSelection } from '@/lib/haptics/haptics';

type SvgLike = React.ComponentType<{
  width?: number;
  height?: number;
}>;

type Props = {
  label: string;
  selected: boolean;
  bg: string;
  DropIcon: SvgLike;
  onPress: () => void;
};

export const IntensityCard = ({ label, selected, bg, DropIcon, onPress }: Props) => {
  const handlePress = () => {
    hapticSelection();
    onPress();
  };

  return (
    <Pressable onPress={handlePress} className="active:opacity-80">
      <View
        className={clsx(
          'flex-row items-center gap-3 rounded-2xl px-4 py-4 shadow-sm border',
          selected ? 'border-accent border-2' : 'border-border',
        )}
        style={{ backgroundColor: bg }}
      >
        <View className={clsx(selected ? 'opacity-100' : 'opacity-60')}>
          <DropIcon width={32} height={32} />
        </View>

        <Text variant="strong">{label}</Text>
      </View>
    </Pressable>
  );
};
