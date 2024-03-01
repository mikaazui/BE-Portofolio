/*
  Warnings:

  - The `startYear` column on the `education` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endYear` column on the `education` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `education` DROP COLUMN `startYear`,
    ADD COLUMN `startYear` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    DROP COLUMN `endYear`,
    ADD COLUMN `endYear` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
