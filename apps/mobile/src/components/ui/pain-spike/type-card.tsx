import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { clsx } from 'clsx';
import { hapticSelection } from '@/lib/haptics/haptics';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export const TypeCard = ({ label, selected, onPress }: Props) => {
  const handlePress = () => {
    hapticSelection();
    onPress();
  };

  return (
    <Pressable onPress={handlePress} className="active:opacity-80">
      <View
        className={clsx(
          'items-center justify-center rounded-2xl px-4 py-4 shadow-sm min-h-[75px] border',
          selected ? 'bg-accentSoft border-accent border-2' : 'bg-surface border-border',
        )}
      >
        <Text variant="strong" className="text-center">
          {label}
        </Text>
      </View>
    </Pressable>
  );
};
