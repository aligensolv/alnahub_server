import dotenv from 'dotenv'

dotenv.config()

export const is_development = process.env.NODE_ENV.trim() == 'dev'

export const port = process.env.PORT

export const jwt_secret_key = process.env.JWT_SECRET_KEY

export const static_files_host = process.env.STATIC_FILES_HOST

export const nexmo_api_url = process.env.NEXMO_API_URL
export const nexmo_api_key = process.env.NEXMO_API_KEY
export const nexmo_api_secret = process.env.NEXMO_API_SECRET
export const nexmo_from_name = process.env.NEXMO_FROM_NAME