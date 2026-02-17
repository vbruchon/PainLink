import { useCallback, useMemo } from 'react';
import { useThemeColor } from '@/hooks/use-theme-color';
import { hslToHsla } from '@/utils/convert-hsl';
import { GProps } from 'react-native-svg';
import { type BodyRegionId } from '@painlink/shared';

type Params = {
  value: BodyRegionId | null;
  onPressRegion: (id: BodyRegionId) => void;
  disabled?: boolean;
};

export const useBodySvg = ({ value, onPressRegion, disabled = false }: Params) => {
  const primary = useThemeColor({}, 'primary');
  const accent = useThemeColor({}, 'accent');

  const { DEFAULT_FILL, SELECTED_FILL } = useMemo(
    () => ({
      DEFAULT_FILL: hslToHsla(primary, 0.3),
      SELECTED_FILL: hslToHsla(accent, 0.5),
    }),
    [primary, accent],
  );

  const fillFor = useCallback(
    (id: BodyRegionId) => (value === id ? SELECTED_FILL : DEFAULT_FILL),
    [value, SELECTED_FILL, DEFAULT_FILL],
  );

  const press = useCallback(
    (id: BodyRegionId) => {
      if (disabled) return;
      onPressRegion(id);
    },
    [disabled, onPressRegion],
  );

  const regionProps = useCallback(
    (id: BodyRegionId): GProps =>
      disabled ? { pointerEvents: 'none' } : { pointerEvents: 'auto', onPress: () => press(id) },
    [disabled, press],
  );

  return { fillFor, regionProps, disabled };
};
