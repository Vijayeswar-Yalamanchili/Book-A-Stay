import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import indexRoutes from '../src/routes/indexRoutes.js'

dotenv.config()
const PORT = process.env.PORT

//middlewares 
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(indexRoutes)
app.use(express.static('hotelImages'))
app.use(express.static('roomsImages'))

app.listen(PORT,()=> console.log(`App is listening to ${PORT}`))