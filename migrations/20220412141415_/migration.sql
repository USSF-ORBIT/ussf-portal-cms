/*
  Warnings:

  - You are about to drop the `_Bookmark_collections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Collection_bookmarks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Bookmark_collections" DROP CONSTRAINT "_Bookmark_collections_A_fkey";

-- DropForeignKey
ALTER TABLE "_Bookmark_collections" DROP CONSTRAINT "_Bookmark_collections_B_fkey";

-- DropForeignKey
ALTER TABLE "_Collection_bookmarks" DROP CONSTRAINT "_Collection_bookmarks_A_fkey";

-- DropForeignKey
ALTER TABLE "_Collection_bookmarks" DROP CONSTRAINT "_Collection_bookmarks_B_fkey";

-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "collections" TEXT;

-- DropTable
DROP TABLE "_Bookmark_collections";

-- DropTable
DROP TABLE "_Collection_bookmarks";

-- CreateIndex
CREATE INDEX "Bookmark_collections_idx" ON "Bookmark"("collections");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_collections_fkey" FOREIGN KEY ("collections") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
