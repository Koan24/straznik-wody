-- AlterTable
ALTER TABLE "Pomiar" ADD COLUMN     "dostepDoPunktu" TEXT,
ADD COLUMN     "dystansOdWodowskazu" DOUBLE PRECISION,
ADD COLUMN     "jakoscLokalizacji" TEXT,
ADD COLUMN     "mozliwoscOdczytu" TEXT,
ADD COLUMN     "stanLaty" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "uwagiTerenowe" TEXT,
ADD COLUMN     "warunkiOdczytu" TEXT;
