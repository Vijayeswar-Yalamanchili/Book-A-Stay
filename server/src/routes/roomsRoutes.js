import express from 'express'

const router = express.Router()

router.get('/', (req,res)=>{
    res.send(`<h3>Welcome to rooms route</h3>`)
})

export default router