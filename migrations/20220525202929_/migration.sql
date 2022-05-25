/*
  Warnings:

  - You are about to drop the `_Article_label` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Article_tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Article_label" DROP CONSTRAINT "_Article_label_A_fkey";

-- DropForeignKey
ALTER TABLE "_Article_label" DROP CONSTRAINT "_Article_label_B_fkey";

-- DropForeignKey
ALTER TABLE "_Article_tag" DROP CONSTRAINT "_Article_tag_A_fkey";

-- DropForeignKey
ALTER TABLE "_Article_tag" DROP CONSTRAINT "_Article_tag_B_fkey";

-- DropTable
DROP TABLE "_Article_label";

-- DropTable
DROP TABLE "_Article_tag";

-- CreateTable
CREATE TABLE "_Article_labels" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Article_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Article_labels_AB_unique" ON "_Article_labels"("A", "B");

-- CreateIndex
CREATE INDEX "_Article_labels_B_index" ON "_Article_labels"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Article_tags_AB_unique" ON "_Article_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Article_tags_B_index" ON "_Article_tags"("B");

-- AddForeignKey
ALTER TABLE "_Article_labels" ADD FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Article_labels" ADD FOREIGN KEY ("B") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Article_tags" ADD FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Article_tags" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
