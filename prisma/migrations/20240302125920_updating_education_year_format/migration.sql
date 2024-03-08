/*
  Warnings:

  - The `endYear` column on the `education` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `startYear` on the `education` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `education` DROP COLUMN `startYear`,
    ADD COLUMN `startYear` INTEGER NOT NULL,
    DROP COLUMN `endYear`,
    ADD COLUMN `endYear` INTEGER NULL;
