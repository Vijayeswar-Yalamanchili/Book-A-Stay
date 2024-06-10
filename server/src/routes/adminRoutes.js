import express from 'express'
import auth from '../middleware/auth.js'
import adminAuthController from '../controller/admin/adminAuthController.js'
import adminController from '../controller/admin/adminController.js'

const router = express.Router()

router.post('/', adminAuthController.login)
router.post('/register', adminAuthController.register)
router.put('/logout/:id', auth.adminAuthenticate, adminAuthController.logout)
router.get('/getadminuserbyid/:id', auth.authenticate, adminController.getUserById)
router.get('/hotelslist/:id',auth.adminAuthenticate, auth.adminGuard, adminController.getHotelsList)

export default router