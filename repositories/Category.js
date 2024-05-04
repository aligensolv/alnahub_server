import { PrismaClient } from "@prisma/client"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import TimeRepository from "./Time.js"

class CategoryRepository{
    static prisma = new PrismaClient()

    /**
     * Retrieves all categories from the database.
     *
     * @return {Promise<Array>} A promise that resolves to an array of category objects.
     */
    static async getAllCategories(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const categories = await this.prisma.category.findMany()
                    resolve(categories)
                }
            )
        )
    }

    static async getCategoryById(id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const category = await this.prisma.category.findUnique({
                        where: {
                            id: +id
                        }
                    })
                    resolve(category)
                }
            )
        )
    }

    /**
     * Creates a new category with the given name and image.
     *
     * @param {Object} categoryData - The data for the category to be created.
     * @param {string} categoryData.name - The name of the category.
     * @param {string} categoryData.image - The image URL of the category.
     * @return {Promise<Object>} A promise that resolves to the created category object.
     */
    static async createCategory({ name, image, free_gift_counter }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const created_at = await TimeRepository.getCurrentTime()

                    const category = await this.prisma.category.create({
                        data: {
                            name, image, created_at, free_gift_counter: +free_gift_counter
                        }
                    })
                    resolve(category)
                }
            )
        )
    }

    static async updateCategory({ id, name, image, free_gift_counter }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const category = await this.prisma.category.update({
                        where: {
                            id: id
                        },
                        data: {
                            name: name,
                            image: image,
                            free_gift_counter: +free_gift_counter
                        }
                    })
                    resolve(category)
                }
            )
        )
    }

    static async deleteCategory(id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const category = await this.prisma.category.delete({
                        where: {
                            id: +id
                        }
                    })
                    resolve(category)
                }
            )
        )
    }

    static async deleteAllCategories(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const categories = await this.prisma.category.deleteMany()
                    resolve(categories)
                }
            )
        )
    }
}

export default CategoryRepository