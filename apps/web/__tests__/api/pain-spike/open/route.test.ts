/**
 * @jest-environment node
 */

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { POST } from '../../../../app/api/pain-spike/open/route';

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
    $transaction: jest.fn(),
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

describe('POST /api/pain-spike/open', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('401 when not authenticated', async () => {
    getSessionMock.mockResolvedValueOnce(null);

    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ intensity: 'LIGHT' }),
    });

    const res = await POST(req);

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: 'Unauthorized' });

    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  test('400 when body is invalid JSON', async () => {
    getSessionMock.mockResolvedValueOnce(mockSession());

    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{invalid-json',
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: 'Invalid data' });

    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  test('400 when invalid data (ZodError)', async () => {
    getSessionMock.mockResolvedValueOnce(mockSession());

    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}), // intensity manquant
    });

    const res = await POST(req);

    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toBe('INVALID_DATA');
    expect(Array.isArray(json.issues)).toBe(true);

    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  test('201 creates spike successfully', async () => {
    getSessionMock.mockResolvedValueOnce(mockSession());

    const now = new Date();

    const tx = {
      painSpike: {
        findFirst: jest.fn().mockResolvedValueOnce(null),
        create: jest.fn().mockResolvedValueOnce({
          id: 'ps1',
          status: 'OPEN',
          openedAt: now,
          endedAt: null,
          createdAt: now,
          updatedAt: now,
        }),
      },
      painSpikeEntry: {
        create: jest.fn().mockResolvedValueOnce({
          id: 'e1',
          type: 'OPEN',
          occurredAt: now,
          intensity: 'LIGHT',
          painTypes: [],
          radiationZones: [],
          episodeStart: null,
          trigger: null,
          createdAt: now,
        }),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementationOnce(
      async (cb: (txArg: typeof tx) => Promise<unknown>) => cb(tx),
    );

    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ intensity: 'LIGHT' }),
    });

    const res = await POST(req);

    expect(res.status).toBe(201);

    const json = await res.json();
    expect(json.painSpike.id).toBe('ps1');
    expect(json.entry.id).toBe('e1');

    expect(tx.painSpike.findFirst).toHaveBeenCalledTimes(1);
    expect(tx.painSpike.findFirst).toHaveBeenCalledWith({
      where: { userId: 'u1', status: 'OPEN' },
      select: { id: true },
    });

    expect(tx.painSpike.create).toHaveBeenCalledTimes(1);
    expect(tx.painSpikeEntry.create).toHaveBeenCalledTimes(1);
  });

  test('409 when spike already open', async () => {
    getSessionMock.mockResolvedValueOnce(mockSession());

    const tx = {
      painSpike: {
        findFirst: jest.fn().mockResolvedValueOnce({ id: 'existing' }),
      },
      painSpikeEntry: {
        create: jest.fn(),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementationOnce(
      async (cb: (txArg: typeof tx) => Promise<unknown>) => cb(tx),
    );

    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ intensity: 'LIGHT' }),
    });

    const res = await POST(req);

    expect(res.status).toBe(409);
    await expect(res.json()).resolves.toEqual({
      error: 'PAIN_SPIKE_ALREADY_OPEN',
    });

    expect(tx.painSpike.findFirst).toHaveBeenCalledTimes(1);
    expect(tx.painSpikeEntry.create).not.toHaveBeenCalled();
  });

  test('500 when unexpected error happens', async () => {
    getSessionMock.mockResolvedValueOnce(mockSession());

    (prisma.$transaction as jest.Mock).mockRejectedValueOnce(new Error('boom'));

    const req = new Request('http://localhost', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ intensity: 'LIGHT' }),
    });

    const res = await POST(req);

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: 'INTERNAL_SERVER_ERROR',
    });
  });
});
