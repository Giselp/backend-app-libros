/*
  Warnings:

  - You are about to drop the `_BookToComments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CommentsToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookId` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookToComments" DROP CONSTRAINT "_BookToComments_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToComments" DROP CONSTRAINT "_BookToComments_B_fkey";

-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_CommentsToUser" DROP CONSTRAINT "_CommentsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentsToUser" DROP CONSTRAINT "_CommentsToUser_B_fkey";

-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "bookId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BookToComments";

-- DropTable
DROP TABLE "_BookToUser";

-- DropTable
DROP TABLE "_CommentsToUser";

-- CreateTable
CREATE TABLE "_UserBooks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserBooks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserBooks_B_index" ON "_UserBooks"("B");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBooks" ADD CONSTRAINT "_UserBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBooks" ADD CONSTRAINT "_UserBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
