import prisma from '@/lib/prisma';
import { openPainSpike, PainSpikeAlreadyOpenError } from '@/services/pain-spike/open';
import { createOpenPainSpike, createUser, resetDb } from '../utils';

describe('openPainSpike service', () => {
  beforeEach(async () => {
    await resetDb();
  });

  const validOpenPayload = {
    intensity: 'LIGHT',
    painTypes: ['OTHER_UNSURE'],
    radiationZones: [],
    episodeStart: 'NOW',
    trigger: 'UNKNOWN',
  } as const;

  test('creates a pain spike and an OPEN entry', async () => {
    await createUser({ id: 'u1' });

    const result = await openPainSpike('u1', validOpenPayload);

    expect(result.painSpike.id).toBeTruthy();
    expect(result.painSpike.status).toBe('OPEN');
    expect(result.painSpike.closedAt).toBeNull();

    expect(result.entry.id).toBeTruthy();
    expect(result.entry.type).toBe('OPEN');
    expect(result.entry.intensity).toBe('LIGHT');
    expect(result.entry.painTypes).toEqual(['OTHER_UNSURE']);
    expect(result.entry.radiationZones).toEqual([]);
    expect(result.entry.trigger).toBe('UNKNOWN');

    expect(result.painSpike.openedAt.toISOString()).toBe(result.entry.occurredAt.toISOString());

    const spikeInDb = await prisma.painSpike.findUnique({
      where: { id: result.painSpike.id },
    });

    const entryInDb = await prisma.painSpikeEntry.findUnique({
      where: { id: result.entry.id },
    });

    expect(spikeInDb).not.toBeNull();
    expect(entryInDb).not.toBeNull();
    expect(spikeInDb?.status).toBe('OPEN');
    expect(entryInDb?.type).toBe('OPEN');
  });

  test('throws PainSpikeAlreadyOpenError when a spike is already open', async () => {
    await createUser({ id: 'u1' });
    await createOpenPainSpike({ userId: 'u1' });

    await expect(openPainSpike('u1', validOpenPayload)).rejects.toBeInstanceOf(
      PainSpikeAlreadyOpenError,
    );
  });

  test('throws when input is invalid', async () => {
    await createUser({ id: 'u1' });

    await expect(openPainSpike('u1', {})).rejects.toThrow();
  });
});
