/*
  Warnings:

  - The values [DAYS_AGO] on the enum `EpisodeStart` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EpisodeStart_new" AS ENUM ('NOW', 'MIN_15', 'HOUR_1', 'HOUR_3', 'TODAY_EARLIER', 'LAST_NIGHT', 'YESTERDAY');
ALTER TABLE "PainSpikeEntry" ALTER COLUMN "episodeStart" TYPE "EpisodeStart_new" USING ("episodeStart"::text::"EpisodeStart_new");
ALTER TYPE "EpisodeStart" RENAME TO "EpisodeStart_old";
ALTER TYPE "EpisodeStart_new" RENAME TO "EpisodeStart";
DROP TYPE "public"."EpisodeStart_old";
COMMIT;
