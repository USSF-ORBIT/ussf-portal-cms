/*
  Warnings:

  - You are about to drop the column `collections` on the `Bookmark` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_collections_fkey";

-- DropIndex
DROP INDEX "Bookmark_collections_idx";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "collections";

-- CreateTable
CREATE TABLE "_Bookmark_collections" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Bookmark_collections_AB_unique" ON "_Bookmark_collections"("A", "B");

-- CreateIndex
CREATE INDEX "_Bookmark_collections_B_index" ON "_Bookmark_collections"("B");

-- AddForeignKey
ALTER TABLE "_Bookmark_collections" ADD FOREIGN KEY ("A") REFERENCES "Bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Bookmark_collections" ADD FOREIGN KEY ("B") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
