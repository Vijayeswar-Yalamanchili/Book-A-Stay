import HotelsModel from "../models/hotelsModel.js"

const getAllHotels = async(req,res) => {
    try {
        const allHotels = await HotelsModel.find(req.query).limit(5)
        res.status(200).send({
            allHotels
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Getting all stays"
        })
    }
}

// const getHotelsList = async(req,res) => {
//     try {
//         const hotelsList = await HotelsModel.find()
//         res.status(200).send({
//             hotelsList
//         })
//     } catch (error) {
//         res.status(500).send({
//             message:"Internal Server Error in Getting all stays"
//         })
//     }
// }

const getAllHotelsByCity = async(req,res) => {
    try {
        if(req.body.city === "bangalore" || req.body.city === "bengaluru"){
            const searchResult = await HotelsModel.find({city : "bengaluru"})
            res.status(200).send({
                searchResult
            })            
        }else{
            const searchResult = await HotelsModel.find({city : req.body.city})
            res.status(200).send({
                searchResult
            })
        }
    } catch (error) {
        res.status(500).send({
            message:`Internal Server Error in Getting Hotels at ${req.body.city}`
        })
    }
}

const getHotelById = async(req,res) => {
    try {
        const getHotelData = await HotelsModel.findById({_id:req.params.id})
        res.status(200).send({
            getHotelData
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Getting Hotel by Id"
        })
    }
}

const countByType = async(req,res) => {
    const types = req.query.types.split(',')
    try {
        const countByTypelist = await Promise.all(types.map((type => {
            return HotelsModel.countDocuments({type : type})
        })))
        res.status(200).send({
            countByTypelist
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Getting Hotel by type"
        })
    }
}

const countByCity = async(req,res) => {
    const cities = req.query.cities.split(',')
    try {
        const countByCitylist = await Promise.all(cities.map((city => {
            return HotelsModel.countDocuments({city : city})
        })))
        res.status(200).send({
            countByCitylist
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Getting Hotel by city"
        })
    }
}

export default {
    getAllHotels,
    // getHotelsList,
    getAllHotelsByCity,
    getHotelById,
    countByCity,
    countByType
}