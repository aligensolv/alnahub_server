/*
  Warnings:

  - Added the required column `type` to the `Gift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gift` ADD COLUMN `type` ENUM('purchase', 'donation', 'friend') NOT NULL;
