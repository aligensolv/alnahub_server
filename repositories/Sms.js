import { stringify } from 'querystring';
import { nexmo_api_key, nexmo_api_secret, nexmo_api_url, nexmo_from_name } from "../config.js";
import axios from "axios";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import {PrismaClient} from "@prisma/client"
import TimeRepository from './Time.js';

class SmsRepository{
    static prisma = new PrismaClient()
    static async sendMessage({ to, message }){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const nexmo_data = stringify({
                    api_key: nexmo_api_key,
                    api_secret: nexmo_api_secret,
                    type: 'text',
                    from: nexmo_from_name,
                    to: to,
                    text: message
                });

                await axios.post(nexmo_api_url, nexmo_data,{
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded;'
                    }
                })

                return resolve(true)
            })
        )
    }

    static async getAllSms(){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const sms = await this.prisma.sms.findMany()
                return resolve(sms)
            })
        )
    }

    static async getTotalSmsCount(){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const count = await this.prisma.sms.count()
                return resolve(count)
            })
        )
    }


    static async storeSms({ to, message }){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const created_at = await TimeRepository.getCurrentTime()
                const sms = await this.prisma.sms.create({
                    data: {
                        reciever: to,
                        message,
                        created_at,
                        type: 'gift'
                    }
                })
                return resolve(sms)
            })
        )
    }
}

export default SmsRepository