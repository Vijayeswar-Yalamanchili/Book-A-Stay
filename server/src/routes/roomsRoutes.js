import express from 'express'
import auth from '../middleware/auth.js'
import roomController from '../controller/roomController.js'

const router = express.Router()

router.get('/', auth.authenticate, roomController.getAllRooms)
router.get('/:roomId', auth.authenticate, roomController.getRoomById)
router.post('/createroom/:hotelId', auth.authenticate, auth.adminGuard, roomController.createRoom)
router.put('/updateroom/:roomId', auth.authenticate, auth.adminGuard, roomController.updateRoom)
router.delete('/deleteroom/:roomId/:hotelId', auth.authenticate, auth.adminGuard, roomController.deleteRoom)

export default router