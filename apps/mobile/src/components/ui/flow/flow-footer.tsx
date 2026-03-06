import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../button';

type SideAction = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'outline' | 'ghost';
};

type PrimaryAction = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

type Props = {
  left?: SideAction; // Exit / previous
  primary: PrimaryAction; // next / open spike
};

export const FlowFooter = ({ left, primary }: Props) => {
  const insets = useSafeAreaInsets();

  const leftDisabled = left?.disabled;
  const primaryDisabled = primary.disabled || primary.loading;

  return (
    <View
      className="absolute left-0 right-0 -bottom-8 px-5 bg-background border-t-2 border-secondary/20"
      style={{ paddingBottom: insets.bottom }}
    >
      <View className="pt-3">
        <View className="flex-row items-center justify-between gap-3">
          {left ? (
            <Button variant="ghost" onPress={left.onPress} disabled={leftDisabled}>
              {left.label}
            </Button>
          ) : (
            <View className="flex-1" />
          )}

          <Button
            variant="primary"
            onPress={primary.onPress}
            disabled={primaryDisabled}
            className="flex-1"
          >
            {primary.label}
          </Button>
        </View>
      </View>
    </View>
  );
};
