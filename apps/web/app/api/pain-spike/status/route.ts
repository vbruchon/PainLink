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
    select: { id: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ hasOpen: !!open, openId: open?.id ?? null }, { status: 200 });
}
