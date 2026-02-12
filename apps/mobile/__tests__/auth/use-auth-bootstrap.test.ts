import { renderHook, waitFor } from '@testing-library/react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '@/providers/auth-provider';
import { useAuthBootstrap } from '@/hooks/navigation/use-auth-bootstrap';

// 1) Mock splash-screen
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(() => Promise.resolve()),
  hideAsync: jest.fn(() => Promise.resolve()),
}));

// 2) Mock useAuth
jest.mock('@/providers/auth-provider', () => ({
  useAuth: jest.fn(),
}));

describe('useAuthBootstrap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls initSession once and sets ready=true', async () => {
    const initSession = jest.fn(() => Promise.resolve());
    (useAuth as jest.Mock).mockReturnValue({ initSession });

    const { result, rerender } = renderHook(() => useAuthBootstrap());

    expect(result.current.ready).toBe(false);

    await waitFor(() => {
      expect(result.current.ready).toBe(true);
    });

    expect(initSession).toHaveBeenCalledTimes(1);

    // Re-render should not re-run initSession (guarded by ref)
    rerender({});
    expect(initSession).toHaveBeenCalledTimes(1);
  });

  test('does not hide splash before ready, then hides once when ready becomes true', async () => {
    const initSession = jest.fn(() => Promise.resolve());
    (useAuth as jest.Mock).mockReturnValue({ initSession });

    renderHook(() => useAuthBootstrap());

    // Immediately after mount: not ready yet -> should not hide
    expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(0);

    // Wait for ready=true (which triggers the effect that calls hideAsync)
    await waitFor(() => {
      expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(1);
    });

    // Extra time / effect flush: must not hide again (guarded by ref)
    await new Promise((r) => setTimeout(r, 0));
    expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(1);
  });

  test('hides splash after initSession resolves (order)', async () => {
    let resolveInit!: () => void;
    const initSession = jest.fn(
      () =>
        new Promise<void>((res) => {
          resolveInit = res;
        }),
    );
    (useAuth as jest.Mock).mockReturnValue({ initSession });

    renderHook(() => useAuthBootstrap());

    // initSession started, but not resolved => must not hide yet
    expect(initSession).toHaveBeenCalledTimes(1);
    expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(0);

    // Resolve initSession -> ready becomes true -> hideAsync called
    resolveInit();

    await waitFor(() => {
      expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(1);
    });
  });
});
