/*
  Warnings:

  - You are about to drop the column `birthday` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "birthday",
ADD COLUMN     "age" TEXT;
