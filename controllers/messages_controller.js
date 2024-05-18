import asyncWrapper from "../middlewares/async_wrapper.js"
import SmsRepository from "../repositories/Sms.js"

export const getMessagesCount = asyncWrapper(
    async (req, res) => {
        const count = await SmsRepository.getTotalSmsCount()
        res.json(count)
    }
)