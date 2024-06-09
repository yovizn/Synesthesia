/*
  Warnings:

  - You are about to drop the column `venue_type` on the `events` table. All the data in the column will be lost.
  - The primary key for the `transaciton_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `transaciton_items` table. All the data in the column will be lost.
  - Added the required column `venueType` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketsId` to the `transaciton_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `venue_type`,
    ADD COLUMN `posterId` VARCHAR(191) NULL,
    ADD COLUMN `useVoucher` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `venueType` ENUM('INDOOR', 'OUTDOOR') NOT NULL;

-- AlterTable
ALTER TABLE `transaciton_items` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `ticketsId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`transactionId`, `ticketsId`);

-- CreateTable
CREATE TABLE `tickets` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `price` DECIMAL(18, 2) NOT NULL,
    `type` ENUM('REGULER', 'VIP') NOT NULL DEFAULT 'REGULER',
    `capacity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_posterId_fkey` FOREIGN KEY (`posterId`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaciton_items` ADD CONSTRAINT `transaciton_items_ticketsId_fkey` FOREIGN KEY (`ticketsId`) REFERENCES `tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
