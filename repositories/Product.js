import { PrismaClient } from "@prisma/client"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import TimeRepository from "./Time.js"

class ProductRepository{
    static prisma = new PrismaClient()

    static async getAllProducts(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const products = await this.prisma.product.findMany()
                    resolve(products)
                }
            )
        )
    }

    static async createProduct({ name, image, free_gift_counter }) {
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const created_at = await TimeRepository.getCurrentTime()

                    const product = await this.prisma.product.create({
                        data: {
                            name,
                            image,
                            free_gift_counter: +free_gift_counter,
                            created_at,
                        }
                    })
                    resolve(product)
                }
            )
        )
    }

    static async deleteProduct(id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const product = await this.prisma.product.delete({
                        where: {
                            id: +id
                        }
                    })
                    resolve(product)
                }
            )
        )
    }

    static deleteAllProducts(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const products = await this.prisma.product.deleteMany()
                    resolve(products)
                }
            )
        )
    }

    static async getProductsCount(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const count = await this.prisma.product.count()
                    resolve(count)
                }
            )
        )
    }
}

export default ProductRepository