/*
  Warnings:

  - You are about to drop the column `skill_category` on the `skill` table. All the data in the column will be lost.
  - Added the required column `skillCategoryId` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `skill` DROP COLUMN `skill_category`,
    ADD COLUMN `skillCategoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_skillCategoryId_fkey` FOREIGN KEY (`skillCategoryId`) REFERENCES `skill_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
