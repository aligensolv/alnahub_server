import { Router } from "express"
import { createCategory, deleteAllCategories, deleteCategory, getAllCategories, updateCategory } from "../controllers/category_controller.js"
import multer from "multer"
import Randomstring from "randomstring"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/categories')
    },
    filename: (req, file, cb) => {
      cb(null, 'category_' + Randomstring.generate(10) + path.extname(file.originalname.replace(/\s/g, '')));
    },
})

const upload = multer({ storage: storage })

const router = Router()

router.get('/categories', getAllCategories)
router.post('/categories', upload.single('image'), createCategory)

router.put('/categories/:id', upload.single('image'), updateCategory)

router.delete('/categories/:id', deleteCategory)
router.delete('/categories', deleteAllCategories)

export default router