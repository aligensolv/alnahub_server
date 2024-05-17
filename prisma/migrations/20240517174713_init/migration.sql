/*
  Warnings:

  - Added the required column `product` to the `FreeGiftRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `freegiftrequest` ADD COLUMN `product` VARCHAR(191) NOT NULL;
