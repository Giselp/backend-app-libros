/*
  Warnings:

  - You are about to drop the column `contentUrl` on the `Book` table. All the data in the column will be lost.
  - Added the required column `cover` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "contentUrl",
ADD COLUMN     "cover" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nombre" TEXT NOT NULL;
