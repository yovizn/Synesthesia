/*
  Warnings:

  - You are about to drop the column `invoiceNuber` on the `transacitons` table. All the data in the column will be lost.
  - Added the required column `invoiceNumber` to the `transacitons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transacitons` DROP COLUMN `invoiceNuber`,
    ADD COLUMN `invoiceNumber` VARCHAR(191) NOT NULL;
