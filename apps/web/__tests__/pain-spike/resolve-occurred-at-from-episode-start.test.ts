import { resolveOccurredAtFromEpisodeStart } from '@/lib/pain-spike/resolve-occurred-at';

describe('resolveOccurredAtFromEpisodeStart', () => {
  const base = new Date('2024-01-01T12:00:00Z');

  test('NOW returns current time', () => {
    const result = resolveOccurredAtFromEpisodeStart('NOW', base);

    expect(result.toISOString()).toBe(base.toISOString());
  });

  test('MIN_15 subtracts 15 minutes', () => {
    const result = resolveOccurredAtFromEpisodeStart('MIN_15', base);

    expect(result.toISOString()).toBe('2024-01-01T11:45:00.000Z');
  });

  test('HOUR_1 subtracts one hour', () => {
    const result = resolveOccurredAtFromEpisodeStart('HOUR_1', base);

    expect(result.toISOString()).toBe('2024-01-01T11:00:00.000Z');
  });

  test('TODAY_EARLIER resolves to 09:00 local time', () => {
    const result = resolveOccurredAtFromEpisodeStart('TODAY_EARLIER', base);

    // 09:00 local time in Europe/Paris = 08:00 UTC in ISO string
    expect(result.toISOString()).toBe('2024-01-01T08:00:00.000Z');
  });

  test('LAST_NIGHT resolves to 22:00 local time yesterday', () => {
    const result = resolveOccurredAtFromEpisodeStart('LAST_NIGHT', base);

    // 22:00 local time in Europe/Paris = 21:00 UTC in ISO string
    expect(result.toISOString()).toBe('2023-12-31T21:00:00.000Z');
  });

  test('YESTERDAY resolves to 14:00 local time yesterday', () => {
    const result = resolveOccurredAtFromEpisodeStart('YESTERDAY', base);

    // 14:00 local time in Europe/Paris = 13:00 UTC in ISO string
    expect(result.toISOString()).toBe('2023-12-31T13:00:00.000Z');
  });
});
