import HotelsModel from "../models/hotelsModel.js"
import RoomsModel from "../models/roomsModel.js"

const createRoom = async(req,res) => {
    try {
        const hotelId = req.params.hotelId
        const addRoom = await RoomsModel.create({...req.body,hotelId : req.params.hotelId})
        if(addRoom){
            const addRoomInHotel = await HotelsModel.findByIdAndUpdate(hotelId,{ $push : {rooms : addRoom._id} })
        }
        res.status(200).send({
            message : "Room created",
            addRoom
        })        
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in creating room"
        })
    }
}

const getAllRooms = async(req,res) => {
    try {
        const getrooms = await RoomsModel.find()
        res.status(200).send({
            getrooms
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Getting all rooms"
        })
    }
}

const getRoomById = async(req,res) => {
    try {
        const hotelId = req.params.hotelId
        const getRoom = await RoomsModel.findById({_id:req.params.roomId})
        res.status(200).send({
            getRoom
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Getting room by Id"
        })
    }
}

const updateRoom = async(req,res) => {
    try {
        const updateRoom = await RoomsModel.findByIdAndUpdate({_id:req.params.roomId},{$set : req.body},{new : true})
        res.status(200).send({
            updateRoom
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in updating room"
        })
    }
}

const deleteRoom = async(req,res) => {
    try {
        const hotelId = req.params.hotelId
        const removeRoom = await RoomsModel.findByIdAndDelete({_id:req.params.roomId})
        console.log(req.params.roomId)
        if(removeRoom){
            await HotelsModel.findByIdAndUpdate(hotelId,{ $pull : {rooms : req.params.roomId}})
        }
        res.status(200).send({
            removeRoom
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Deleting room"
        })
    }
}

export default {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom
}