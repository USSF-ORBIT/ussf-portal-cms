-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Bookmark_updatedBy_idx" ON "Bookmark"("updatedBy");

-- CreateIndex
CREATE INDEX "Bookmark_createdBy_idx" ON "Bookmark"("createdBy");

-- CreateIndex
CREATE INDEX "Collection_updatedBy_idx" ON "Collection"("updatedBy");

-- CreateIndex
CREATE INDEX "Collection_createdBy_idx" ON "Collection"("createdBy");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
