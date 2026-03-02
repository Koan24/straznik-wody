-- CreateEnum
CREATE TYPE "WaterLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "AccessLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "ReadCondition" AS ENUM ('GOOD', 'LIMITED', 'BAD');

-- CreateTable
CREATE TABLE "Pomiar" (
    "id" SERIAL NOT NULL,
    "wodowskazId" INTEGER NOT NULL,
    "waterLevel" "WaterLevel" NOT NULL,
    "exactValue" DOUBLE PRECISION,
    "access" "AccessLevel" NOT NULL,
    "readCondition" "ReadCondition" NOT NULL,
    "notes" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pomiar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pomiar" ADD CONSTRAINT "Pomiar_wodowskazId_fkey" FOREIGN KEY ("wodowskazId") REFERENCES "Wodowskaz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pomiar" ADD CONSTRAINT "Pomiar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
