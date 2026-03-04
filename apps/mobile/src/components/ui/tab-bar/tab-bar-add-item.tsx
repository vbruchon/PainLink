import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { ChevronRight, Plus, Code2, Droplet } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import type { LucideIcon } from 'lucide-react-native';

type ActionItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

const ACTIONS: ActionItem[] = [
  {
    label: 'Aller sur Test Auth',
    icon: Code2,
    href: 'test-auth',
  },
  {
    label: 'Ouvrir un pic de douleur',
    icon: Droplet,
    href: '/(user-action)/open-pain-spike',
  },
];

type Props = {
  theme: any;
  barBottomOffset: number;
  onOpenChange?: (open: boolean) => void;
  onNavigate: (href: string) => void;
};

export const TabBarAddItem = ({ theme, barBottomOffset, onOpenChange, onNavigate }: Props) => {
  const insets = useSafeAreaInsets();

  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    onOpenChange?.(open);

    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: open ? 170 : 140,
      easing: open ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [open, anim, onOpenChange]);

  const menuStyle = useMemo(() => {
    const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });
    const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.98, 1] });
    return { opacity: anim, transform: [{ translateY }, { scale }] };
  }, [anim]);

  const backdropOpacity = useMemo(() => {
    return anim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.25] });
  }, [anim]);

  const close = () => setOpen(false);

  const toggle = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    setOpen((v) => !v);
  };

  const runAction = async (a: ActionItem) => {
    try {
      await Haptics.selectionAsync();
    } catch {}
    close();
    onNavigate(a.href);
  };

  const menuBottom = barBottomOffset + 78;

  return (
    <>
      <Modal visible={open} transparent animationType="none" onRequestClose={close}>
        <View className="flex-1">
          <Pressable className="absolute inset-0" onPress={close}>
            <Animated.View style={{ opacity: backdropOpacity }} className="flex-1 bg-black" />
          </Pressable>

          <Animated.View
            style={[
              menuStyle,
              {
                bottom: menuBottom,
                backgroundColor: theme.surface ?? 'white',
                marginBottom: Math.max(insets.bottom, 0),
              },
            ]}
            className="absolute left-4 right-4 rounded-2xl py-2 shadow-lg"
          >
            {ACTIONS.map((a) => {
              const Icon = a.icon;

              return (
                <Pressable
                  key={a.label}
                  onPress={() => runAction(a)}
                  className="flex-row items-center gap-2.5 px-4 py-3"
                >
                  <View className="h-7 w-7 items-center justify-center rounded-lg">
                    <Icon size={18} color={theme.secondary} strokeWidth={2.5} />
                  </View>
                  <Text>{a.label}</Text>

                  <View className="ml-auto opacity-70">
                    <ChevronRight size={18} color={theme.muted} strokeWidth={2.5} />
                  </View>
                </Pressable>
              );
            })}
          </Animated.View>
        </View>
      </Modal>

      <Pressable
        onPress={toggle}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Ouvrir le menu d’actions"
        style={{
          backgroundColor: theme.secondary,
          transform: [{ translateX: -28 }, ...(open ? [{ rotate: '45deg' }] : [])],
        }}
        className="absolute left-1/2 -top-5 h-14 w-14 items-center justify-center rounded-full shadow-lg"
      >
        <Plus size={26} color="white" strokeWidth={2.6} />
      </Pressable>
    </>
  );
};
