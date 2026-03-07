/*
  Warnings:

  - You are about to drop the column `endedAt` on the `PainSpike` table. All the data in the column will be lost.
  - You are about to drop the column `episodeStart` on the `PainSpikeEntry` table. All the data in the column will be lost.
  - Made the column `openedAt` on table `PainSpike` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PainSpike" DROP COLUMN "endedAt",
ADD COLUMN     "closedAt" TIMESTAMP(3),
ALTER COLUMN "openedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "PainSpikeEntry" DROP COLUMN "episodeStart";

-- DropEnum
DROP TYPE "EpisodeStart";

-- CreateIndex
CREATE INDEX "PainSpikeEntry_painSpikeId_type_idx" ON "PainSpikeEntry"("painSpikeId", "type");
