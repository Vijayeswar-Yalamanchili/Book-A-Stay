import express from 'express'
import hotelController from '../controller/hotelController.js'

const router = express.Router()

// router.get('/', (req,res)=>{
//     res.send(`<h3>Welcome to hotel route</h3>`)
// })

router.get('/', hotelController.getAllHotels)
router.get('/:id', hotelController.getHotelById)
router.post('/addHotel', hotelController.addHotel)
router.put('/updatehotel/:id', hotelController.updateHotel)
router.delete('/deletehotel/:id', hotelController.deleteHotel)

export default router