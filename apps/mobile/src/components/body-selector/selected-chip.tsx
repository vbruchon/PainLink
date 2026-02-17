import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';

export const SelectedChip = ({ label, onClear }: { label: string; onClear: () => void }) => {
  return (
    <View className="flex-row items-center justify-between gap-2 rounded-full bg-accent/20 border border-accent px-3 py-2">
      <Text variant="body">{label}</Text>
      <Pressable
        onPress={onClear}
        hitSlop={10}
        className="size-8 items-center justify-center rounded-full bg-white"
      >
        <Text className="text-xl font-semibold -mt-0.5">×</Text>
      </Pressable>
    </View>
  );
};
