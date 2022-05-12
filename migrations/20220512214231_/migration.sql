/*
  Warnings:

  - You are about to drop the `_Article_byline` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Article_byline" DROP CONSTRAINT "_Article_byline_A_fkey";

-- DropForeignKey
ALTER TABLE "_Article_byline" DROP CONSTRAINT "_Article_byline_B_fkey";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "byline" TEXT;

-- DropTable
DROP TABLE "_Article_byline";

-- CreateIndex
CREATE INDEX "Article_byline_idx" ON "Article"("byline");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_byline_fkey" FOREIGN KEY ("byline") REFERENCES "Byline"("id") ON DELETE SET NULL ON UPDATE CASCADE;
