-- CreateEnum
CREATE TYPE "WaterLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "AccessLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "ReadCondition" AS ENUM ('GOOD', 'LIMITED', 'BAD');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "imie" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rola" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wodowskaz" (
    "id" SERIAL NOT NULL,
    "nazwa" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "opis" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wodowskaz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zgloszenie" (
    "id" SERIAL NOT NULL,
    "tytul" TEXT NOT NULL,
    "opis" TEXT,
    "typObiektu" TEXT NOT NULL,
    "rodzajUszkodzenia" TEXT NOT NULL,
    "stopien" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'open',
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zgloszenie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pomiar" (
    "id" SERIAL NOT NULL,
    "wodowskazId" INTEGER NOT NULL,
    "wartosc" DOUBLE PRECISION NOT NULL,
    "komentarz" TEXT,
    "data" TIMESTAMP(3),
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "zdjecie" TEXT,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pomiar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Zgloszenie" ADD CONSTRAINT "Zgloszenie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pomiar" ADD CONSTRAINT "Pomiar_wodowskazId_fkey" FOREIGN KEY ("wodowskazId") REFERENCES "Wodowskaz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pomiar" ADD CONSTRAINT "Pomiar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
