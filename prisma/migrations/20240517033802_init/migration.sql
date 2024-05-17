/*
  Warnings:

  - You are about to drop the column `price` on the `freegift` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `friendgift` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `has_gift` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `freegift` DROP COLUMN `price`;

-- AlterTable
ALTER TABLE `friendgift` DROP COLUMN `price`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `total_price`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `description`,
    DROP COLUMN `has_gift`,
    DROP COLUMN `price`;
