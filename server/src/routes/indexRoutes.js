import express from 'express'
import hotelsRoutes from './hotelRoutes.js'
import usersRoutes from './usersRoutes.js'
import roomsRoutes from './roomsRoutes.js'
import homeController from '../controller/homeController.js'

const router = express.Router()

router.get('/',homeController.homepage)

router.use('/hotels',hotelsRoutes)
router.use('/users',usersRoutes)
router.use('/rooms',roomsRoutes)

export default router