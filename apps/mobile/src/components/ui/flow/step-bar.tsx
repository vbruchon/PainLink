import { View } from 'react-native';
import { clsx } from 'clsx';

type Props = {
  step: number;
  total: number;
  height?: number;
};

export const StepBar = ({ step, total, height = 10 }: Props) => {
  return (
    <View className="flex-row">
      {Array.from({ length: total }).map((_, i) => {
        const active = i < step;

        return (
          <View key={i} className="flex-1">
            <View
              className={clsx(
                'overflow-hidden rounded-full',
                active ? 'bg-secondary/60' : 'bg-muted/30',
              )}
              style={{ height }}
            >
              {i < total - 1 ? (
                <View
                  className="absolute top-0 -right-1 bg-background"
                  style={{
                    width: height * 1.6,
                    height,
                    transform: [{ skewX: '-25deg' }],
                  }}
                />
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};
