/*
  Warnings:

  - You are about to alter the column `price` on the `friendgift` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `price` to the `FreeGift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `freegift` ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `friendgift` MODIFY `price` DOUBLE NOT NULL;
