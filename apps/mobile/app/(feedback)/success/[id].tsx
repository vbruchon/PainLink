import { useCallback, useEffect } from 'react';
import { Image, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/ui/header';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

import { SUCCESS_VARIANTS } from '@/features/feedback/variants';
import type { AppHref } from '@/features/feedback/variants/types';
import { hapticSuccess } from '@/lib/haptics/haptics';

type SuccessVariantKey = keyof typeof SUCCESS_VARIANTS;
const DEFAULT_REDIRECT: AppHref = '/(tabs)';

export default function SuccessFeedbackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const rawId = params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const fallback = SUCCESS_VARIANTS.default;
  const variant =
    id && id in SUCCESS_VARIANTS ? SUCCESS_VARIANTS[id as SuccessVariantKey] : fallback;

  const redirectTo: AppHref = variant.redirectTo ?? DEFAULT_REDIRECT;
  const autoRedirectMs = variant.autoRedirectMs ?? 5000;

  const goNext = useCallback(() => {
    router.replace(redirectTo);
  }, [router, redirectTo]);

  useEffect(() => {
    hapticSuccess();

    const t = setTimeout(goNext, autoRedirectMs);
    return () => clearTimeout(t);
  }, [autoRedirectMs, goNext]);

  return (
    <Screen>
      <Header title="" />

      <View className="flex-1  justify-center">
        <View className="items-center">
          <Image
            source={variant.nexiImage}
            resizeMode="contain"
            className="size-72"
            accessibilityIgnoresInvertColors
          />

          <Text variant="h3" className="mt-6 text-center">
            {variant.title}
          </Text>

          {variant.description ? (
            <Text variant="body" className="mt-4 text-center leading-relaxed">
              {variant.description}
            </Text>
          ) : null}
        </View>
      </View>

      <View className="px-6">
        <Button onPress={goNext}>{variant.ctaLabel}</Button>
      </View>
    </Screen>
  );
}
