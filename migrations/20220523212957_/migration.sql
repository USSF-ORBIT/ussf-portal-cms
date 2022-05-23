-- CreateEnum
CREATE TYPE "AnnouncementStatusType" AS ENUM ('Draft', 'Published', 'Archived');

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL DEFAULT E'',
    "status" "AnnouncementStatusType" NOT NULL DEFAULT E'Draft',
    "article" TEXT,
    "updatedBy" TEXT,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Announcement_title_key" ON "Announcement"("title");

-- CreateIndex
CREATE INDEX "Announcement_article_idx" ON "Announcement"("article");

-- CreateIndex
CREATE INDEX "Announcement_updatedBy_idx" ON "Announcement"("updatedBy");

-- CreateIndex
CREATE INDEX "Announcement_createdBy_idx" ON "Announcement"("createdBy");

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_article_fkey" FOREIGN KEY ("article") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
