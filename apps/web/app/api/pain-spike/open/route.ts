import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { openPainSpike, PainSpikeAlreadyOpenError } from '@/services/pain-spike/open';
import { OpenPainSpikeInput } from '@painlink/shared';
import { ZodError } from 'zod';

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = session.user;
  let body: OpenPainSpikeInput;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  try {
    const result = await openPainSpike(user.id, body);

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    if (err instanceof PainSpikeAlreadyOpenError) {
      return NextResponse.json({ error: 'PAIN_SPIKE_ALREADY_OPEN' }, { status: 409 });
    }

    if (err instanceof ZodError) {
      return NextResponse.json({ error: 'INVALID_DATA', issues: err.issues }, { status: 400 });
    }

    return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}
