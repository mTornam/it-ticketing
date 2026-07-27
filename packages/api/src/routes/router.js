import { Router } from 'express'
import userRouter from '../routes/user.routes.js'
import authRouter from '../routes/auth.routes.js'
import ticketRouter from '../routes/ticket.routes.js'

const router = Router()

// Mount individual routes
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/tickets', ticketRouter)

export default router