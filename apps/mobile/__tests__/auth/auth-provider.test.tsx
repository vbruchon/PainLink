import { useEffect } from 'react';
import { Text } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';

import { AuthProvider, useAuth } from '@/providers/auth-provider';
import { authClient } from '@/lib/auth/auth-client';

jest.mock('@/lib/auth/auth-client', () => ({
  authClient: {
    getSession: jest.fn(),
    signOut: jest.fn(),
  },
}));

const AuthTestConsumer = () => {
  const { status, data, initSession, signOut } = useAuth();

  useEffect(() => {
    void initSession();
  }, [initSession]);

  return (
    <>
      <Text testID="status">{status}</Text>
      <Text testID="email">{data?.user.email ?? 'no-session'}</Text>

      <Text
        testID="logout"
        onPress={() => {
          void signOut();
        }}
      >
        logout
      </Text>
    </>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should set status to authenticated when getSession returns session and user', async () => {
    (authClient.getSession as jest.Mock).mockResolvedValue({
      data: {
        session: { id: 's1' },
        user: { id: 'u1', email: 'test@test.com', name: null, emailVerified: true, image: null },
      },
    });

    const screen = render(
      <AuthProvider>
        <AuthTestConsumer />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('authenticated');
      expect(screen.getByTestId('email')).toHaveTextContent('test@test.com');
    });
  });

  test('should set status to guest when getSession throws', async () => {
    (authClient.getSession as jest.Mock).mockRejectedValue(new Error('Network request failed'));

    const screen = render(
      <AuthProvider>
        <AuthTestConsumer />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('guest');
      expect(screen.getByTestId('email')).toHaveTextContent('no-session');
    });
  });

  test('should set status to guest and call authClient.signOut on signOut', async () => {
    (authClient.getSession as jest.Mock).mockResolvedValue({
      data: {
        session: { id: 's1' },
        user: { id: 'u1', email: 'test@test.com' },
      },
    });

    (authClient.signOut as jest.Mock).mockResolvedValue({});

    const screen = render(
      <AuthProvider>
        <AuthTestConsumer />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('authenticated');
    });

    fireEvent.press(screen.getByTestId('logout'));

    await waitFor(() => {
      expect(authClient.signOut).toHaveBeenCalled();
      expect(screen.getByTestId('status')).toHaveTextContent('guest');
      expect(screen.getByTestId('email')).toHaveTextContent('no-session');
    });
  });
});
