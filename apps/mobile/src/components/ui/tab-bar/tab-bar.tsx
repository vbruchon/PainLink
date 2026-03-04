import { useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { TabBarItem } from './tab-bar-item';
import { TabBarAddItem } from './tab-bar-add-item';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabBarProps & { onHref: (href: string) => void };

export const TabBar = (props: Props) => {
  const { state, descriptors, navigation, onHref } = props;
  const insets = useSafeAreaInsets();

  const theme = Colors['light'];
  const bottomOffset = insets.bottom;

  const routes = useMemo(() => state.routes.filter((r) => !r.name.startsWith('_')), [state.routes]);

  const mid = Math.ceil(routes.length / 2);
  const leftRoutes = routes.slice(0, mid);
  const rightRoutes = routes.slice(mid);

  return (
    <View style={{ bottom: bottomOffset }} className="absolute left-0 right-0">
      <View
        style={{
          backgroundColor: theme.tabBar ?? theme.background,
          shadowColor: 'hsl(183 98% 22%)',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.45,
          shadowRadius: 40,
          elevation: 10,
        }}
        className="mx-4 flex-row items-center rounded-3xl px-4 pb-3 pt-2"
      >
        <View className="flex-1 flex-row justify-between gap-1.5">
          {leftRoutes.map((r) => (
            <TabBarItem
              key={r.key}
              routeKey={r.key}
              theme={theme}
              state={state}
              descriptors={descriptors}
              navigation={navigation}
            />
          ))}
        </View>

        <View className="w-[84px]" />

        <View className="flex-1 flex-row justify-between gap-1.5">
          {rightRoutes.map((r) => (
            <TabBarItem
              key={r.key}
              routeKey={r.key}
              theme={theme}
              state={state}
              descriptors={descriptors}
              navigation={navigation}
            />
          ))}
        </View>
      </View>

      <TabBarAddItem theme={theme} barBottomOffset={bottomOffset} onNavigate={onHref} />
    </View>
  );
};
