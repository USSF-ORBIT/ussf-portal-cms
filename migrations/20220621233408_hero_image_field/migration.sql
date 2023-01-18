-- AlterTable
ALTER TABLE "Article" 

ADD COLUMN IF NOT EXISTS     "hero_extension" TEXT,
ADD COLUMN IF NOT EXISTS     "hero_filesize" INTEGER,
ADD COLUMN IF NOT EXISTS     "hero_height" INTEGER,
ADD COLUMN IF NOT EXISTS     "hero_id" TEXT,
ADD COLUMN IF NOT EXISTS     "hero_width" INTEGER;
