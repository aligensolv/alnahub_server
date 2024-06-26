import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import OrderRepository from "../repositories/Order.js"

export const getAllOrders = asyncWrapper(
    async (req, res) => {
        const orders = await OrderRepository.getAllOrders()
        res.status(OK).json(orders)
    }
)

export const getCurrentOrders = asyncWrapper(
    async (req, res) => {
        const orders = await OrderRepository.getCurrentOrders()
        res.status(OK).json(orders)
    }
)

export const createOrder = asyncWrapper(
    async (req, res) => {
        const { products, client_id } = req.body
        const order = await OrderRepository.createOrder({ products, client_id })

        const io = req.app.get('io')
        io.emit('new_order', order)
        res.status(OK).json(true)
    }
)

export const completeOrder = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const order = await OrderRepository.completeOrder(id,req)
        res.status(OK).json(order)
    }
)

export const rejectOrder = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const order = await OrderRepository.rejectOrder(id)
        res.status(OK).json(order)
    }
)

export const getOrdersCount = asyncWrapper(
    async (req, res) => {
        const count = await OrderRepository.getOrdersCount()
        res.status(OK).json(count)
    }
) 

export const updateOrderProducts = asyncWrapper(
    async (req, res) => {
        const { id, products } = req.body
        console.log(id);
        console.log(products);
        const order = await OrderRepository.updateOrderProducts(id, products)
        res.status(OK).json(order)
    }
)