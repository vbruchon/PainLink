import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { PATCH } from '../../../app/api/user/main-pain-zone/route';

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
      update: jest.fn(),
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

describe('PATCH /api/user/main-pain-zone', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('401 when not authenticated', async () => {
    getSessionMock.mockResolvedValueOnce(null);

    const req = new Request('http://localhost/api/user/main-pain-zone', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ mainPainZone: 'lower_back' }),
    });

    const res = await PATCH(req);

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: 'Unauthorized' });
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  test('400 when payload is invalid', async () => {
    getSessionMock.mockResolvedValueOnce(mockSession());

    const req = new Request('http://localhost/api/user/main-pain-zone', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    });

    const res = await PATCH(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toHaveProperty('error', 'Invalid data');
    expect(json).toHaveProperty('details');
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  test('200 + updates user mainPainZone when authenticated and payload valid', async () => {
    getSessionMock.mockResolvedValueOnce(mockSession());

    (prisma.user.update as jest.Mock).mockResolvedValueOnce({
      id: 'u1',
      mainPainZone: 'lower_back',
    });

    const req = new Request('http://localhost/api/user/main-pain-zone', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ mainPainZone: 'lower_back' }),
    });

    const res = await PATCH(req);

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });

    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'u1' },
      data: { mainPainZone: 'lower_back' },
    });
  });
});
