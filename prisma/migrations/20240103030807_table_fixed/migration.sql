/*
  Warnings:

  - You are about to alter the column `startYear` on the `education` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - Changed the type of `endYear` on the `education` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `education` MODIFY `startYear` INTEGER NOT NULL,
    DROP COLUMN `endYear`,
    ADD COLUMN `endYear` INTEGER NOT NULL,
    MODIFY `major` VARCHAR(100) NULL,
    MODIFY `degree` VARCHAR(100) NULL;
