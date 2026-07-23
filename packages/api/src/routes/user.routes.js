import { Router } from "express"
import { createUser} from '../controllers/user.controller.js'

const router = Router()

router.post('/', createUser)
// router.get('/', getUser)
// router.patch('/', editUser)
// router.delete('/', deleteUser)

export default router