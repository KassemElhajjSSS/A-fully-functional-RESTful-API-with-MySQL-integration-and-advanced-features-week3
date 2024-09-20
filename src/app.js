const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

require('dotenv').config()

const corsOptions ={
    origin : 'frontEnd server url',
    optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser());

const product = require('./routes/productRoute')
app.use('/products', product)

const User = require('./routes/userRoute')
app.use('/users', User)

module.exports = app

