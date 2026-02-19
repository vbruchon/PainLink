// apps/mobile/__tests__/auth/guard.test.tsx
import { getRedirectForLayouts } from '@/lib/auth/guard';

describe('getRedirectForLayouts', () => {
  test('guest in tabs group -> /(auth)/welcome', () => {
    expect(getRedirectForLayouts({ status: 'guest', inAuthGroup: false, inTabsGroup: true })).toBe(
      '/(auth)/welcome',
    );
  });

  test('guest in auth group -> null', () => {
    expect(
      getRedirectForLayouts({ status: 'guest', inAuthGroup: true, inTabsGroup: false }),
    ).toBeNull();
  });

  test('authenticated in auth group -> /(tabs) when setup is complete', () => {
    expect(
      getRedirectForLayouts({
        status: 'authenticated',
        inAuthGroup: true,
        inTabsGroup: false,
        userLoading: false,
        user: { mainPainZone: 'back' },
      }),
    ).toBe('/(tabs)');
  });

  test('authenticated in tabs group -> null when setup is complete', () => {
    expect(
      getRedirectForLayouts({
        status: 'authenticated',
        inAuthGroup: false,
        inTabsGroup: true,
        userLoading: false,
        user: { mainPainZone: 'back' },
      }),
    ).toBeNull();
  });

  test('authenticated without setup -> /onboarding/body-selector', () => {
    expect(
      getRedirectForLayouts({
        status: 'authenticated',
        inAuthGroup: false,
        inTabsGroup: true,
        userLoading: false,
        user: { mainPainZone: null },
      }),
    ).toBe('/onboarding/body-selector');
  });

  test('authenticated + userLoading -> null (wait for user)', () => {
    expect(
      getRedirectForLayouts({
        status: 'authenticated',
        inAuthGroup: false,
        inTabsGroup: true,
        userLoading: true,
        user: null,
      }),
    ).toBeNull();
  });
});
