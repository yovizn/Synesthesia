/*
  Warnings:

  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `avatar`,
    ADD COLUMN `imageId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
