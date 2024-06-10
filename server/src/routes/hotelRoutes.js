import express from 'express'
import hotelController from '../controller/hotelController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/allhotels', hotelController.getAllHotels)
router.put('/searchResult/:id', auth.authenticate, hotelController.getAllHotelsByCity)
router.get('/find/:id', auth.authenticate, hotelController.getHotelById)
router.get('/countbycity', hotelController.countByCity)
router.get('/countbytype', hotelController.countByType)

//with AdminGuard
router.post('/addHotel/:id', auth.authenticate, auth.adminGuard, hotelController.addHotel)
router.put('/updatehotel/:id', auth.authenticate, auth.adminGuard, hotelController.updateHotel)
router.delete('/deletehotel/:id', auth.authenticate, auth.adminGuard, hotelController.deleteHotel)
router.get('/hotelslist', auth.authenticate, auth.adminGuard, hotelController.getHotelsList)

export default router