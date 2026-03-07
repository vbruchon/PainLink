import { resolveOccurredAtFromEpisodeStart } from '@/lib/pain-spike/resolve-occurred-at';
import { OpenPainSpikeInput, openPainSpikeSchema } from '@painlink/shared';
import prisma from '@/lib/prisma';

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
    closedAt: Date | null;
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
    trigger: OpenPainSpikeInput['trigger'];
    createdAt: Date;
    note: string | null;
  };
};

export const openPainSpike = async (
  userId: string,
  rawInput: unknown,
): Promise<OpenPainSpikeResult> => {
  const data = openPainSpikeSchema.parse(rawInput);
  const occurredAt = resolveOccurredAtFromEpisodeStart(data.episodeStart);

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
        closedAt: true,
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
        trigger: data.trigger,
        note: data.note ?? null,
      },
      select: {
        id: true,
        type: true,
        occurredAt: true,
        intensity: true,
        painTypes: true,
        radiationZones: true,
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
