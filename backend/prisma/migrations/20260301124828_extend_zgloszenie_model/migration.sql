/*
  Warnings:

  - Added the required column `rodzajUszkodzenia` to the `Zgloszenie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stopien` to the `Zgloszenie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typObiektu` to the `Zgloszenie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Zgloszenie" ADD COLUMN     "rodzajUszkodzenia" TEXT NOT NULL,
ADD COLUMN     "stopien" INTEGER NOT NULL,
ADD COLUMN     "typObiektu" TEXT NOT NULL;
