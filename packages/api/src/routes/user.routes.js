import { Router } from "express"
import { createUser, changeRole } from '../controllers/user.controller.js'

const router = Router()

router.post('/', createUser)
router.patch('/:id/role', changeRole)
// router.get('/', getUser)
// router.patch('/', editUser)
// router.delete('/', deleteUser)

export default router