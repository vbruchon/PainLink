import { Pressable, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { Text } from '@/components/ui/text';
import { IconSymbol } from '@/components/ui/icon-symbol';

export type TabBarTheme = {
  surface?: string;
  secondary: string;
  muted: string;
};

type Props = {
  routeKey: string;
  theme: TabBarTheme;

  state: BottomTabBarProps['state'];
  descriptors: BottomTabBarProps['descriptors'];
  navigation: BottomTabBarProps['navigation'];

  onAnyPress?: () => void;
};

export const TabBarItem = ({
  routeKey,
  theme,
  state,
  descriptors,
  navigation,
  onAnyPress,
}: Props) => {
  const routeIndex = state.routes.findIndex((r) => r.key === routeKey);
  if (routeIndex === -1) return null;

  const route = state.routes[routeIndex];
  const descriptor = descriptors[route.key];
  if (!descriptor) return null;

  const isFocused = state.index === routeIndex;
  const options = descriptor.options;

  const label = String(options.title ?? route.name);
  const color = isFocused ? theme.secondary : theme.muted;

  const onPress = async () => {
    onAnyPress?.();

    await Haptics.selectionAsync();

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      className="flex-1 min-w-16 items-center justify-center gap-1"
    >
      <View className="h-8 flex items-center justify-center">
        {options.tabBarIcon ? (
          options.tabBarIcon({ focused: isFocused, color, size: 26 })
        ) : (
          <IconSymbol name="chevron.right" size={22} color={color} />
        )}
      </View>

      <Text
        style={{ color }}
        className="text-[13px] leading-[15px] font-semibold"
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
};
