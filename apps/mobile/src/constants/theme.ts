/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: 'hsl(174 56% 14%)',
    background: 'hsl(174 64% 91%)',
    foreground: 'hsl(0 0% 100%)',
    muted: 'hsl(240 4% 46%)',
    border: 'hsl(180 5% 81%)',

    primary: 'hsl(173 70% 43%)',
    secondary: 'hsl(183 98% 22%)',
    accent: 'hsl(24 94% 61%)',
    accentSoft: 'hsl(24 80% 95%)',

    destructive: 'hsl(359 98% 62%)',

    tint: 'hsl(173 70% 43%)',
    icon: 'hsl(240 4% 46%)',
    tabBar: 'hsl(180 65% 75%)',
    tabIconDefault: 'hsl(240 4% 46%)',
    tabIconSelected: 'hsl(173 70% 43%)',
  },
  dark: {
    text: 'hsl(0 0% 98%)',
    background: 'hsl(174 30% 10%)',
    surface: 'hsl(174 25% 14%)',
    muted: 'hsl(240 4% 70%)',
    border: 'hsl(180 5% 30%)',

    primary: 'hsl(173 70% 50%)',
    secondary: 'hsl(183 98% 35%)',
    accent: 'hsl(24 94% 61%)',
    destructive: 'hsl(359 98% 62%)',

    tint: 'hsl(173 70% 50%)',
    icon: 'hsl(240 4% 70%)',
    tabIconDefault: 'hsl(240 4% 70%)',
    tabIconSelected: 'hsl(173 70% 50%)',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
