-- DropForeignKey
ALTER TABLE `transacitons` DROP FOREIGN KEY `transacitons_voucherId_fkey`;

-- AlterTable
ALTER TABLE `transacitons` MODIFY `voucherId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `transacitons` ADD CONSTRAINT `transacitons_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `vouchers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
