import * as bcrypt from "bcrypt";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import { jwt_secret_key } from "../config.js";
import jwt from "jsonwebtoken";


class Auth{
    static encryptPassword(password){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let hashedPassword = await bcrypt.hash(password,10)
                return resolve(hashedPassword)
            }
        ))
    }

    static decryptAndCheckPasswordMatch(password, hashed){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) =>{
                let isMatch = await bcrypt.compare(password,hashed)    
                return resolve(isMatch)
            }
        ))
    }

    static generateToken(data, expiresIn = '3h'){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                let token = jwt.sign(
                    data,
                    jwt_secret_key,
                    {expiresIn}
                )
                return resolve(token)
            }
        ))
    }

    static verifyToken(token){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                let decoded = jwt.verify(token,jwt_secret_key)
                return resolve(decoded)
            }
        ))
    }
}

export default Auth