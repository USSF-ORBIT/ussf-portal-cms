-- CreateEnum
CREATE TYPE "LandingPageStatusType" AS ENUM ('Draft', 'Published', 'Archived');

-- AlterTable
ALTER TABLE "LandingPage" ADD COLUMN     "status" "LandingPageStatusType" NOT NULL DEFAULT 'Draft';
