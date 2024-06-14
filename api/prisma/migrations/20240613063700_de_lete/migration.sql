-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_posterId_fkey`;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_posterId_fkey` FOREIGN KEY (`posterId`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
