import { Router } from "express"
import { completeOrder, createOrder, getAllOrders, getCurrentOrders, getOrdersCount, rejectOrder, updateOrderProducts } from "../controllers/order_controller.js"

const router = Router()

router.get('/orders', getAllOrders)
router.post('/orders', createOrder)

router.get('/orders/current', getCurrentOrders)

router.post('/orders/:id/reject', rejectOrder)
router.post('/orders/:id/complete', completeOrder)

router.get('/orders/count', getOrdersCount)

router.patch('/orders/:id/products', updateOrderProducts)

export default router