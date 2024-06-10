import express from 'express'
import auth from '../middleware/auth.js'
import userAuthController from '../controller/userAuthController.js'
import userController from '../controller/userController.js'
import adminAuthController from '../controller/admin/adminAuthController.js'

const router = express.Router()
//Users
router.post('/', userAuthController.login)
router.post('/register', userAuthController.register)
router.put('/contactemail', userAuthController.contactEmail)
router.put('/logout/:id',auth.authenticate, userAuthController.logout)

router.get('/getallusers/:id', auth.authenticate, userController.getAllUsers)
router.get('/getuserbyid/:id', auth.authenticate, userController.getUserById)
router.put('/userprofileupdate/:id', auth.authenticate, userController.updateUserById)
router.delete('/deleteuser/:id', auth.authenticate, userController.deleteUser)

// admin

router.post('/admin', adminAuthController.login)
router.post('/admin/register', adminAuthController.register)
router.put('/admin/logout/:id', auth.authenticate, adminAuthController.logout)

export default router