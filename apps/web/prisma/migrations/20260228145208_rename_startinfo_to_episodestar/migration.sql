/*
  Warnings:

  - You are about to drop the column `startInfo` on the `PainSpikeEntry` table. All the data in the column will be lost.
  - The `trigger` column on the `PainSpikeEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EpisodeStart" AS ENUM ('NOW', 'MIN_15', 'HOUR_1', 'HOUR_3', 'TODAY_EARLIER', 'YESTERDAY', 'DAYS_AGO');

-- CreateEnum
CREATE TYPE "Trigger" AS ENUM ('UNKNOWN', 'STRESS', 'EFFORT', 'POSTURE', 'MOVEMENT', 'EMOTION', 'WEATHER', 'FATIGUE', 'PHYSICAL_ACTIVITY');

-- AlterTable
ALTER TABLE "PainSpikeEntry" DROP COLUMN "startInfo",
ADD COLUMN     "episodeStart" "EpisodeStart",
DROP COLUMN "trigger",
ADD COLUMN     "trigger" "Trigger";
