import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { GET } from '../../../app/api/user/me/route';

jest.mock('next/headers', () => ({
  headers: jest.fn(async () => new Headers()),
}));

jest.mock('@/lib/auth', () => ({
  auth: {
    api: {
      getSession: jest.fn(),
    },
  },
}));

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

const getSessionMock = jest.mocked(auth.api.getSession);

type GetSessionReturn = Awaited<ReturnType<typeof auth.api.getSession>>;

const mockSession = (
  overrides?: Partial<NonNullable<GetSessionReturn>>,
): NonNullable<GetSessionReturn> => ({
  session: {
    id: 's1',
    userId: 'u1',
    token: 't1',
    createdAt: new Date(),
    updatedAt: new Date(),
    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    ipAddress: null,
    userAgent: null,
    ...(overrides?.session ?? {}),
  },
  user: {
    id: 'u1',
    email: 'u1@test.dev',
    name: 'User One',
    emailVerified: false,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...(overrides?.user ?? {}),
  },
});

describe('GET /api/user/me', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('401 when not authenticated', async () => {
    getSessionMock.mockResolvedValueOnce(null);

    const res = await GET();

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: 'Unauthorized' });
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  test('404 when user is not found', async () => {
    getSessionMock.mockResolvedValueOnce(mockSession());
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const res = await GET();

    expect(res.status).toBe(404);
    await expect(res.json()).resolves.toEqual({ error: 'User not found' });

    expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'u1' },
      select: { id: true, name: true, email: true, mainPainZone: true },
    });
  });

  test('200 returns user data when authenticated', async () => {
    getSessionMock.mockResolvedValueOnce(mockSession());
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
      id: 'u1',
      name: 'User One',
      email: 'u1@test.dev',
      mainPainZone: 'lower_back',
    });

    const res = await GET();

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      data: {
        id: 'u1',
        name: 'User One',
        email: 'u1@test.dev',
        mainPainZone: 'lower_back',
      },
    });

    expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
  });
});
