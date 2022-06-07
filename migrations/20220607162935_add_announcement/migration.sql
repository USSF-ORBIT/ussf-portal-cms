/*
  Warnings:

  - You are about to drop the column `article` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Announcement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_article_fkey";

-- DropIndex
DROP INDEX "Announcement_article_idx";

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "article",
DROP COLUMN "description",
ADD COLUMN     "archivedDate" TIMESTAMP(3),
ADD COLUMN     "body" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
ADD COLUMN     "publishedDate" TIMESTAMP(3);
