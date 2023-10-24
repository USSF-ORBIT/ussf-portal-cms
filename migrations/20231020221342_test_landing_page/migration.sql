-- CreateTable
CREATE TABLE "LandingPage" (
    "id" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL DEFAULT '',
    "pageDescription" TEXT NOT NULL DEFAULT '',
    "updatedBy" TEXT,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LandingPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LandingPage_collections" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LandingPage_articles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LandingPage_documents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "LandingPage_updatedBy_idx" ON "LandingPage"("updatedBy");

-- CreateIndex
CREATE INDEX "LandingPage_createdBy_idx" ON "LandingPage"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "_LandingPage_collections_AB_unique" ON "_LandingPage_collections"("A", "B");

-- CreateIndex
CREATE INDEX "_LandingPage_collections_B_index" ON "_LandingPage_collections"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LandingPage_articles_AB_unique" ON "_LandingPage_articles"("A", "B");

-- CreateIndex
CREATE INDEX "_LandingPage_articles_B_index" ON "_LandingPage_articles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LandingPage_documents_AB_unique" ON "_LandingPage_documents"("A", "B");

-- CreateIndex
CREATE INDEX "_LandingPage_documents_B_index" ON "_LandingPage_documents"("B");

-- AddForeignKey
ALTER TABLE "LandingPage" ADD CONSTRAINT "LandingPage_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandingPage" ADD CONSTRAINT "LandingPage_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LandingPage_collections" ADD CONSTRAINT "_LandingPage_collections_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LandingPage_collections" ADD CONSTRAINT "_LandingPage_collections_B_fkey" FOREIGN KEY ("B") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LandingPage_articles" ADD CONSTRAINT "_LandingPage_articles_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LandingPage_articles" ADD CONSTRAINT "_LandingPage_articles_B_fkey" FOREIGN KEY ("B") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LandingPage_documents" ADD CONSTRAINT "_LandingPage_documents_A_fkey" FOREIGN KEY ("A") REFERENCES "DocumentSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LandingPage_documents" ADD CONSTRAINT "_LandingPage_documents_B_fkey" FOREIGN KEY ("B") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
