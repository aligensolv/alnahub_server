import { BAD_REQUEST, OK } from "../constants/status_codes.js"
import CustomError from "../interfaces/custom_error_class.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import ClientRepository from "../repositories/Client.js"

export const getAllClients = asyncWrapper(
    async (req, res) => {
        const clients = await ClientRepository.getAllClients()
        res.status(OK).json(clients)
    }
)

export const getTotalClientsCount = asyncWrapper(
    async (req, res) => {
        const count = await ClientRepository.getTotalClientsCount()
        res.status(OK).json(count)
    }
)

export const createClient = asyncWrapper(
    async (req, res) => {
        const { phone_number } = req.body
        console.log(req.body);
        const client = await ClientRepository.createClient({ phone_number })
        res.status(OK).json(client)
    }
)

export const loginClient = asyncWrapper(
    async (req, res, next) => {
        const { phone_number } = req.body

        if(!phone_number){
            const missing_phone_number = new CustomError('Phone number is missing', BAD_REQUEST)
            return next(missing_phone_number)
        }

        const client = await ClientRepository.loginClient({ phone_number })
        res.status(OK).json(client)
    }
)