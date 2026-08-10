/*
  Warnings:

  - You are about to alter the column `record` on the `player` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "player" ALTER COLUMN "record" SET DATA TYPE INTEGER;
