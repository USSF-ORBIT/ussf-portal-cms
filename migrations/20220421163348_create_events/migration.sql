-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "operation" TEXT NOT NULL DEFAULT E'',
    "itemListKey" TEXT NOT NULL DEFAULT E'',
    "itemId" TEXT NOT NULL DEFAULT E'',
    "inputData" JSONB,
    "resolvedData" JSONB,
    "changedData" JSONB,
    "originalItem" JSONB,
    "item" JSONB,
    "actor" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_actor_idx" ON "Event"("actor");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_actor_fkey" FOREIGN KEY ("actor") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
