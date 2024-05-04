import * as bcrypt from "bcrypt";
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";


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
}

export default Auth