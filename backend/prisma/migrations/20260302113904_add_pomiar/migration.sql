/*
  Warnings:

  - You are about to drop the column `access` on the `Pomiar` table. All the data in the column will be lost.
  - You are about to drop the column `exactValue` on the `Pomiar` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Pomiar` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Pomiar` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Pomiar` table. All the data in the column will be lost.
  - You are about to drop the column `readCondition` on the `Pomiar` table. All the data in the column will be lost.
  - You are about to drop the column `waterLevel` on the `Pomiar` table. All the data in the column will be lost.
  - Added the required column `wartosc` to the `Pomiar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pomiar" DROP COLUMN "access",
DROP COLUMN "exactValue",
DROP COLUMN "lat",
DROP COLUMN "lng",
DROP COLUMN "notes",
DROP COLUMN "readCondition",
DROP COLUMN "waterLevel",
ADD COLUMN     "wartosc" DOUBLE PRECISION NOT NULL;
