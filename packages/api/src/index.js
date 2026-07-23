import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import dbConnect from './config/db.config.js'

const app = express()
const PORT = process.env.SERVER_PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

await dbConnect()

app.listen(PORT, async () => {
    console.log('Server running on port: ', PORT);
})
