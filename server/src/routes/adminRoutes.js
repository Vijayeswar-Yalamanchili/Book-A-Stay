import express from 'express'
import auth from '../middleware/auth.js'
import adminAuthController from '../controller/admin/adminAuthController.js'
import adminController from '../controller/admin/adminController.js'
import imageUploader from '../controller/admin/imageUploader.js'

const router = express.Router()

router.post('/', adminAuthController.login)
router.post('/register', adminAuthController.register)
router.put('/logout/:id', auth.adminAuthenticate, adminAuthController.logout)
router.get('/getallusers/:id', auth.adminAuthenticate, adminController.getAllUsers)
router.get('/getadminuserbyid/user/:id', auth.adminAuthenticate, adminController.getUserById)
router.get('/gettypeslist/lists/:id',auth.adminAuthenticate, adminController.getTypesList)
router.get('/hotelslist',auth.adminAuthenticate, auth.adminGuard, adminController.getHotelsList)
router.get('/villaslist',auth.adminAuthenticate, auth.adminGuard, adminController.getVillasList)
router.get('/resortslist',auth.adminAuthenticate, auth.adminGuard, adminController.getResortsList)
router.get('/cottageslist',auth.adminAuthenticate, auth.adminGuard, adminController.getCottagesList)
router.get('/cabinslist',auth.adminAuthenticate, auth.adminGuard, adminController.getCabinsList)

router.get('/getstaybyid/:id', auth.adminAuthenticate,auth.adminGuard, adminController.getStayById)
router.post('/addstay/:id', auth.adminAuthenticate, auth.adminGuard, imageUploader.imageUpload.fields([{ name: 'hotelImage', maxCount: 1 }, { name: 'roomImages', maxCount: 8 }]),adminController.addStay)
router.put('/updatestay/:id/:tokenId', auth.adminAuthenticate, auth.adminGuard, imageUploader.imageUpload.fields([{ name: 'hotelImage', maxCount: 1 }, { name: 'roomImages', maxCount: 8 }]), adminController.updateStay)
router.delete('/deletestay/:hotelId',auth.adminAuthenticate,adminController.deleteStay)
router.delete('/deleteuser/:userId',auth.adminAuthenticate,adminController.deleteUser)

export default router