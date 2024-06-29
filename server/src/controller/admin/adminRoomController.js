import RoomsModel from "../../models/roomsModel.js"
import HotelModel from "../../models/hotelsModel.js"

const addRoom = async(req,res) => {
    try {
        const isHotelIdExists = await RoomsModel.find({ "$and" : [ {hotelId : req.params.hotelId}, {price : req.body.price} ]})
        if(isHotelIdExists.length > 0){
            const newRoom =  await RoomsModel.findOneAndUpdate({price : req.body.price}, {$push : {roomNumbers : req.body.roomNumbers}})
            res.status(200).send({
                message:"Room number added",
                newRoom 
            })
        }else{
            const stayName = await HotelModel.findById(req.params.hotelId)
            const newRoom = await RoomsModel.create({...req.body,hotelId : req.params.hotelId, hotelName : stayName.name})
            res.status(200).send({
                message:"Room number added",
                newRoom 
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Adding room"
        })
    }
}

const getRoomsList = async(req,res) => {
    try {
        const getRoomsData = await RoomsModel.find({hotelId : req.params.id})
        res.status(200).send({
            getRoomsData 
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in getting rooms"
        })
    }
}

const updateRoom = async(req,res) => {
    try {
        console.log(req.body,req.params)
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Updating room"
        })
    }
}

const deleteRoom = async(req,res) => {
    try {
        const roomToBeRemove = await RoomsModel.findOneAndUpdate({_id : req.params.roomsId},{$pull : { roomNumbers : {_id : req.params.roomId}}})
        res.status(200).send({
            message : "Deleted" ,
            roomToBeRemove
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in deleting room"
        })
    }
}

export default {
    addRoom,
    getRoomsList,
    updateRoom,
    deleteRoom
}