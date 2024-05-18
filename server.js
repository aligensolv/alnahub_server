import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { NOT_FOUND, OK } from './constants/status_codes.js'
import { Server } from 'socket.io'
import http from 'http'
import logger from './utils/logger.js'
import { port } from './config.js'
import path from 'path'
import { fileURLToPath } from 'url'
import ErrorHandlerMiddleware from './middlewares/error_handler.js'


import ProductApi from './routes/product.js'
import OrderApi from './routes/order.js'
import ClientApi from './routes/client.js'
import GiftApi from './routes/gift.js'
import MessageApi from './routes/messages.js'


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/public', express.static(path.join(__dirname, './public')))

app.use(
    '/api',
    ProductApi,
    OrderApi,
    ClientApi,
    GiftApi,
    MessageApi
)

const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin: '*'
    }
})

app.set('io', io)

io.on('connection', (socket) => {
    console.log(`a new connection and count is: ${socket.client.conn.server.clientsCount}`)

    
    socket.on('disconnect', () => {
        console.log(`User disconnected and count is: ${socket.client.conn.server.clientsCount}`);
    });
})

app.use(ErrorHandlerMiddleware)

app.get('*', (req, res) => {
    return res.status(NOT_FOUND).json({
        error: '404 Not Found',
        url: req.url
    })
})


const main = async () => {
    try{
        server.listen(port, () => console.log(`server listening on ${port}`))
    }catch(err){
        logger.error(err.message)
    }
}
main()