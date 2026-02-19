import { View } from 'react-native';

import { BodyFrontSvg } from '@/components/body-selector/svg/body-front';
import { BodyBackSvg } from '@/components/body-selector/svg/body-back';
import type { BodyRegionId } from '@painlink/shared';
import type { BodySide } from '@/components/body-selector/body';

type Props = {
  side: BodySide;
  value: BodyRegionId | null;
  onChange: (next: BodyRegionId | null) => void;
  disabled?: boolean;
  maxWidth?: number;
};

export const BodyRegionPicker = ({
  side,
  value,
  onChange,
  disabled = false,
  maxWidth = 320,
}: Props) => {
  const Svg = side === 'front' ? BodyFrontSvg : BodyBackSvg;

  const onPressRegion = (id: BodyRegionId) => {
    if (disabled) return;
    onChange(value === id ? null : id);
  };

  return (
    <View style={{ width: '100%', maxWidth, aspectRatio: 592 / 1130 }}>
      <Svg value={value} disabled={disabled} onPressRegion={onPressRegion} />
    </View>
  );
};
