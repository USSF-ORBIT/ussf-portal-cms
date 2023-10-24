-- AlterTable
ALTER TABLE "LandingPage" ADD COLUMN     "category" TEXT;

-- CreateIndex
CREATE INDEX "LandingPage_category_idx" ON "LandingPage"("category");

-- AddForeignKey
ALTER TABLE "LandingPage" ADD CONSTRAINT "LandingPage_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
