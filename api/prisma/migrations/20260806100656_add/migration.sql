/*
  Warnings:

  - You are about to drop the column `x` on the `target` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `target` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gameID]` on the table `target` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `xbut` to the `target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xtop` to the `target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ybut` to the `target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ytop` to the `target` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "target_src_key";

-- AlterTable
ALTER TABLE "target" DROP COLUMN "x",
DROP COLUMN "y",
ADD COLUMN     "xbut" INTEGER NOT NULL,
ADD COLUMN     "xtop" INTEGER NOT NULL,
ADD COLUMN     "ybut" INTEGER NOT NULL,
ADD COLUMN     "ytop" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "target_gameID_key" ON "target"("gameID");
