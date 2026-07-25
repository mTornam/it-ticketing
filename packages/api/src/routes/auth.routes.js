import { Router } from 'express'
import authenticate from '../middleware/authenticate.js'
import { login, refresh, me, logout } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', login)
router.post('/refresh', refresh)
router.get('/me', authenticate, me)
router.post('/logout', logout)

export default router