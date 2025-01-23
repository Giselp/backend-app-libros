/*
  Warnings:

  - You are about to drop the column `userId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the `_UserBooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserBooks" DROP CONSTRAINT "_UserBooks_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserBooks" DROP CONSTRAINT "_UserBooks_B_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "userId";

-- DropTable
DROP TABLE "_UserBooks";
