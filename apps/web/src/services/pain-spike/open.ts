import prisma from '@/lib/prisma';
import { OpenPainSpikeInput, openPainSpikeSchema } from '@painlink/shared';

export class PainSpikeAlreadyOpenError extends Error {
  constructor() {
    super('A pain spike is already open for this user.');
    this.name = 'PainSpikeAlreadyOpenError';
  }
}

export type OpenPainSpikeResult = {
  painSpike: {
    id: string;
    status: 'OPEN';
    openedAt: Date;
    endedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
  entry: {
    id: string;
    type: 'OPEN';
    occurredAt: Date;
    intensity: OpenPainSpikeInput['intensity'];
    painTypes: OpenPainSpikeInput['painTypes'];
    radiationZones: OpenPainSpikeInput['radiationZones'];
    episodeStart: string | null;
    trigger: string | null;
    createdAt: Date;
    note: string | null;
  };
};

export const openPainSpike = async (
  userId: string,
  rawInput: OpenPainSpikeInput,
): Promise<OpenPainSpikeResult> => {
  const data = openPainSpikeSchema.parse(rawInput);
  const occurredAt = data.occurredAt ?? new Date();

  return prisma.$transaction(async (tx) => {
    const existing = await tx.painSpike.findFirst({
      where: { userId, status: 'OPEN' },
      select: { id: true },
    });

    if (existing) throw new PainSpikeAlreadyOpenError();

    const painSpike = await tx.painSpike.create({
      data: {
        userId,
        status: 'OPEN',
        openedAt: occurredAt,
      },
      select: {
        id: true,
        status: true,
        openedAt: true,
        endedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const entry = await tx.painSpikeEntry.create({
      data: {
        painSpikeId: painSpike.id,
        type: 'OPEN',
        occurredAt,

        intensity: data.intensity,
        painTypes: data.painTypes,
        radiationZones: data.radiationZones,

        episodeStart: data.episodeStart ?? null,
        trigger: data.trigger ?? null,
        note: data.note ?? null,
      },
      select: {
        id: true,
        type: true,
        occurredAt: true,
        intensity: true,
        painTypes: true,
        radiationZones: true,
        episodeStart: true,
        trigger: true,
        createdAt: true,
        note: true,
      },
    });

    return {
      painSpike: painSpike as OpenPainSpikeResult['painSpike'],
      entry: entry as OpenPainSpikeResult['entry'],
    };
  });
};
