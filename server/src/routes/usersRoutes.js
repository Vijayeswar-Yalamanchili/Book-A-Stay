import express from 'express'
import userAuthController from '../controller/userAuthController.js'
import userController from '../controller/userController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', userAuthController.login)
router.post('/register', userAuthController.register)
router.put('/contactemail', userAuthController.contactEmail)
router.put('/logout/:id',auth.authenticate, userAuthController.logout)

router.get('/getallusers/:id', auth.authenticate, userController.getAllUsers)
router.get('/getuserbyid/:id', auth.authenticate, userController.getUserById)
router.put('/userprofileupdate/:id', auth.authenticate, userController.updateUserById)
router.delete('/deleteuser/:id', auth.authenticate, userController.deleteUser)

export default router