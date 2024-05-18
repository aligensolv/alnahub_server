import { Router } from "express"
import { createClient, getAllClients, getClientsCount, getTotalClientsCount, loginClient } from "../controllers/client_controller.js"

const router = Router()

router.get('/clients', getAllClients)
router.get('/clients/count', getTotalClientsCount)
router.post('/clients', createClient)

router.post('/clients/login', loginClient)

router.get('/clients/count', getClientsCount)

export default router