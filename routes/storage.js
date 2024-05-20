import { Router } from "express"
import { getProductStorage, getStorage } from "../controllers/storage_controller.js"

const router = Router()

router.get('/storage', getStorage)
router.get('/storage/product/:id', getProductStorage)

export default router