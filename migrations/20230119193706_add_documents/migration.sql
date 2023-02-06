-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "file_filesize" INTEGER,
    "file_filename" TEXT,
    "description" TEXT NOT NULL DEFAULT E'',
    "updatedBy" TEXT,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentsPage" (
    "id" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL DEFAULT E'',
    "updatedBy" TEXT,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentsPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "updatedBy" TEXT,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DocumentSection_document" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DocumentsPage_sections" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Document_updatedBy_idx" ON "Document"("updatedBy");

-- CreateIndex
CREATE INDEX "Document_createdBy_idx" ON "Document"("createdBy");

-- CreateIndex
CREATE INDEX "DocumentsPage_updatedBy_idx" ON "DocumentsPage"("updatedBy");

-- CreateIndex
CREATE INDEX "DocumentsPage_createdBy_idx" ON "DocumentsPage"("createdBy");

-- CreateIndex
CREATE INDEX "DocumentSection_updatedBy_idx" ON "DocumentSection"("updatedBy");

-- CreateIndex
CREATE INDEX "DocumentSection_createdBy_idx" ON "DocumentSection"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "_DocumentSection_document_AB_unique" ON "_DocumentSection_document"("A", "B");

-- CreateIndex
CREATE INDEX "_DocumentSection_document_B_index" ON "_DocumentSection_document"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DocumentsPage_sections_AB_unique" ON "_DocumentsPage_sections"("A", "B");

-- CreateIndex
CREATE INDEX "_DocumentsPage_sections_B_index" ON "_DocumentsPage_sections"("B");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentsPage" ADD CONSTRAINT "DocumentsPage_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentsPage" ADD CONSTRAINT "DocumentsPage_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentSection" ADD CONSTRAINT "DocumentSection_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentSection" ADD CONSTRAINT "DocumentSection_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentSection_document" ADD FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentSection_document" ADD FOREIGN KEY ("B") REFERENCES "DocumentSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentsPage_sections" ADD FOREIGN KEY ("A") REFERENCES "DocumentSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentsPage_sections" ADD FOREIGN KEY ("B") REFERENCES "DocumentsPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
