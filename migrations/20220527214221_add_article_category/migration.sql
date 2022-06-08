/*
  Warnings:

  - Added the required column `category` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ArticleCategoryType" AS ENUM ('InternalNews', 'ORBITBlog');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "category" "ArticleCategoryType" NOT NULL;
