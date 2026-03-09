import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  const open = await prisma.painSpike.findFirst({
    where: { userId, status: 'OPEN' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      status: true,
      openedAt: true,
      closedAt: true,
      createdAt: true,
      updatedAt: true,
      entries: {
        where: { type: 'OPEN' },
        orderBy: { createdAt: 'asc' },
        take: 1,
        select: {
          id: true,
          type: true,
          occurredAt: true,
          intensity: true,
          painTypes: true,
          radiationZones: true,
          trigger: true,
          note: true,
          createdAt: true,
        },
      },
    },
  });

  if (!open) {
    return NextResponse.json(
      {
        hasOpen: false,
        openId: null,
        openedAt: null,
        closedAt: null,
        entry: null,
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      hasOpen: true,
      openId: open.id,
      openedAt: open.openedAt,
      closedAt: open.closedAt,
      entry: open.entries[0] ?? null,
    },
    { status: 200 },
  );
}
