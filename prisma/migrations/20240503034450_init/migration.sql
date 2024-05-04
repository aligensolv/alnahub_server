-- AlterTable
ALTER TABLE `freegift` MODIFY `status` ENUM('pending', 'verified', 'rejected', 'claimed') NOT NULL;
