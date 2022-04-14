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
