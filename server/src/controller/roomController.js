import HotelsModel from "../models/hotelsModel.js"
import RoomsModel from "../models/roomsModel.js"

const createRoom = async(req,res) => {
    try {
        const hotelId = req.params.hotelId
        const addRoom = await RoomsModel.create({...req.body, hotelId : req.params.hotelId})
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

const getRoomByHotelId = async(req,res) => {
    try {
        console.log("first")
        // const hotelId = req.params.id
        const getRoom = await HotelsModel.findById(req.params.id)
        console.log(getRoom)
        const list = await Promise.all(
            getRoom.rooms.map((room) => {
                return RoomsModel.findById(room)
            })
        )
        res.status(200).send({
            list
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Getting room by HotelId"
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

const updateRoomAvailability = async(req,res) => {
    try {
        const updatedAvailability = await RoomsModel.updateOne(
            {'roomNumbers._id':req.params.roomId},
            {$push : {'roomNumbers.$.unAvailableDates' : req.body.dates}}
        )
        res.status(200).send({
            message:"updated availability",
            updatedAvailability
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in updating room availablity"
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
    getRoomByHotelId,
    updateRoom,
    deleteRoom,
    updateRoomAvailability
}