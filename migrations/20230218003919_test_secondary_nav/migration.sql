-- CreateTable
CREATE TABLE "SecondaryNav" (
    "id" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SecondaryNav_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavLink" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',
    "label" TEXT NOT NULL DEFAULT '',
    "updatedBy" TEXT,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NavLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SecondaryNav_links" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "SecondaryNav_updatedBy_idx" ON "SecondaryNav"("updatedBy");

-- CreateIndex
CREATE INDEX "SecondaryNav_createdBy_idx" ON "SecondaryNav"("createdBy");

-- CreateIndex
CREATE INDEX "NavLink_updatedBy_idx" ON "NavLink"("updatedBy");

-- CreateIndex
CREATE INDEX "NavLink_createdBy_idx" ON "NavLink"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "_SecondaryNav_links_AB_unique" ON "_SecondaryNav_links"("A", "B");

-- CreateIndex
CREATE INDEX "_SecondaryNav_links_B_index" ON "_SecondaryNav_links"("B");

-- AddForeignKey
ALTER TABLE "SecondaryNav" ADD CONSTRAINT "SecondaryNav_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondaryNav" ADD CONSTRAINT "SecondaryNav_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavLink" ADD CONSTRAINT "NavLink_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavLink" ADD CONSTRAINT "NavLink_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SecondaryNav_links" ADD CONSTRAINT "_SecondaryNav_links_A_fkey" FOREIGN KEY ("A") REFERENCES "NavLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SecondaryNav_links" ADD CONSTRAINT "_SecondaryNav_links_B_fkey" FOREIGN KEY ("B") REFERENCES "SecondaryNav"("id") ON DELETE CASCADE ON UPDATE CASCADE;
