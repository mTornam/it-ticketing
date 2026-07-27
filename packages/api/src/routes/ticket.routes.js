import {Router} from 'express'
import pass from './pass.js'
const router = Router()

router.post('/', pass)
router.get('/', pass)
router.patch('/:id/claim', pass)
router.patch('/:id/assign', pass)
router.get('/:id/status', pass)
router.delete('/:id', pass)

export default router