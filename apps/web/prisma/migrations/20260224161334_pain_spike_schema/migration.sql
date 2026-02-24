-- CreateEnum
CREATE TYPE "PainIntensity" AS ENUM ('LIGHT', 'MODERATE', 'STRONG', 'VERY_STRONG');

-- CreateEnum
CREATE TYPE "PainType" AS ENUM ('COLD_SENSATION', 'HEAT_SENSATION', 'BURNING', 'PRESSURE_CRUSHING', 'HEAVINESS', 'TINGLING', 'ELECTRIC_SHOCK', 'STABBING', 'ITCHING', 'THROBBING', 'EXPLOSIVE', 'DIFFUSE', 'OTHER_UNSURE');

-- CreateEnum
CREATE TYPE "PainSpikeStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "PainSpikeEntryType" AS ENUM ('OPEN', 'UPDATE', 'CLOSE');

-- CreateTable
CREATE TABLE "PainSpike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "PainSpikeStatus" NOT NULL DEFAULT 'OPEN',
    "openedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PainSpike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PainSpikeEntry" (
    "id" TEXT NOT NULL,
    "painSpikeId" TEXT NOT NULL,
    "type" "PainSpikeEntryType" NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "intensity" "PainIntensity" NOT NULL,
    "painTypes" "PainType"[] DEFAULT ARRAY[]::"PainType"[],
    "radiationZones" "BodyRegionId"[] DEFAULT ARRAY[]::"BodyRegionId"[],
    "startInfo" TEXT,
    "trigger" TEXT,
    "improvement" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PainSpikeEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PainSpike_userId_status_createdAt_idx" ON "PainSpike"("userId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "PainSpikeEntry_painSpikeId_occurredAt_idx" ON "PainSpikeEntry"("painSpikeId", "occurredAt");

-- CreateIndex
CREATE INDEX "PainSpikeEntry_occurredAt_idx" ON "PainSpikeEntry"("occurredAt");

-- AddForeignKey
ALTER TABLE "PainSpike" ADD CONSTRAINT "PainSpike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PainSpikeEntry" ADD CONSTRAINT "PainSpikeEntry_painSpikeId_fkey" FOREIGN KEY ("painSpikeId") REFERENCES "PainSpike"("id") ON DELETE CASCADE ON UPDATE CASCADE;
