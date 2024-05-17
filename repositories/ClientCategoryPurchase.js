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
                                category_id: +product.category_id
                            },
                            include: {
                                category: true
                            }
                        })


                        if(!existing_category_purchase){
                            await this.prisma.clientCategoryPurchase.create({
                                data: {
                                    category_id: +product.category_id,
                                    client_id: +client_id,
                                    purchase_count: +product.quantity
                                }
                            })
                        }else{
                            if(existing_category_purchase.purchase_count + product.quantity < existing_category_purchase.category.free_gift_counter){
                                await this.prisma.clientCategoryPurchase.update({
                                    where: {
                                        id: existing_category_purchase.id
                                    },
                                    data: {
                                        purchase_count: {
                                            increment: +product.quantity
                                        }
                                    }
                                })
                            }else{
                                await this.prisma.clientCategoryPurchase.update({
                                    where: {
                                        id: existing_category_purchase.id
                                    },
                                    data: {
                                        purchase_count: existing_category_purchase.purchase_count + product.quantity - existing_category_purchase.category.free_gift_counter - 1
                                    }
                                })
                                gift = await GiftRepository.createPurchaseGift({ client_id, category: existing_category_purchase.category.name })
                                const io = req.app.get('io')
                                io.emit('new_purchase_gift', result)
                            }
                        }
                    }
                    resolve(true)
                }
            )
        )
    }
}

export default ClientCategoryPurchaseRepository