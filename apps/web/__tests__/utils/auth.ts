import { auth } from '@/lib/auth';
import { mockSession } from './session';

type MockSessionOverrides = Parameters<typeof mockSession>[0];

const getSessionMock = jest.mocked(auth.api.getSession);

export function mockAnonymousUser() {
  getSessionMock.mockResolvedValueOnce(null);
}

export function mockAuthenticatedUser(userId = 'u1') {
  getSessionMock.mockResolvedValueOnce(
    mockSession({
      session: { userId },
      user: {
        id: userId,
        email: `${userId}@test.dev`,
        name: 'User One',
      },
    }),
  );
}

export function mockAuthenticatedSession(overrides?: MockSessionOverrides) {
  getSessionMock.mockResolvedValueOnce(mockSession(overrides));
}
