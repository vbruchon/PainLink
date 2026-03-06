import { GET } from '../../../app/api/user/me/route';
import { createUser, resetDb } from '../../utils';
import { mockAnonymousUser, mockAuthenticatedUser } from '../../utils/auth';

describe('GET /api/user/me', () => {
  beforeEach(async () => {
    await resetDb();
  });

  test('401 when not authenticated', async () => {
    mockAnonymousUser();

    const res = await GET();

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: 'Unauthorized' });
  });

  test('404 when user is not found (real DB)', async () => {
    mockAuthenticatedUser('u1');

    const res = await GET();

    expect(res.status).toBe(404);
    await expect(res.json()).resolves.toEqual({ error: 'User not found' });
  });

  test('200 returns user data when authenticated (real DB)', async () => {
    await createUser({ id: 'u1' });
    mockAuthenticatedUser('u1');

    const res = await GET();

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      data: {
        id: 'u1',
        name: 'User One',
        email: 'u1@test.dev',
        mainPainZone: null,
      },
    });
  });
});
