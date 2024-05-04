/*
  Warnings:

  - You are about to drop the column `categories` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `categories`;

-- CreateTable
CREATE TABLE `ClientCategoryPurchase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `purchase_count` INTEGER NOT NULL,
    `client_id` INTEGER NOT NULL,
    `locked` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientCategoryPurchase` ADD CONSTRAINT `ClientCategoryPurchase_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
