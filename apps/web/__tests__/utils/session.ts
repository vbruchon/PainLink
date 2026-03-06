import { auth } from '@/lib/auth';

type GetSessionReturn = Awaited<ReturnType<typeof auth.api.getSession>>;
type SessionData = NonNullable<GetSessionReturn>;

export type MockSessionOverrides = {
  session?: Partial<SessionData['session']>;
  user?: Partial<SessionData['user']>;
};

export const mockSession = (overrides?: MockSessionOverrides): SessionData => ({
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

// import { auth } from '@/lib/auth';

// type GetSessionReturn = Awaited<ReturnType<typeof auth.api.getSession>>;

// export const mockSession = (
//   overrides?: Partial<NonNullable<GetSessionReturn>>,
// ): NonNullable<GetSessionReturn> => ({
//   session: {
//     id: 's1',
//     userId: 'u1',
//     token: 't1',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     expiresAt: new Date(Date.now() + 60 * 60 * 1000),
//     ipAddress: null,
//     userAgent: null,
//     ...(overrides?.session ?? {}),
//   },
//   user: {
//     id: 'u1',
//     email: 'u1@test.dev',
//     name: 'User One',
//     emailVerified: false,
//     image: null,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     ...(overrides?.user ?? {}),
//   },
// });
