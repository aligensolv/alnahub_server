import { PrismaClient } from "@prisma/client"
import TimeRepository from "./Time.js"
import ClientRepository from "./Client.js"
import Randomstring from "randomstring"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import SmsRepository from "./Sms.js"
import ClientCategoryPurchaseRepository from "./ClientCategoryPurchase.js"

class GiftRepository{
    static prisma = new PrismaClient()

    static async createPurchaseGift({ client_id, category }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const created_at = await TimeRepository.getCurrentTime()
                    const unique_code = Randomstring.generate({
                        length: 10,
                        charset: 'numeric'
                    })

                    const gift = await this.prisma.purchaseGift.create({
                        data: {
                            client_id: client_id,
                            created_at,
                            status: 'pending',
                            category,
                            code: unique_code,
                        }
                    })

                    const client = await ClientRepository.getClientById(client_id)

                    await SmsRepository.sendMessage({
                        to: client.phone_number,
                        message: `Your gift code for ${category} is ${unique_code}`
                    })

                    resolve(gift)
                }
            )
        )
    }

    static async createFreeGift ({ category, product, phone_number }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const created_at = await TimeRepository.getCurrentTime()
                    const unique_code = Randomstring.generate({
                        length: 10,
                        charset: 'numeric'
                    })

                    const gift = await this.prisma.freeGift.create({
                        data: {
                            product_id: product.id,
                            client: phone_number,
                            code: unique_code,
                            created_at,
                            status: 'pending',
                            price: product.price
                        }
                    })

                    resolve(gift)
                }
            )
        )
    }

    static async createFriendsGift({ client_number, phone_numbers, category, product }) {
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    for(let phone_number of phone_numbers){
                        const created_at = await TimeRepository.getCurrentTime()
                        const unique_code = Randomstring.generate({
                            length: 10,
                            charset: 'numeric'
                        })

                        let client = await ClientRepository.getClientByPhoneNumber({ phone_number })

                        if(!client){
                            client = await ClientRepository.createClient({ phone_number })
                        }

                        await this.prisma.friendGift.create({
                            data: {
                                created_at,
                                sender: client_number,
                                reciever: phone_number,
                                status: 'pending',
                                code: unique_code,
                                category: category.name,
                                product: product.name,
                                price: product.price
                            }
                        })
                    }

                    resolve(true)
                }
            )
        )
    }

    static async checkForAvailableFreeGifts(id){
        console.log(id);
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const gifts = await this.prisma.freeGift.findMany({
                        where: {
                            status: 'verified',
                            product_id: +id
                        }
                    })

                    console.log(gifts);

                    resolve(gifts)
                }
            )
        )
    }

    static async claimFreeCoffee({ product_id, client_number }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const gift = await this.prisma.freeGift.update({
                        where: {
                            status: 'verified',
                        },
                        data: {
                            status: 'claimed',
                        }
                    })

                    resolve(gift)
                }
            )
        )
    }

    static async getTotalDonationGifts(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const total = await this.prisma.freeGift.count()
                    resolve(total)
                }
            )
        )
    }

    static async getCurrentFreeGifts(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const gifts = await this.prisma.freeGift.findMany({
                        where: {
                            OR: [
                                {
                                    status: 'pending'
                                },
                                {
                                    status: 'verified'
                                }
                            ]
                        },
                        include: {
                            product: {
                                include: {
                                    category: true
                                }
                            }
                        },
                    })
                    resolve(gifts)
                }
            )
        )
    }

    static async getCurrentPurchaseGifts(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const gifts = await this.prisma.purchaseGift.findMany({
                        where: {
                            OR: [
                                {
                                    status: 'pending'
                                },
                                {
                                    status: 'claimed'
                                }
                            ]
                        },
                        include: {
                            client: true
                        }
                    })
                    resolve(gifts)
                }
            )
        )
    }

    static async getCurrentFriendGifts(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const gifts = await this.prisma.friendGift.findMany({
                        where: {
                            status: 'pending'
                        }
                    })
                    resolve(gifts)
                }
            )
        )
    }

    static async verifyFriendGift(id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const updated = await this.prisma.friendGift.update({
                        where: {
                            id: +id
                        },
                        data: {
                            status: 'verified'
                        }
                    })

                    if(updated != null){
                        await SmsRepository.sendMessage({
                            to: updated.reciever,
                            message: `Your friend with number ${updated.sender} sent you ${updated.product}\ngift code is ${updated.code}`
                        })
                    }
                    resolve(updated)
                }
            )
        )
    }

    static async verifySystemGift(id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const updated = await this.prisma.freeGift.update({
                        where: {
                            id: +id
                        },
                        include: {
                            product: {
                                include: {
                                    category: true
                                }
                            }
                        },
                        data: {
                            status: 'verified'
                        }
                    })

                    const client = await ClientRepository.getClientByPhoneNumber({
                        phone_number: updated.client
                    })

                    await ClientCategoryPurchaseRepository.updateClientCategoryPurchases({ 
                        products: [{
                            category_id: updated.product.category_id,
                            quantity: 1,
                            price: updated.price,
                            category: updated.product.category
                        }], 
                        client_id: client.id
                    })

                    resolve(updated)
                }
            )
        )
    }

    static async redeemPurchaseGift(id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const updated = await this.prisma.purchaseGift.update({
                        where: {
                            id: +id
                        },
                        data: {
                            status: 'claimed'
                        }
                    })

                    resolve(updated)
                }
            )
        )
    }

    static async rejectSystemGift(id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const updated = await this.prisma.freeGift.update({
                        where: {
                            id: +id
                        },
                        data: {
                            status: 'rejected'
                        }
                    })

                    resolve(updated)
                }
            )
        )
    }

    static async rejectFriendGift(id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const updated = await this.prisma.friendGift.update({
                        where: {
                            id: +id
                        },
                        data: {
                            status: 'rejected'
                        }
                    })

                    resolve(updated)
                }
            )
        )
    }
}

export default GiftRepository