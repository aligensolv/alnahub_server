import { PrismaClient } from "@prisma/client"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import TimeRepository from "./Time.js"

class ProductRepository{
    static prisma = new PrismaClient()

    static async getAllProducts(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const products = await this.prisma.product.findMany({
                        include: {
                            category: true
                        }
                    })
                    resolve(products)
                }
            )
        )
    }

    static async getAllEligibleProducts(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const products = await this.prisma.product.findMany({
                        where: {
                            has_gift: true
                        },
                        include: {
                            category: true
                        }
                    })
                    resolve(products)
                }
            )
        )
    }

    static async getProductsByCategoryId(category_id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const products = await this.prisma.product.findMany({
                        where: {
                            category_id: +category_id
                        },
                        include: {
                            category: true
                        }
                    })
                    resolve(products)
                }
            )
        )
    }

    static async createProduct({ name, price, image, description, category_id }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const created_at = await TimeRepository.getCurrentTime()
                    const category = await this.prisma.category.findUnique({
                        where: {
                            id: +category_id
                        }
                    })
                    const product = await this.prisma.product.create({
                        data: {
                            name,
                            price,
                            description,
                            image,
                            category_id: +category_id,
                            created_at
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
}

export default ProductRepository