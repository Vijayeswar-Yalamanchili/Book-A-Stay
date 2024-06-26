import express from 'express'
import auth from '../middleware/auth.js'
import userAuthController from '../controller/userAuthController.js'
import userController from '../controller/userController.js'


const router = express.Router()

router.post('/', userAuthController.login)
router.post('/register', userAuthController.register)
router.put('/forgotpassword',userAuthController.forgotPassword)
router.get('/forgotPassword/:id/verify/:token',userAuthController.verifyCode)
router.put('/resetPassword',userAuthController.resetPassword)
router.put('/contactemail', userAuthController.contactEmail)
router.put('/logout/:id',auth.authenticate, userAuthController.logout)

router.get('/getallusers/:id', auth.authenticate, userController.getAllUsers)
router.get('/getuserbyid/:id', auth.authenticate, userController.getUserById)
router.put('/userprofileupdate/:id', auth.authenticate, userController.updateUserById)
router.delete('/deleteuser/:id', auth.authenticate, userController.deleteUser)

// admin

// router.post('/admin', adminAuthController.login)
// router.post('/admin/register', adminAuthController.register)
// router.put('/admin/logout/:id', auth.authenticate, adminAuthController.logout)
// router.get('/admin/hotelslist/:id', auth.authenticate, adminController.getHotelsList)

export default router