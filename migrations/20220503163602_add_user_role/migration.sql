-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('User', 'Author', 'Manager');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRoleType" NOT NULL DEFAULT E'User';
