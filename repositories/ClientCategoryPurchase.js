import { PrismaClient } from "@prisma/client"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import GiftRepository from "./Gift.js";

class ClientCategoryPurchaseRepository{
    static prisma = new PrismaClient()

    static async updateClientCategoryPurchases({ products, client_id, req }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    for(let product of products){
                        let existing_category_purchase = await this.prisma.clientCategoryPurchase.findFirst({
                            where: {
                                client_id: +client_id,
                                product_id: +product.product_id
                            },
                            include: {
                                product: true,
                            }
                        })


                        if(!existing_category_purchase){
                            const _product = await this.prisma.product.findFirst({
                                where: {
                                    id: +product.product_id
                                }
                            })
                            
                            let exact = Math.floor(product.quantity / (_product.free_gift_counter + 1)) 
                            await this.prisma.clientCategoryPurchase.create({
                                data: {
                                    product_id: +product.product_id,
                                    client_id: +client_id,
                                    purchase_count: product.quantity - (exact * _product.free_gift_counter) - exact
                                }
                            })

                            let gift = await GiftRepository.createPurchaseGift({ 
                                client_id, 
                                product: _product.name, 
                                quantity: exact
                                })
                            const io = req.app.get('io')
                            io.emit('new_purchase_gift', gift)
                        }else{
                            let exact = Math.floor((product.quantity + existing_category_purchase.purchase_count) / (existing_category_purchase.product.free_gift_counter + 1)) 
                            
                            await this.prisma.clientCategoryPurchase.update({
                                where: {
                                    id: existing_category_purchase.id
                                },
                                data: {
                                    purchase_count: (product.quantity + existing_category_purchase.purchase_count)  - (exact * existing_category_purchase.product.free_gift_counter) - exact
                                }
                            })

                            let gift = await GiftRepository.createPurchaseGift({ 
                                client_id, 
                                product: existing_category_purchase.product.name, 
                                quantity: exact
                                })
                            const io = req.app.get('io')
                            io.emit('new_purchase_gift', gift)
                        }
                    }
                    resolve(true)
                }
            )
        )
    }
}

export default ClientCategoryPurchaseRepository