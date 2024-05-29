import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import indexRoutes from '../src/routes/indexRoutes.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(indexRoutes)

app.listen(PORT,()=> console.log(`App is listening to ${PORT}`))