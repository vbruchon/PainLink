import { getRedirectForLayouts } from '@/lib/auth/guard';

describe('getRedirectForLayouts', () => {
  test('authenticated in auth group -> /(tabs)', () => {
    expect(
      getRedirectForLayouts({ status: 'authenticated', inAuthGroup: true, inTabsGroup: false }),
    ).toBe('/(tabs)');
  });

  test('guest in tabs group -> /(auth)/welcome', () => {
    expect(getRedirectForLayouts({ status: 'guest', inAuthGroup: false, inTabsGroup: true })).toBe(
      '/(auth)/welcome',
    );
  });

  test('authenticated in tabs group -> null', () => {
    expect(
      getRedirectForLayouts({ status: 'authenticated', inAuthGroup: false, inTabsGroup: true }),
    ).toBeNull();
  });

  test('guest in auth group -> null', () => {
    expect(
      getRedirectForLayouts({ status: 'guest', inAuthGroup: true, inTabsGroup: false }),
    ).toBeNull();
  });
});
