/*
  Warnings:

  - You are about to drop the column `phone_number` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `order` table. All the data in the column will be lost.
  - The values [OPEN,CLOSED] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `orderproduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categories` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `products` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orderproduct` DROP FOREIGN KEY `OrderProduct_order_id_fkey`;

-- AlterTable
ALTER TABLE `client` ADD COLUMN `created_at` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `phone_number`,
    DROP COLUMN `product_id`,
    ADD COLUMN `categories` JSON NOT NULL,
    ADD COLUMN `products` JSON NOT NULL,
    MODIFY `status` ENUM('open', 'closed') NOT NULL;

-- DropTable
DROP TABLE `orderproduct`;

-- CreateTable
CREATE TABLE `Gift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `status` ENUM('pending', 'claimed') NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Gift` ADD CONSTRAINT `Gift_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
