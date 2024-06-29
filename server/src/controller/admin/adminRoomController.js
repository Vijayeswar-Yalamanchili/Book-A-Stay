import RoomsModel from "../../models/roomsModel.js"

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
            const newRoom = await RoomsModel.create({...req.body,hotelId : req.params.hotelId})
            res.status(200).send({
                message:"Room number added",
                newRoom 
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Adding stay"
        })
    }
}

export default {
    addRoom
}