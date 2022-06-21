/*
  Warnings:

  - Added the required column `type` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LabelTypeType" AS ENUM ('Source', 'Audience', 'Base');

-- AlterTable
ALTER TABLE "Label" ADD COLUMN     "type" "LabelTypeType" NOT NULL;
