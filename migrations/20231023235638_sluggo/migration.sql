/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `LandingPage` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "LandingPage" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_slug_key" ON "LandingPage"("slug");
