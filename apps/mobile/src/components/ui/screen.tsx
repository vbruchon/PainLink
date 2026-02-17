import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { clsx } from 'clsx';

type Props = {
  scrollable?: boolean;
  className?: string;
  contentClassName?: string;
  contentStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export const Screen = ({
  scrollable = false,
  className,
  contentClassName,
  contentStyle,
  children,
}: Props) => {
  return (
    <SafeAreaView className={clsx('flex-1 bg-background', className)}>
      {scrollable ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName={clsx('p-4', contentClassName)}
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View className={clsx('flex-1 p-4', contentClassName)} style={contentStyle}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
};
