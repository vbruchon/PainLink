/*
  Warnings:

  - The `mainPainZone` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BodyRegionId" AS ENUM ('head', 'neck', 'shoulder_left', 'shoulder_right', 'upper_arm_left', 'upper_arm_right', 'lower_arm_left', 'lower_arm_right', 'hand_left', 'hand_right', 'chest', 'belly', 'upper_back', 'lower_back', 'thigh_left', 'thigh_right', 'lower_leg_left', 'lower_leg_right', 'foot_left', 'foot_right');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "mainPainZone",
ADD COLUMN     "mainPainZone" "BodyRegionId";
