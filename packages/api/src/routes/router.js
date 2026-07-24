import { Router } from 'express'
import userRouter from '../routes/user.routes.js'
import authRouter from '../routes/auth.routes.js'

const router = Router()

// Mount individual routes
router.use('/users', userRouter)
router.use('/auth', authRouter)

export default router