-- DropIndex
DROP INDEX "target_gameID_key";

-- AlterTable
ALTER TABLE "target" ADD CONSTRAINT "target_pkey" PRIMARY KEY ("name", "gameID");
