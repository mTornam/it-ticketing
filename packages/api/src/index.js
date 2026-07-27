import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cookieParser from 'cookie-parser'
import dbConnect from './config/db.config.js'
import mainRouter from './routes/router.js'

const app = express()
const PORT = process.env.SERVER_PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/test', (req, res) => {
    res.send('Hello - Success')
})
app.use('/api/v1', mainRouter)

await dbConnect()

// app.listen(PORT, async () => {
//     console.log('Server running on port: ', PORT);
// })

const server = app.listen(PORT, () => {
  console.log('Server running on port: ', PORT);
});
server.on('error', (err) => {
  console.error('Server failed to start:', err);
});