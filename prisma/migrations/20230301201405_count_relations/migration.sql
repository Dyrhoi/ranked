-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "countTeams" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "countPlayers" INTEGER NOT NULL DEFAULT 0;
