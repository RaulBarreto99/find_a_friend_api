/*
  Warnings:

  - The `requirements` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "energy" DROP NOT NULL,
ALTER COLUMN "independence" DROP NOT NULL,
ALTER COLUMN "enviroment" DROP NOT NULL,
DROP COLUMN "requirements",
ADD COLUMN     "requirements" JSONB,
ALTER COLUMN "birthday" DROP NOT NULL;
