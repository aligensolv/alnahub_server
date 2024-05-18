import { Router } from "express"
import { getMessagesCount } from "../controllers/messages_controller.js"

const router = Router()

router.get('/messages/count', getMessagesCount)

export default router