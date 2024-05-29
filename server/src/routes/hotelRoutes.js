import express from 'express'
import hotelController from '../controller/hotelController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// router.get('/', (req,res)=>{
//     res.send(`<h3>Welcome to hotel route</h3>`)
// })

router.get('/', auth.authenticate, hotelController.getAllHotels)
router.get('/:id', auth.authenticate, hotelController.getHotelById)
router.post('/addHotel', auth.authenticate, hotelController.addHotel)
router.put('/updatehotel/:id', auth.authenticate, hotelController.updateHotel)
router.delete('/deletehotel/:id', auth.authenticate, hotelController.deleteHotel)

export default router