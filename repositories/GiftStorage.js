import { PrismaClient } from '@prisma/client'
import promiseAsyncWrapper from '../middlewares/promise_async_wrapper.js'

class GiftStoraeRepository {
    static prisma = new PrismaClient()
    
    static async storeGift({ product, quantity }) {
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const searched = await this.prisma.giftStorage.findFirst({
                        where: {
                            product_id: product.id
                        }
                    })

                    if (searched) {
                        const updated = await this.prisma.giftStorage.update({
                            where: {
                                id: searched.id
                            },
                            data: {
                                quantity: searched.quantity + quantity
                            }
                        })
                        resolve(updated)
                    } else {
                        const created = await this.prisma.giftStorage.create({
                            data: {
                                product_id: product.id,
                                quantity
                            }
                        })
                        resolve(created)
                    }
                }
            )
        )
    }

    static async takeFromStorage({ product, quantity }) {
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const searched = await this.prisma.giftStorage.findFirst({
                        where: {
                            product_id: product.id
                        }
                    })

                    if(searched.quantity != 0 && searched.quantity >= quantity) {
                        const updated = await this.prisma.giftStorage.update({
                            where: {
                                id: searched.id
                            },
                            data: {
                                quantity: searched.quantity - quantity
                            }
                        })
                        resolve(updated)
                    } else {
                        resolve(null)
                    }
                    
                }
            )
        )
    }

    static async getStorage() {
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const result = await this.prisma.giftStorage.findMany({
                        include: {
                            product: true
                        }
                    })
                    resolve(result)
                }
            )
        )
    }

    static async getProductStorage(product_id) {
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const result = await this.prisma.giftStorage.findFirst({
                        where: {
                            product_id: +product_id
                        },
                        include: {
                            product: true
                        }
                    })
                    resolve(result)
                }
            )
        )
    }
}

export default GiftStoraeRepository