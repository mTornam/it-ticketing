import { Router } from 'express'
import userRouter from '../routes/user.routes.js'

const router = Router()

// Mount individual routes
router.use('/users', userRouter)

export default router