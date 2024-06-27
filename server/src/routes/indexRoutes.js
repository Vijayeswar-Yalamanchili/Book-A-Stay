import express from 'express'
import hotelsRoutes from './hotelRoutes.js'
import usersRoutes from './usersRoutes.js'
import roomsRoutes from './roomsRoutes.js'
import adminRoutes from './adminRoutes.js'
import paymentRoutes from './paymentRoutes.js'
import homeController from '../controller/homeController.js'

const router = express.Router()

router.get('/',homeController.homepage)

router.use('/hotels',hotelsRoutes)
router.use('/users',usersRoutes)
router.use('/rooms',roomsRoutes)
router.use('/admin',adminRoutes)
router.use('/razorpay',paymentRoutes)


export default router