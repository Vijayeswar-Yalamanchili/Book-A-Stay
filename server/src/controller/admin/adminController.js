import UserAuthModel from "../../models/userAuthModel.js"
import HotelsModel from "../../models/hotelsModel.js"

const getUserById = async(req,res) => {
    try {
        const userById = await UserAuthModel.findById({_id : req.params.id})
        res.status(200).send({
            userById
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all users"
        })
    }
}

const getTypesList = async(req,res) => {
    try {
        const list = await HotelsModel.find()
        const types = list.map((e)=> e.type)
        const typesList = new Set(types)
        // console.log(types)
        res.status(200).send({
            types, typesList
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all stays"
        })
    }
}


const getHotelsList = async(req,res) => {
    try {
        const hotelsList = await HotelsModel.find(req.query)
        res.status(200).send({
            hotelsList
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all hotels"
        })
    }
}

const getVillasList = async(req,res) => {
    try {
        const villasList = await HotelsModel.find(req.query)
        res.status(200).send({
            villasList
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all villas"
        })
    }
}

const getResortsList = async(req,res) => {
    try {
        const resortsList = await HotelsModel.find(req.query)
        res.status(200).send({
            resortsList
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all resorts"
        })
    }
}

const getCottagesList = async(req,res) => {
    try {
        const cottagesList = await HotelsModel.find(req.query)
        res.status(200).send({
            cottagesList
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all cottages"
        })
    }
}

const getCabinsList = async(req,res) => {
    try {
        const cabinsList = await HotelsModel.find(req.query)
        res.status(200).send({
            cabinsList
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all cabins"
        })
    }
}

const addStay = async(req,res) => {
    try {
        console.log(req.body)
        // const addNewHotel = await HotelsModel.create({...req.body})
        // res.status(200).send({
        //     addNewHotel
        // })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Adding Hotel"
        })
    }
}

const updateStay = async(req,res) => {
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

const deleteStay = async(req,res) => {
    try {
        const deleteStay = await HotelsModel.findByIdAndDelete(req.params.hotelId)
        res.status(200).send({
            deleteStay
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in deleting stay"
        })
    }
}

export default {
    getUserById,
    getTypesList,
    getHotelsList,
    getVillasList,
    getResortsList,
    getCottagesList,
    getCabinsList,
    addStay,
    updateStay,
    deleteStay
}