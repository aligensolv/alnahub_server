import { Router } from "express"
import { completeOrder, createOrder, getAllOrders, getCurrentOrders, getOrdersCount, rejectOrder } from "../controllers/order_controller.js"

const router = Router()

router.get('/orders', getAllOrders)
router.post('/orders', createOrder)

router.get('/orders/current', getCurrentOrders)

router.post('/orders/:id/reject', rejectOrder)
router.post('/orders/:id/complete', completeOrder)

router.get('/orders/count', getOrdersCount)

export default router