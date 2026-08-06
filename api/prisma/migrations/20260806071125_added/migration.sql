/*
  Warnings:

  - You are about to drop the column `t1` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `t2` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `t3` on the `game` table. All the data in the column will be lost.
  - Added the required column `height` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game" DROP COLUMN "t1",
DROP COLUMN "t2",
DROP COLUMN "t3",
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "target" (
    "name" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "gameID" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "target_src_key" ON "target"("src");

-- AddForeignKey
ALTER TABLE "target" ADD CONSTRAINT "target_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES "game"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
