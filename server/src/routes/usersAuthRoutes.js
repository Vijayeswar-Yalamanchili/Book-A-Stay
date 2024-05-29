import express from 'express'
import userAuthController from '../controller/userAuthController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', userAuthController.login)
router.post('/register', userAuthController.register)
router.get('/getallusers', auth.authenticate, userAuthController.getAllUsers)
router.get('/getuserbyid/:id', auth.authenticate, userAuthController.getUserById)
router.put('/updateuser/:id', auth.authenticate, userAuthController.updateUserById)
router.put('/logout/:id',userAuthController.logout)

export default router