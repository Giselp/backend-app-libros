-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "sinopsis" TEXT NOT NULL DEFAULT 'Sin sinopsis';

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "review" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToComments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BookToComments_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CommentsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CommentsToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookToComments_B_index" ON "_BookToComments"("B");

-- CreateIndex
CREATE INDEX "_CommentsToUser_B_index" ON "_CommentsToUser"("B");

-- AddForeignKey
ALTER TABLE "_BookToComments" ADD CONSTRAINT "_BookToComments_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToComments" ADD CONSTRAINT "_BookToComments_B_fkey" FOREIGN KEY ("B") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentsToUser" ADD CONSTRAINT "_CommentsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentsToUser" ADD CONSTRAINT "_CommentsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
