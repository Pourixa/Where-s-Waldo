-- CreateTable
CREATE TABLE "player" (
    "username" TEXT NOT NULL,
    "record" BIGINT NOT NULL,
    "timeRecorded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameID" TEXT NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("username","gameID")
);

-- CreateTable
CREATE TABLE "game" (
    "name" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "t1" TEXT NOT NULL,
    "t2" TEXT NOT NULL,
    "t3" TEXT NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES "game"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
