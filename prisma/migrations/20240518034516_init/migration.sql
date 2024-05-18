/*
  Warnings:

  - You are about to drop the column `category` on the `purchasegift` table. All the data in the column will be lost.
  - Added the required column `product` to the `PurchaseGift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchasegift` DROP COLUMN `category`,
    ADD COLUMN `product` VARCHAR(191) NOT NULL;
