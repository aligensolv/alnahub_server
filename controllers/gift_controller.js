import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import GiftRepository from "../repositories/Gift.js";

export const createFriendsGift = asyncWrapper(
    async (req, res) => {
        const { client_number, phone_numbers, product } = req.body
        console.log(req.body);
        const result = await GiftRepository.createFriendsGift({ client_number, phone_numbers, product, req })

        res.status(OK).json(result)
    }
)

export const createSystemGift = asyncWrapper(
    async (req, res) => {
        const { product, phone_number } = req.body
        const result = await GiftRepository.createFreeGift({ product, phone_number })

        const io = req.app.get('io')
        io.emit('new_system_gift', result)

        res.status(OK).json(result)
    }
)

export const checkForAvailableFreeGift = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const result = await GiftRepository.checkForAvailableFreeGifts(id)
        res.status(OK).json(result)
    }
)

export const getTotalDonationGifts = asyncWrapper(
    async (req, res) => {
        const result = await GiftRepository.getTotalDonationGifts()
        res.status(OK).json(result)
    }
)

export const getCurrentFreeGifts = asyncWrapper(
    async (req, res) => {
        const result = await GiftRepository.getCurrentFreeGifts()
        console.log(result);
        res.status(OK).json(result)
    }
)

export const getCurrentPurchaseGifts = asyncWrapper(
    async (req, res) => {
        const result = await GiftRepository.getCurrentPurchaseGifts()
        res.status(OK).json(result)
    }
)

export const getCurrentFriendGifts = asyncWrapper(
    async (req, res) => {
        const result = await GiftRepository.getCurrentFriendGifts()
        res.status(OK).json(result)
    }
)

export const verifyFriendGift = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const result = await GiftRepository.verifyFriendGift(id)

        return res.status(OK).json(result)
    }
)

export const verifySystemGift = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const result = await GiftRepository.verifySystemGift(id)

        return res.status(OK).json(result)
    }
)

export const redeemPurchaseGift = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const result = await GiftRepository.redeemPurchaseGift(id)

        return res.status(OK).json(result)
    }
)

export const rejectSystemGift = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const result = await GiftRepository.rejectSystemGift(id)

        return res.status(OK).json(result)
    }
)

export const rejectFriendGift = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const result = await GiftRepository.rejectFriendGift(id)

        return res.status(OK).json(result)
    }
)

export const createFreeGiftRequest = asyncWrapper(
    async (req,res) => {
        const {sender,product} = req.body

        const result = await GiftRepository.createFreeGiftRequest({sender,product})

        const io = req.app.get('io')
        io.emit('new_gift_request', result)

        return res.status(OK).json(result)
    }
)

export const getAllGiftRequests = asyncWrapper(
    async (req,res) => {
        const result = await GiftRepository.getCurrentGiftRequest()

        return res.status(OK).json(result)
    }
)

export const verifyGiftRequest = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const result = await GiftRepository.verifyGiftRequest(id)

        return res.status(OK).json(result)
    }    
)

export const rejectGiftRequest = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const result = await GiftRepository.rejectGiftRequest(id)

        return res.status(OK).json(result)
    }    
)