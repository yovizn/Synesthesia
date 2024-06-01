/*
  Warnings:

  - You are about to drop the column `endAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `events` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(18,2)`.
  - You are about to drop the column `expPoint` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `users` table. All the data in the column will be lost.
  - Added the required column `end_at` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_vip` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_at` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `endAt`,
    DROP COLUMN `startAt`,
    ADD COLUMN `end_at` DATETIME(3) NOT NULL,
    ADD COLUMN `price_vip` DECIMAL(18, 2) NOT NULL,
    ADD COLUMN `start_at` DATETIME(3) NOT NULL,
    MODIFY `price` DECIMAL(18, 2) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `expPoint`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `exp_point` DATETIME(3) NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `images` (
    `id` VARCHAR(191) NOT NULL,
    `blob` LONGBLOB NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
