import { static_files_host } from "../config.js";
import { BAD_REQUEST } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ProductRepository from "../repositories/Product.js";

export const getAllProducts = asyncWrapper(
    async (req, res) => {
        const products = await ProductRepository.getAllProducts()
        res.json(products)
    }
)

export const getAllEligibleProducts = asyncWrapper(
    async (req, res) => {
        const products = await ProductRepository.getAllEligibleProducts()
        res.json(products)
    }
)

export const getProductsByCategoryId = asyncWrapper(
    async (req, res) => {
        const category_id = req.params.id
        const products = await ProductRepository.getProductsByCategoryId(category_id)
        res.json(products)
    }
)

export const createProduct = asyncWrapper(
    async (req, res, next) => {
        const { name, price, description, category_id } = req.body

        if(!req.file){
            const missing_image = new CustomError('Product image is missing', BAD_REQUEST)
            return next(missing_image)
        }

        const image = static_files_host +  req.file.path

        const product = await ProductRepository.createProduct({ name, price: +price, image, description, category_id })
        res.json(product)
    }
)

export const deleteProduct = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const product = await ProductRepository.deleteProduct(id)
        res.json(product)
    }
)

export const deleteAllProducts = asyncWrapper(
    async (req, res) => {
        const products = await ProductRepository.deleteAllProducts()
        res.json(products)
    }
)