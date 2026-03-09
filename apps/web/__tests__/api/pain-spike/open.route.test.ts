import prisma from '@/lib/prisma';
import {
  createOpenPainSpike,
  createUser,
  makeInvalidJsonRequest,
  makeJsonRequest,
  mockAnonymousUser,
  mockAuthenticatedUser,
  resetDb,
} from '../../utils';
import { POST } from '../../../app/api/pain-spike/open/route';

const validOpenPayload = {
  intensity: 'LIGHT',
  painTypes: ['OTHER_UNSURE'],
  radiationZones: [],
  episodeStart: 'NOW',
  trigger: 'UNKNOWN',
};

describe('POST /api/pain-spike/open', () => {
  beforeEach(async () => {
    await resetDb();
  });

  test('401 when not authenticated', async () => {
    mockAnonymousUser();

    const req = makeJsonRequest({ method: 'POST', body: validOpenPayload });
    const res = await POST(req);

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: 'Unauthorized' });
  });

  test('400 when body is invalid JSON', async () => {
    await createUser({ id: 'u1' });
    mockAuthenticatedUser('u1');

    const req = makeInvalidJsonRequest({ method: 'POST' });
    const res = await POST(req);

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: 'Invalid data' });
  });

  test('400 when invalid data (ZodError)', async () => {
    await createUser({ id: 'u1' });
    mockAuthenticatedUser('u1');

    const req = makeJsonRequest({ method: 'POST', body: {} });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const json = await res.json();

    expect(json.error).toBe('INVALID_DATA');
    expect(Array.isArray(json.issues)).toBe(true);
  });

  test('201 creates spike successfully (real DB)', async () => {
    await createUser({ id: 'u1' });
    mockAuthenticatedUser('u1');

    const req = makeJsonRequest({ method: 'POST', body: validOpenPayload });
    const res = await POST(req);

    expect(res.status).toBe(201);

    const json = await res.json();
    expect(json.painSpike?.id).toBeTruthy();
    expect(json.entry?.id).toBeTruthy();

    const spike = await prisma.painSpike.findUnique({
      where: { id: json.painSpike.id },
    });

    const entry = await prisma.painSpikeEntry.findUnique({
      where: { id: json.entry.id },
    });

    expect(spike).not.toBeNull();
    expect(spike?.status).toBe('OPEN');
    expect(spike?.userId).toBe('u1');
    expect(spike?.closedAt).toBeNull();
    expect(spike?.openedAt.toISOString()).toBe(entry?.occurredAt.toISOString());

    expect(entry).not.toBeNull();
    expect(entry?.type).toBe('OPEN');
    expect(entry?.intensity).toBe('LIGHT');
    expect(entry?.painTypes).toEqual(['OTHER_UNSURE']);
    expect(entry?.radiationZones).toEqual([]);
    expect(entry?.trigger).toBe('UNKNOWN');
    expect(entry?.painSpikeId).toBe(json.painSpike.id);
  });

  test('409 when spike already open (real DB)', async () => {
    await createUser({ id: 'u1' });
    mockAuthenticatedUser('u1');

    await createOpenPainSpike({ userId: 'u1' });

    const req = makeJsonRequest({ method: 'POST', body: validOpenPayload });
    const res = await POST(req);

    expect(res.status).toBe(409);
    await expect(res.json()).resolves.toEqual({ error: 'PAIN_SPIKE_ALREADY_OPEN' });
  });
});
