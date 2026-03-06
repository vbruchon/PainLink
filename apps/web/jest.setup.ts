import { jest } from '@jest/globals';

/**
 * Global Jest setup for apps/web.
 * - Keep mocking Next runtime bits and auth
 * - DO NOT mock Prisma: we use a real Postgres test database via .env.test
 */

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

afterAll(async () => {
  const mod = await import('@/lib/prisma');
  const prisma = mod.default;
  await prisma.$disconnect();
});
