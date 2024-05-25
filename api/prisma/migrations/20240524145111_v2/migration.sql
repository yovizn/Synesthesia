-- AlterTable
ALTER TABLE `users` MODIFY `point` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `vouchers` MODIFY `transactionId` VARCHAR(191) NULL;
