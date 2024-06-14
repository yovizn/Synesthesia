-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `Carts_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `Carts_ticketsId_fkey`;

-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `Carts_userId_fkey`;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `promo` DECIMAL(18, 2) NULL;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_ticketsId_fkey` FOREIGN KEY (`ticketsId`) REFERENCES `tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
