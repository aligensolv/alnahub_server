import { PrismaClient } from "@prisma/client"
import TimeRepository from "./Time.js"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import CustomError from "../interfaces/custom_error_class.js"
import { NOT_FOUND } from "../constants/status_codes.js"
import Auth from "./Auth.js"

class ClientRepository{
    static prisma = new PrismaClient()

    static async getAllClients(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const clients = await this.prisma.client.findMany()
                    resolve(clients)
                }
            )
        )
    }

    static async getTotalClientsCount(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const count = await this.prisma.client.count()
                    resolve(count)
                }
            )
        )
    }

    static async getClientById(id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const client = await this.prisma.client.findFirst({
                        where: {
                            id: +id
                        }
                    })
                    resolve(client)
                }
            )
        )
    }

    static async getClientByPhoneNumber({ phone_number }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const client = await this.prisma.client.findFirst({
                        where: {
                            phone_number
                        }
                    })
                    resolve(client)
                }
            )
        )
    }

    static async createClient({ phone_number }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const created_at = await TimeRepository.getCurrentTime()
                    const createdClient = await this.prisma.client.create({ 
                        data: {
                            phone_number,
                            created_at
                        },
                        include: {
                            category_purchases: {
                                include: {
                                    category: true
                                }
                            },
                            orders: true
                        }
                    })
                    resolve(createdClient)
                }
            )
        )
    }

    static async loginClient({ phone_number }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const client = await this.prisma.client.findUnique({
                        where: {
                            phone_number
                        },
                        include: {
                            category_purchases: {
                                include: {
                                    category: true
                                }
                            },
                            orders: true
                        }
                    })

                    if(!client){
                        const newClient = await this.createClient({ phone_number })

                        return resolve(newClient)
                    }

                    const token = await Auth.generateToken({ phone_number, id: client.id })

                    resolve({ client, token })
                }
            )
        )
    }
}

export default ClientRepository