/*
  Warnings:

  - You are about to drop the column `endDate` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Season` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Season" DROP COLUMN "endDate",
DROP COLUMN "startDate";

-- CreateTable
CREATE TABLE "_GameToSeason" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToSeason_AB_unique" ON "_GameToSeason"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToSeason_B_index" ON "_GameToSeason"("B");

-- AddForeignKey
ALTER TABLE "_GameToSeason" ADD CONSTRAINT "_GameToSeason_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToSeason" ADD CONSTRAINT "_GameToSeason_B_fkey" FOREIGN KEY ("B") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;
