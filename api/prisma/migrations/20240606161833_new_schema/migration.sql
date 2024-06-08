/*
  Warnings:

  - You are about to drop the column `price` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `price_vip` on the `events` table. All the data in the column will be lost.
  - You are about to drop the `transaciton_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transacitons` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,from_userId]` on the table `vouchers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `from_userId` to the `vouchers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transaciton_items` DROP FOREIGN KEY `transaciton_items_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `transacitons` DROP FOREIGN KEY `transacitons_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `transacitons` DROP FOREIGN KEY `transacitons_userId_fkey`;

-- DropForeignKey
ALTER TABLE `transacitons` DROP FOREIGN KEY `transacitons_voucherId_fkey`;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `price`,
    DROP COLUMN `price_vip`,
    ADD COLUMN `use_voucher` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `vouchers` ADD COLUMN `from_userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `transaciton_items`;

-- DropTable
DROP TABLE `transacitons`;

-- CreateTable
CREATE TABLE `tickets` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `ticketType` ENUM('vip', 'reguler') NULL DEFAULT 'reguler',
    `price` DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    `capacity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `event_ticket_unique_key`(`eventId`, `ticketType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_items` (
    `transactionId` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `price` DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    `discount` DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `transaction_items_ticket_fkey`(`ticketId`),
    PRIMARY KEY (`transactionId`, `ticketId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(191) NOT NULL,
    `invoiceNuber` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `totalPrice` DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    `discountPoint` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('UNPAID', 'PENDING', 'SUCCESS') NOT NULL DEFAULT 'PENDING',

    INDEX `transactions_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `vouchers_from_userId_fkey` ON `vouchers`(`from_userId`);

-- CreateIndex
CREATE UNIQUE INDEX `user_referral_unique_combination_key` ON `vouchers`(`userId`, `from_userId`);

-- AddForeignKey
ALTER TABLE `vouchers` ADD CONSTRAINT `vouchers_from_userId_fkey` FOREIGN KEY (`from_userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `ticket_event_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_items` ADD CONSTRAINT `transaction_items_ticket_fkey` FOREIGN KEY (`ticketId`) REFERENCES `tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_items` ADD CONSTRAINT `transaction_items_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
