/*
  Warnings:

  - The `pageDescription` column on the `LandingPage` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "LandingPage" DROP COLUMN "pageDescription",
ADD COLUMN     "pageDescription" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]';
