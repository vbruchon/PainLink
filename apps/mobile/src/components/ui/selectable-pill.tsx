import { Pressable, View } from 'react-native';
import { Text } from './text';
import { clsx } from 'clsx';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  fullWidth?: boolean;
};

export const SelectablePill = ({ label, selected = false, onPress, fullWidth }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={{ flexBasis: fullWidth ? '100%' : '48%' }}
    >
      <View
        className={clsx(
          'px-4 py-3 rounded-full border shadow-sm items-center justify-center',
          selected ? 'bg-accentSoft border-accent/80' : 'bg-white border-muted/20',
        )}
      >
        <Text variant={selected ? 'strong' : 'body'} className="text-center">
          {label}
        </Text>
      </View>
    </Pressable>
  );
};
