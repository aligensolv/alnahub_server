import { PrismaClient } from "@prisma/client"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import TimeRepository from "./Time.js"
import ClientCategoryPurchaseRepository from "./ClientCategoryPurchase.js"

class OrderRepository{
    static prisma = new PrismaClient()

    static async getAllOrders(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const orders = await this.prisma.order.findMany({
                        include: {
                            client: true
                        }
                    })
                    resolve(orders)
                }
            )
        )
    }

    static async getCurrentOrders(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const orders = await this.prisma.order.findMany({
                        where: {
                            status: 'pending'
                        },
                        include: {
                            client: true
                        }
                    })
                    resolve(orders)
                }
            )
        )
    }

    static async createOrder({ products, client_id }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {

                    const created_at = await TimeRepository.getCurrentTime()

                    const mappedProducts = await Promise.all(products.map(async product => {
                        const existing_category_purchase = await this.prisma.clientCategoryPurchase.findFirst({
                            where: {
                                client_id: +client_id,
                                product_id: +product.product_id
                            }
                        })

                        return {
                            ...product,
                            purchase_count: existing_category_purchase ? existing_category_purchase.purchase_count : 0
                        }
                    }));

                    console.log(mappedProducts);

                    const createdOrder = await this.prisma.order.create({ 
                        data: {
                            client_id: +client_id,
                            products: mappedProducts,
                            created_at,
                            status: 'pending',
                        },
                        include: {
                            client: true
                        }
                    })


                    resolve(createdOrder)
                }
            )
        )
    }

    static async completeOrder(id, req){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const updatedOrder = await this.prisma.order.update({ 
                        where: {
                            id: +id
                        },
                        data: {
                            status: 'completed'
                        }
                    })

                    await ClientCategoryPurchaseRepository.updateClientCategoryPurchases({ 
                        products: updatedOrder.products, 
                        client_id: updatedOrder.client_id,
                        req
                    })
                    resolve(updatedOrder)
                }
            )
        )
    }

    static async rejectOrder(id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const updatedOrder = await this.prisma.order.update({ 
                        where: {
                            id: +id
                        },
                        data: {
                            status: 'rejected'
                        }
                    })
                    resolve(updatedOrder)
                }
            )
        )
    }

    static async getOrdersCount(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const count = await this.prisma.order.count()
                    resolve(count)
                }
            )
        )
    }

    static async updateOrderProducts(id, products){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const updatedOrder = await this.prisma.order.update({ 
                        where: {
                            id: +id
                        },
                        data: {
                            products
                        }
                    })
                    resolve(updatedOrder)
                }
            )
        )
    }
}

export default OrderRepository