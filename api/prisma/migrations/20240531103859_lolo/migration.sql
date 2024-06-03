/*
  Warnings:

  - You are about to alter the column `price` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(18,2)`.
  - Added the required column `price_vip` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `price_vip` DECIMAL(18, 2) NOT NULL,
    MODIFY `price` DECIMAL(18, 2) NOT NULL;
