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
    await expect(res.json()).resolves.toEqual({
      hasOpen: false,
      openId: null,
      openedAt: null,
      closedAt: null,
      entry: null,
    });
  });

  test('200 returns open spike details when an open spike exists (real DB)', async () => {
    await createUser({ id: 'u1' });
    await createOpenPainSpike({ userId: 'u1', id: 'spike-1' });
    mockAuthenticatedUser('u1');

    const res = await GET();

    expect(res.status).toBe(200);

    const json = await res.json();

    expect(json.hasOpen).toBe(true);
    expect(json.openId).toBe('spike-1');
    expect(json.openedAt).toBeTruthy();
    expect(json.closedAt).toBeNull();

    expect(json.entry).toBeTruthy();
    expect(json.entry.type).toBe('OPEN');
    expect(json.entry.intensity).toBe('LIGHT');
    expect(json.entry.painTypes).toEqual(['OTHER_UNSURE']);
    expect(json.entry.radiationZones).toEqual([]);
    expect(json.entry.trigger).toBe('UNKNOWN');
    expect(json.entry.note).toBeNull();

    expect(json.openedAt).toBe(json.entry.occurredAt);

    const inDb = await prisma.painSpike.findUnique({
      where: { id: 'spike-1' },
    });

    expect(inDb?.status).toBe('OPEN');
  });
});
