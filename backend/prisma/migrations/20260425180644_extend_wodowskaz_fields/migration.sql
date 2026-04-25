-- AlterTable
ALTER TABLE "Wodowskaz" ADD COLUMN     "ciekLubZbiornik" TEXT,
ADD COLUMN     "dataInstalacji" TIMESTAMP(3),
ADD COLUMN     "dostepnosc" TEXT,
ADD COLUMN     "numerId" TEXT,
ADD COLUMN     "rzednaZero" DOUBLE PRECISION,
ADD COLUMN     "stanTechniczny" TEXT,
ADD COLUMN     "typPunktu" TEXT,
ADD COLUMN     "zdjecieReferencyjne" TEXT;
