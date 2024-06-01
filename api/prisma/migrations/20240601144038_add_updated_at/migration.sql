/*
  Warnings:

  - Added the required column `updatedAt` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `images` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
