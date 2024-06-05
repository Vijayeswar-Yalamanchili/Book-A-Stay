import express from 'express'
import hotelController from '../controller/hotelController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.put('/searchResult/:id', auth.authenticate, hotelController.getAllHotels)
router.get('/find/ :id', auth.authenticate, hotelController.getHotelById)
router.post('/addHotel/:id', auth.authenticate, hotelController.addHotel)
router.put('/updatehotel/:id', auth.authenticate, auth.adminGuard, hotelController.updateHotel)
router.delete('/deletehotel/:id', auth.authenticate, auth.adminGuard, hotelController.deleteHotel)
router.get('/countbycity', hotelController.countByCity)
router.get('/countbytype', hotelController.countByType)

export default router