import prisma from '@/lib/prisma';
import { BodyRegionId } from '@painlink/shared';

export async function createUser(
  overrides?: Partial<{
    id: string;
    email: string;
    name: string;
    mainPainZone: BodyRegionId | null;
  }>,
) {
  return prisma.user.create({
    data: {
      id: overrides?.id ?? 'u1',
      email: overrides?.email ?? 'u1@test.dev',
      name: overrides?.name ?? 'User One',
      emailVerified: false,
      image: null,
      mainPainZone: overrides?.mainPainZone ?? null,
    },
    select: { id: true, email: true, name: true, mainPainZone: true },
  });
}

export async function createOpenPainSpike(overrides?: Partial<{ id: string; userId: string }>) {
  return prisma.painSpike.create({
    data: {
      id: overrides?.id ?? 'ps-open-1',
      userId: overrides?.userId ?? 'u1',
      status: 'OPEN',
      openedAt: new Date(),
    },
    select: { id: true, status: true, userId: true },
  });
}

export async function createPainSpikeEntry(
  overrides?: Partial<{
    id: string;
    painSpikeId: string;
    type: 'OPEN' | 'UPDATE' | 'CLOSE';
    intensity: 'LIGHT' | 'MODERATE' | 'STRONG' | 'VERY_STRONG';
  }>,
) {
  return prisma.painSpikeEntry.create({
    data: {
      id: overrides?.id ?? 'entry-1',
      painSpikeId: overrides?.painSpikeId ?? 'ps-open-1',
      type: overrides?.type ?? 'OPEN',
      occurredAt: new Date(),
      intensity: overrides?.intensity ?? 'LIGHT',
      painTypes: [],
      radiationZones: [],
    },
  });
}
