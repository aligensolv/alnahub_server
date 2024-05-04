import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import GiftRepository from "../repositories/Gift.js";

export const createFriendsGift = asyncWrapper(
    async (req, res) => {
        const { client_number, phone_numbers, category, product } = req.body
        console.log(req.body);
        const result = await GiftRepository.createFriendsGift({ client_number, phone_numbers, category, product })
        res.status(OK).json(result)
    }
)

export const createSystemGift = asyncWrapper(
    async (req, res) => {
        const { category, product, phone_number } = req.body
        const result = await GiftRepository.createFreeGift({ category, product, phone_number })

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