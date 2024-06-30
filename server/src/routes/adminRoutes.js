import express from 'express'
import auth from '../middleware/auth.js'
import imageUploader from '../controller/admin/imageUploader.js'
import adminAuthController from '../controller/admin/adminAuthController.js'
import adminUserController from '../controller/admin/adminUserController.js'
import adminRoomController from '../controller/admin/adminRoomController.js'
import adminStayController from '../controller/admin/adminStayController.js'
import adminListController from '../controller/admin/adminListController.js'

const router = express.Router()

//adminAuthController
router.post('/', adminAuthController.login)
router.post('/register', adminAuthController.register)
router.put('/logout/:id', auth.adminAuthenticate, adminAuthController.logout)

//adminListController
router.get('/gettypeslist/lists/:id',auth.adminAuthenticate, adminListController.getTypesList)
router.get('/hotelslist',auth.adminAuthenticate, auth.adminGuard, adminListController.getHotelsList)
router.get('/villaslist',auth.adminAuthenticate, auth.adminGuard, adminListController.getVillasList)
router.get('/resortslist',auth.adminAuthenticate, auth.adminGuard, adminListController.getResortsList)
router.get('/cottageslist',auth.adminAuthenticate, auth.adminGuard, adminListController.getCottagesList)
router.get('/cabinslist',auth.adminAuthenticate, auth.adminGuard, adminListController.getCabinsList)

// adminStayController
router.post('/addstay/:id', auth.adminAuthenticate, auth.adminGuard, imageUploader.imageUpload.fields([{ name: 'hotelImage', maxCount: 1 }, { name: 'roomImages', maxCount: 8 }]),adminStayController.addStay)
router.put('/updatestay/:id/:tokenId', auth.adminAuthenticate, auth.adminGuard, imageUploader.imageUpload.fields([{ name: 'hotelImage', maxCount: 1 }, { name: 'roomImages', maxCount: 8 }]), adminStayController.updateStay)
router.get('/getstaybyid/:id', auth.adminAuthenticate,auth.adminGuard, adminStayController.getStayById)
router.delete('/deletestay/:hotelId',auth.adminAuthenticate,adminStayController.deleteStay)

//adminUserController
router.get('/getadminallusers/:id', auth.adminAuthenticate, adminUserController.getAllUsers)
router.get('/getadminuserbyid/user/:id', auth.adminAuthenticate, adminUserController.getUserById)
router.put('/updateadminuser/:id', auth.adminAuthenticate, adminUserController.updateUserById)
router.delete('/deleteadminuser/:userId',auth.adminAuthenticate,adminUserController.deleteUser)

// adminRoomController
router.post('/addroom/:hotelId', auth.adminAuthenticate, auth.adminGuard, adminRoomController.addRoom)
router.get('/roomslist/:id', auth.adminAuthenticate, adminRoomController.getRoomsList)
router.put('/editroom/:id', auth.adminAuthenticate, adminRoomController.updateRoom)
router.delete('/deleteroom/:roomsId/:roomId', auth.adminAuthenticate, adminRoomController.deleteRoom)

export default router