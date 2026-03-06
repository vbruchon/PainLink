import prisma from '@/lib/prisma';
import { PATCH } from '../../../app/api/user/main-pain-zone/route';
import {
  createUser,
  makeJsonRequest,
  mockAnonymousUser,
  mockAuthenticatedUser,
  resetDb,
} from '../../utils';

describe('PATCH /api/user/main-pain-zone', () => {
  beforeEach(async () => {
    await resetDb();
  });

  test('401 when not authenticated', async () => {
    mockAnonymousUser();

    const req = makeJsonRequest({
      url: 'http://localhost/api/user/main-pain-zone',
      method: 'PATCH',
      body: { mainPainZone: 'lower_back' },
    });

    const res = await PATCH(req);

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: 'Unauthorized' });
  });

  test('400 when payload is invalid', async () => {
    await createUser({ id: 'u1' });
    mockAuthenticatedUser('u1');

    const req = makeJsonRequest({
      url: 'http://localhost/api/user/main-pain-zone',
      method: 'PATCH',
      body: {},
    });

    const res = await PATCH(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toHaveProperty('error', 'Invalid data');
    expect(json).toHaveProperty('details');
  });

  test('200 updates user mainPainZone (real DB)', async () => {
    await createUser({ id: 'u1' });
    mockAuthenticatedUser('u1');

    const req = makeJsonRequest({
      url: 'http://localhost/api/user/main-pain-zone',
      method: 'PATCH',
      body: { mainPainZone: 'lower_back' },
    });

    const res = await PATCH(req);

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });

    const inDb = await prisma.user.findUnique({
      where: { id: 'u1' },
      select: { mainPainZone: true },
    });
    expect(inDb?.mainPainZone).toBe('lower_back');
  });
});
