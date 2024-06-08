/*
  Warnings:

  - Added the required column `imageId` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `imageId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `images`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
