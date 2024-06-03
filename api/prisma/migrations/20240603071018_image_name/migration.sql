/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `images` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `images` ADD COLUMN `name` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `images_name_key` ON `images`(`name`);
