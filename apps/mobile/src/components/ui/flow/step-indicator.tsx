import { Image, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { StepBar } from './step-bar';

type Props = {
  step: number;
  total: number;
};

export const StepIndicator = ({ step, total }: Props) => {
  const leftOffset = 112 - 46; // mascotte - overlap

  return (
    <View className="relative pb-2 ">
      <View className="h-24 w-28 z-10 items-center justify-center overflow-hidden">
        <Image
          source={require('../../../assets/images/mascotte/PainLink_Nexi_Thinker.png')}
          resizeMode="contain"
          className="absolute -top-2 size-36"
          accessibilityIgnoresInvertColors
        />
      </View>

      <View className="absolute bottom-2 right-0 pr-5" style={{ left: leftOffset }}>
        <Text variant="caption" className="ml-5">
          Progression
        </Text>

        <View className="mt-3">
          <StepBar step={step} total={total} height={8} />
        </View>
      </View>
    </View>
  );
};
