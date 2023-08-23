-- CreateTable
CREATE TABLE "Zipcode" (
    "id" SERIAL,
    "code" TEXT NOT NULL DEFAULT '',
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Zipcode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Zipcode_code_key" ON "Zipcode"("code");
