-- AlterTable
ALTER TABLE `friendgift` MODIFY `status` ENUM('pending', 'verified', 'rejected', 'claimed') NOT NULL;

-- AlterTable
ALTER TABLE `purchasegift` MODIFY `status` ENUM('pending', 'verified', 'rejected', 'claimed') NOT NULL;
