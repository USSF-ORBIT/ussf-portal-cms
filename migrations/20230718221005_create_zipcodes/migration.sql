-- CreateTable
CREATE TABLE "Zipcode" (
    "id" BIGSERIAL,
    "code" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Zipcode_pkey" PRIMARY KEY ("code")
);
