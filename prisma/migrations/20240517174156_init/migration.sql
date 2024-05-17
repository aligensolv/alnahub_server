-- CreateTable
CREATE TABLE `FreeGiftRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requested_by` VARCHAR(191) NOT NULL,
    `requested_at` VARCHAR(191) NOT NULL,
    `request_status` ENUM('pending', 'accepted', 'rejected') NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
