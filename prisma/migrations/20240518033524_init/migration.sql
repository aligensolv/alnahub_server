/*
  Warnings:

  - You are about to drop the column `category_id` on the `clientcategorypurchase` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_id` to the `ClientCategoryPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `clientcategorypurchase` DROP FOREIGN KEY `ClientCategoryPurchase_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_category_id_fkey`;

-- AlterTable
ALTER TABLE `clientcategorypurchase` DROP COLUMN `category_id`,
    ADD COLUMN `product_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `category_id`,
    ADD COLUMN `free_gift_counter` INTEGER NOT NULL DEFAULT 5;

-- DropTable
DROP TABLE `category`;

-- AddForeignKey
ALTER TABLE `ClientCategoryPurchase` ADD CONSTRAINT `ClientCategoryPurchase_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
