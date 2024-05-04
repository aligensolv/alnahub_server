import { Router } from "express"
import { createClient, getAllClients, getTotalClientsCount, loginClient } from "../controllers/client_controller.js"

const router = Router()

router.get('/clients', getAllClients)
router.get('/clients/count', getTotalClientsCount)
router.post('/clients', createClient)

router.post('/clients/login', loginClient)

export default router