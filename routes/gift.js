import { Router } from "express"
import { checkForAvailableFreeGift, createFreeGiftRequest, createFriendsGift, createSystemGift, getAllGiftRequests, getCurrentFreeGifts, getCurrentFriendGifts, getCurrentPurchaseGifts, getTotalDonationGifts, redeemPurchaseGift, rejectFriendGift, rejectGiftRequest, rejectSystemGift, updateSystemGift, verifyFriendGift, verifyGiftRequest, verifySystemGift } from "../controllers/gift_controller.js"

const router = Router()

router.post('/gifts/friends', createFriendsGift)
router.post('/gifts/friends/:id/verify', verifyFriendGift)
router.post('/gifts/friends/:id/reject', rejectFriendGift)
router.post('/gifts/system', createSystemGift)
router.post('/gifts/system/:id/verify', verifySystemGift)
router.post('/gifts/system/:id/reject', rejectSystemGift)
router.post('/gifts/system/:id/update', updateSystemGift)
router.post('/gifts/purchase/:id/redeem', redeemPurchaseGift)

router.get('/gifts/system/current', getCurrentFreeGifts)
router.get('/gifts/purchase/current', getCurrentPurchaseGifts)
router.get('/gifts/friend/current', getCurrentFriendGifts)

router.get('/gifts/free/product/:id/check', checkForAvailableFreeGift)
router.get('/gifts/donation/count', getTotalDonationGifts)

router.get('/gifts/requests', getAllGiftRequests)
router.post('/gifts/requests', createFreeGiftRequest)
router.post('/gifts/requests/:id/verify', verifyGiftRequest)
router.post('/gifts/requests/:id/reject', rejectGiftRequest)

export default router