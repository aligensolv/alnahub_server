import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import GiftStoraeRepository from "../repositories/GiftStorage.js"

export const getStorage = asyncWrapper(
    async (req, res) => {
        const result = await GiftStoraeRepository.getStorage()
        res.status(OK).json(result)
    }
)

export const getProductStorage = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const result = await GiftStoraeRepository.getProductStorage(id)
        res.status(OK).json(result)
    }
)