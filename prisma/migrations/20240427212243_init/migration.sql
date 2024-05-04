/*
  Warnings:

  - You are about to drop the column `locked` on the `clientcategorypurchase` table. All the data in the column will be lost.
  - The values [open,closed] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `clientcategorypurchase` DROP COLUMN `locked`;

-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('pending', 'completed', 'rejected') NOT NULL;
