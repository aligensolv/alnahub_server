/*
  Warnings:

  - You are about to drop the column `category` on the `freegift` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `freegift` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `FreeGift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `freegift` DROP COLUMN `category`,
    DROP COLUMN `product`,
    ADD COLUMN `product_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `FreeGift` ADD CONSTRAINT `FreeGift_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
