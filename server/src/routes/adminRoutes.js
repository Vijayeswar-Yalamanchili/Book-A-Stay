import express from 'express'
import auth from '../middleware/auth.js'
import adminAuthController from '../controller/admin/adminAuthController.js'
import adminController from '../controller/admin/adminController.js'

const router = express.Router()

router.post('/', adminAuthController.login)
router.post('/register', adminAuthController.register)
router.put('/logout/:id', auth.adminAuthenticate, adminAuthController.logout)
router.get('/getadminuserbyid/user/:id', auth.adminAuthenticate, adminController.getUserById)
router.get('/gettypeslist/lists/:id',auth.adminAuthenticate, adminController.getTypesList)
router.get('/hotelslist',auth.adminAuthenticate, auth.adminGuard, adminController.getHotelsList)
router.get('/villaslist',auth.adminAuthenticate, auth.adminGuard, adminController.getVillasList)
router.get('/resortslist',auth.adminAuthenticate, auth.adminGuard, adminController.getResortsList)
router.get('/cottageslist',auth.adminAuthenticate, auth.adminGuard, adminController.getCottagesList)
router.get('/cabinslist',auth.adminAuthenticate, auth.adminGuard, adminController.getCabinsList)

router.post('/addstay/:id', auth.adminAuthenticate, auth.adminGuard, adminController.addStay)
router.put('/updatestay/:id', auth.adminAuthenticate, auth.adminGuard, adminController.updateStay)
router.delete('/deletestay/:hotelId',auth.adminAuthenticate,adminController.deleteStay)

export default router