import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { clsx } from 'clsx';

export const RadioCard = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        'flex-row items-center gap-3 rounded-2xl border bg-white px-4 py-4',
        active ? 'border-secondary' : 'border-muted/20',
      )}
    >
      <View
        className={clsx(
          'h-5 w-5 rounded-full border border-slate-400',
          active ? 'bg-secondary' : 'bg-white',
        )}
      />
      <Text variant="strong">{label}</Text>
    </Pressable>
  );
};
