/*
  Warnings:

  - You are about to alter the column `price` on the `friendgift` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `friendgift` MODIFY `price` INTEGER NOT NULL;
