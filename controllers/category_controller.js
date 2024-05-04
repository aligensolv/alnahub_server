import { static_files_host } from '../config.js'
import { BAD_REQUEST } from '../constants/status_codes.js'
import CustomError from '../interfaces/custom_error_class.js'
import asyncWrapper from '../middlewares/async_wrapper.js'
import CategoryRepository from '../repositories/Category.js'

export const getAllCategories = asyncWrapper(
    async (req, res) => {
        const categories = await CategoryRepository.getAllCategories()
        res.json(categories)
    }
)

export const createCategory = asyncWrapper(
    async (req, res, next) => {
        const { name, free_gift_counter } = req.body
        if(!req.file){
            const missing_image = new CustomError('Category image is missing', BAD_REQUEST)
            return next(missing_image)
        }

        const image = static_files_host +  req.file.path

        const category = await CategoryRepository.createCategory({ name, image, free_gift_counter })
        res.json(category)
    }
)

export const updateCategory = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const { name, free_gift_counter } = req.body

        const image = req.file ? static_files_host +  req.file.path : undefined

        const category = await CategoryRepository.updateCategory({ id: +id, name, image, free_gift_counter })
        res.json(category)
    }
)

export const deleteCategory = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const category = await CategoryRepository.deleteCategory(id)
        res.json(category)
    }
)

export const deleteAllCategories = asyncWrapper(
    async (req, res) => {
        const categories = await CategoryRepository.deleteAllCategories()
        res.json(categories)
    }
)