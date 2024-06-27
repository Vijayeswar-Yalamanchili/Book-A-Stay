import express from 'express'
import paymentController from '../controller/paymentController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/order',auth.authenticate, paymentController.order)
router.post('/order/validate',auth.authenticate, paymentController.validateOrder)

export default router