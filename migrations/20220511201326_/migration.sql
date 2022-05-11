-- CreateTable
CREATE TABLE "Byline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "updatedBy" TEXT,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Byline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Byline_updatedBy_idx" ON "Byline"("updatedBy");

-- CreateIndex
CREATE INDEX "Byline_createdBy_idx" ON "Byline"("createdBy");

-- AddForeignKey
ALTER TABLE "Byline" ADD CONSTRAINT "Byline_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Byline" ADD CONSTRAINT "Byline_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
