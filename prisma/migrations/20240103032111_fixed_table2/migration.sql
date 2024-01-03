-- AlterTable
ALTER TABLE `education` MODIFY `endYear` INTEGER NULL;

-- AlterTable
ALTER TABLE `profile` MODIFY `address` TEXT NULL;

-- AlterTable
ALTER TABLE `project` MODIFY `description` TEXT NULL,
    MODIFY `endDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `status` ENUM('ON_PROGRESS', 'MAINTENANCE', 'COMPLETED') NULL DEFAULT 'ON_PROGRESS';

-- AlterTable
ALTER TABLE `user` MODIFY `token` VARCHAR(250) NULL;
