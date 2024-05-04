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
                    const total_price = products.reduce((total, product) => total + product.price * product.quantity, 0)

                    const createdOrder = await this.prisma.order.create({ 
                        data: {
                            client_id: +client_id,
                            products,
                            created_at,
                            status: 'pending',
                            total_price
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

    static async completeOrder(id){
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
                        client_id: updatedOrder.client_id
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
}

export default OrderRepository