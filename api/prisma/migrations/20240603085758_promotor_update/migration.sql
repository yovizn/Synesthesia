/*
  Warnings:

  - You are about to drop the column `avatar` on the `promotors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `promotors` DROP COLUMN `avatar`,
    ADD COLUMN `balance` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `promotorDescription` VARCHAR(191) NULL,
    ADD COLUMN `promotorImageId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `promotors` ADD CONSTRAINT `promotors_promotorImageId_fkey` FOREIGN KEY (`promotorImageId`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
