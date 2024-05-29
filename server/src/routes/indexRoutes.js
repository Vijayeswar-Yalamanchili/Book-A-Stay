import express from 'express'
import hotelsRoutes from './hotelRoutes.js'
import usersAuthRoutes from './usersAuthRoutes.js'
import roomsRoutes from './roomsRoutes.js'

const router = express.Router()

router.get('/', (req,res)=>{
    res.send(`<h3>Welcome to booking app home server</h3>`)
})

router.use('/hotels',hotelsRoutes)
router.use('/usersAuth',usersAuthRoutes)
router.use('/rooms',roomsRoutes)

export default router