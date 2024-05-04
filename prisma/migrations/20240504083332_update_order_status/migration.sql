-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('pending', 'completed', 'verified', 'rejected') NOT NULL;
