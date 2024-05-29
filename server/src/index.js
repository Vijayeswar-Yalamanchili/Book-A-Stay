import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import indexRoutes from '../src/routes/indexRoutes.js'

dotenv.config()
const PORT = process.env.PORT

//middlewares
const app = express()
app.use(cors())
app.use(express.json())
app.use(indexRoutes)

app.listen(PORT,()=> console.log(`App is listening to ${PORT}`))