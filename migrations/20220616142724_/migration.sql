/*
  Warnings:

  - You are about to drop the `CallToAction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CallToAction" DROP CONSTRAINT "CallToAction_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "CallToAction" DROP CONSTRAINT "CallToAction_updatedBy_fkey";

-- DropTable
DROP TABLE "CallToAction";
