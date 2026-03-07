import { EpisodeStartPreset } from '@painlink/shared';

/**
 * Resolve a user-selected episode start preset into a concrete timestamp.
 *
 * Users often provide approximate times (e.g. "earlier today", "last night").
 * Since the database requires an exact timestamp, we translate these presets
 * into representative times chosen to minimize bias in temporal analytics.
 *
 * Chosen conventions:
 *
 * - NOW → current timestamp
 * - MIN_15 → now - 15 minutes
 * - HOUR_1 → now - 1 hour
 * - HOUR_3 → now - 3 hours
 *
 * Approximate presets use representative midpoints:
 *
 * - TODAY_EARLIER → 09:00 today
 *   Represents the morning period.
 *
 * - LAST_NIGHT → 22:00 yesterday
 *   Represents the start of the night period.
 *
 * - YESTERDAY → 14:00 yesterday
 *   Represents the middle of the day.
 *
 * These choices avoid skewing time-based analytics (e.g. spike frequency by hour).
 *
 * NOTE:
 * These values are part of the MVP convention and may evolve as the product
 * matures. Future versions of PainLink may refine these mappings using
 * improved heuristics, user-specific patterns, or probabilistic distributions.
 */

export const resolveOccurredAtFromEpisodeStart = (
  episodeStart: EpisodeStartPreset,
  now = new Date(),
): Date => {
  const date = new Date(now);

  switch (episodeStart) {
    case 'NOW':
      return date;

    case 'MIN_15':
      date.setMinutes(date.getMinutes() - 15);
      return date;

    case 'HOUR_1':
      date.setHours(date.getHours() - 1);
      return date;

    case 'HOUR_3':
      date.setHours(date.getHours() - 3);
      return date;

    case 'TODAY_EARLIER':
      date.setHours(9, 0, 0, 0);
      return date;

    case 'LAST_NIGHT':
      date.setDate(date.getDate() - 1);
      date.setHours(22, 0, 0, 0);
      return date;

    case 'YESTERDAY':
      date.setDate(date.getDate() - 1);
      date.setHours(14, 0, 0, 0);
      return date;

    default:
      return now;
  }
};
