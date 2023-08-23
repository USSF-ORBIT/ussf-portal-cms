/*
  Warnings:

  - The primary key for the `Zipcode` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Zipcode" DROP CONSTRAINT "Zipcode_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Zipcode_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Zipcode_id_seq";
