import { FORBIDDEN } from "../constants/status_codes.js"

import { jwt_secret_key } from "../config.js"
import jwt from 'jsonwebtoken'
import CustomError from "../interfaces/custom_error_class.js"
import asyncWrapepr from "./async_wrapper.js"

const ValidateApiToken = asyncWrapepr(async (req, res, next) =>{
    const { token } = req.headers

    if(!token){
        let missing_token_error = new CustomError('Please provide api token',FORBIDDEN)
        return next(missing_token_error)
    }
    
    let decoded_token = undefined

    jwt.verify(token, jwt_secret_key,{},(error,decoded) =>{
        if(error){
            let FORBIDDEN_error = new CustomError('Invalid API token, Unauthorized',NOT_AUTHORIZED)
            return next(not_authorized_error)
        }

        decoded_token = decoded
    })
    
    return next()
})


export default ValidateApiToken