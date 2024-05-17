import { Router } from "express"
import { createProduct, deleteAllProducts, deleteProduct, getAllEligibleProducts, getAllProducts, getProductsByCategoryId } from "../controllers/product_controller.js"
import multer from "multer"
import Randomstring from "randomstring"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/products')
    },
    filename: (req, file, cb) => {
      cb(null, 'product_' + Randomstring.generate(10) + path.extname(file.originalname.replace(/\s/g, '')));
    },
})

const upload = multer({ storage: storage })

const router = Router()

router.get('/products', getAllProducts)
router.post('/products', upload.single('image'), createProduct)

router.get('/products/category/:id', getProductsByCategoryId)

router.delete('/products/:id', deleteProduct)
router.delete('/products', deleteAllProducts)

export default router