-- DropForeignKey
ALTER TABLE `promotors` DROP FOREIGN KEY `promotors_promotorImageId_fkey`;

-- AddForeignKey
ALTER TABLE `promotors` ADD CONSTRAINT `promotors_promotorImageId_fkey` FOREIGN KEY (`promotorImageId`) REFERENCES `images`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
