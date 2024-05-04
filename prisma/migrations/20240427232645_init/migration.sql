-- AddForeignKey
ALTER TABLE `ClientCategoryPurchase` ADD CONSTRAINT `ClientCategoryPurchase_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
