import prisma from '@/lib/prisma';
import { GET } from '../../../app/api/pain-spike/status/route';
import {
  createOpenPainSpike,
  createUser,
  mockAnonymousUser,
  mockAuthenticatedUser,
  resetDb,
} from '../../utils';

describe('GET /api/pain-spike/status', () => {
  beforeEach(async () => {
    await resetDb();
  });

  test('401 when user is not authenticated', async () => {
    mockAnonymousUser();

    const res = await GET();

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: 'Unauthorized' });
  });

  test('200 hasOpen false when no open spike exists (real DB)', async () => {
    await createUser({ id: 'u1' });
    mockAuthenticatedUser('u1');

    const res = await GET();

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ hasOpen: false, openId: null });
  });

  test('200 hasOpen true and openId when an open spike exists (real DB)', async () => {
    await createUser({ id: 'u1' });
    await createOpenPainSpike({ userId: 'u1', id: 'spike-1' });
    mockAuthenticatedUser('u1');

    const res = await GET();

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ hasOpen: true, openId: 'spike-1' });

    // petit assert bonus: on s'assure qu'il existe bien
    const inDb = await prisma.painSpike.findUnique({ where: { id: 'spike-1' } });
    expect(inDb?.status).toBe('OPEN');
  });
});
