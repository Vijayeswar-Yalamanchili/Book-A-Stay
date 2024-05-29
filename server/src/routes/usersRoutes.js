import express from 'express'
import userAuthController from '../controller/userAuthController.js'
import userController from '../controller/userController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', userAuthController.login)
router.post('/register', userAuthController.register)
router.put('/logout/:id',userAuthController.logout)

router.get('/getallusers', auth.authenticate, auth.adminGuard, userController.getAllUsers)
router.get('/getuserbyid/:id', auth.authenticate, userController.getUserById)
router.put('/updateuser/:id', auth.authenticate, userController.updateUserById)
router.delete('/deleteuser/:id', auth.authenticate, userController.deleteUser)

export default router