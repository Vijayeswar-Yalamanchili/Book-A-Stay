import express from 'express'
import hotelController from '../controller/hotelController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.put('/searchResult/:id', auth.authenticate, hotelController.getAllHotels)
router.get('/:id', auth.authenticate, hotelController.getHotelById)
router.post('/addHotel/:id', auth.authenticate, hotelController.addHotel)
router.put('/updatehotel/:id', auth.authenticate, auth.adminGuard, hotelController.updateHotel)
router.delete('/deletehotel/:id', auth.authenticate, auth.adminGuard, hotelController.deleteHotel)

export default router