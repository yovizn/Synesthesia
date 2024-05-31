/*
  Warnings:

  - You are about to drop the column `avatar` on the `promotors` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `expPoint` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `promotors` DROP COLUMN `avatar`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `avatar`,
    DROP COLUMN `expPoint`;
