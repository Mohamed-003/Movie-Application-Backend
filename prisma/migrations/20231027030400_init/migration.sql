/*
  Warnings:

  - You are about to drop the column `listId` on the `List` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "List_listId_key";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "listId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "List_pkey" PRIMARY KEY ("id");
