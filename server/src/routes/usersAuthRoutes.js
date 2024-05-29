import express from 'express'
import userAuthController from '../controller/userAuthController.js'
import UserAuthModel from '../models/userAuthModel.js'

const router = express.Router()

router.post('/', userAuthController.login)
router.post('/register', userAuthController.register)
router.get('/getallusers', userAuthController.getAllUsers)
router.get('/getuserbyid/:id', userAuthController.getUserById)
router.put('/updateuser/:id',userAuthController.updateUserById)
router.put('/logout/:id',userAuthController.logout)

export default router