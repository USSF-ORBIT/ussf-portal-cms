-- CreateEnum
CREATE TYPE "ArticleStatusType" AS ENUM ('Draft', 'Published', 'Archived');

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT E'',
    "title" TEXT NOT NULL DEFAULT E'',
    "preview" TEXT NOT NULL DEFAULT E'',
    "body" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "status" "ArticleStatusType" NOT NULL DEFAULT E'Draft',
    "keywords" TEXT NOT NULL DEFAULT E'',
    "updatedBy" TEXT,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "Article_updatedBy_idx" ON "Article"("updatedBy");

-- CreateIndex
CREATE INDEX "Article_createdBy_idx" ON "Article"("createdBy");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
