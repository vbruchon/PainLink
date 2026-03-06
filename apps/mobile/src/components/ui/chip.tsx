import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { clsx } from 'clsx';

type Props = {
  label: string;
  tone?: 'accent' | 'neutral';
};

export const Chip = ({ label, tone = 'accent' }: Props) => {
  return (
    <View
      className={clsx(
        'rounded-full border px-3 py-2',
        tone === 'accent' ? 'bg-accentSoft border-accent/80' : 'bg-white border-muted/20',
      )}
    >
      <Text variant="body">{label}</Text>
    </View>
  );
};
