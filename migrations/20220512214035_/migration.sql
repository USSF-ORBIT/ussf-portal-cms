-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "location" TEXT;

-- CreateTable
CREATE TABLE "_Article_byline" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Article_label" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Article_tag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Article_byline_AB_unique" ON "_Article_byline"("A", "B");

-- CreateIndex
CREATE INDEX "_Article_byline_B_index" ON "_Article_byline"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Article_label_AB_unique" ON "_Article_label"("A", "B");

-- CreateIndex
CREATE INDEX "_Article_label_B_index" ON "_Article_label"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Article_tag_AB_unique" ON "_Article_tag"("A", "B");

-- CreateIndex
CREATE INDEX "_Article_tag_B_index" ON "_Article_tag"("B");

-- CreateIndex
CREATE INDEX "Article_location_idx" ON "Article"("location");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_location_fkey" FOREIGN KEY ("location") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Article_byline" ADD FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Article_byline" ADD FOREIGN KEY ("B") REFERENCES "Byline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Article_label" ADD FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Article_label" ADD FOREIGN KEY ("B") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Article_tag" ADD FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Article_tag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
