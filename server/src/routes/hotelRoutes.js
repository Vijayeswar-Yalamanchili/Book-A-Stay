import express from 'express'
import hotelController from '../controller/hotelController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth.authenticate, hotelController.getAllHotels)
router.get('/:id', auth.authenticate, hotelController.getHotelById)
router.post('/addHotel', auth.authenticate, auth.adminGuard, hotelController.addHotel)
router.put('/updatehotel/:id', auth.authenticate, auth.adminGuard, hotelController.updateHotel)
router.delete('/deletehotel/:id', auth.authenticate, auth.adminGuard, hotelController.deleteHotel)

export default router