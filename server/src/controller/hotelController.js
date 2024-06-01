import HotelsModel from "../models/hotelsModel.js"

const addHotel = async(req,res) => {
    try {
        const addNewHotel = await HotelsModel.create(req.body)
        res.status(200).send({
            addNewHotel
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Adding Hotel"
        })
    }
}

const getAllHotels = async(req,res) => {
    try {
        const getHotels = await HotelsModel.find({city : req.body.cityName})
        res.status(200).send({
            getHotels
        })
    } catch (error) {
        res.status(500).send({
            message:`Internal Server Error in Getting Hotels at ${req.body.cityName}`
        })
    }
}

const getHotelById = async(req,res) => {
    try {
        const getHotel = await HotelsModel.findById({_id:req.params.id})
        res.status(200).send({
            getHotel
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Getting Hotel by Id"
        })
    }
}

const updateHotel = async(req,res) => {
    try {
        const updateHotel = await HotelsModel.findByIdAndUpdate({_id:req.params.id},{$set : req.body},{new : true})
        res.status(200).send({
            updateHotel
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in updating Hotel"
        })
    }
}

const deleteHotel = async(req,res) => {
    try {
        const removeHotel = await HotelsModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            removeHotel
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Deleting Hotel"
        })
    }
}

export default {
    addHotel,
    getAllHotels,
    getHotelById,
    updateHotel,
    deleteHotel
}