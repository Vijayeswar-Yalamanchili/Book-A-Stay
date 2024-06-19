import express from 'express'
import hotelController from '../controller/hotelController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/allhotels', hotelController.getAllHotels)
router.put('/searchResult/:id', auth.authenticate, hotelController.getAllHotelsByCity)
router.get('/find/:id', auth.authenticate, hotelController.getHotelById)
router.get('/countbycity', hotelController.countByCity)
router.get('/countbytype', hotelController.countByType)

export default router