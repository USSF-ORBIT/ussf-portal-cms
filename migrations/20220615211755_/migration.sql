-- CreateTable
CREATE TABLE "CallToAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "updatedBy" TEXT,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CallToAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CallToAction_updatedBy_idx" ON "CallToAction"("updatedBy");

-- CreateIndex
CREATE INDEX "CallToAction_createdBy_idx" ON "CallToAction"("createdBy");

-- AddForeignKey
ALTER TABLE "CallToAction" ADD CONSTRAINT "CallToAction_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallToAction" ADD CONSTRAINT "CallToAction_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
