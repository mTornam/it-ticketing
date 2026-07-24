import { Router } from 'express'
import authenticate from '../middleware/authenticate.js'
import { login, refresh, me } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', login)
router.post('/refresh', refresh)
// router.post('/logout', logout)
router.get('/me', me)

export default router
