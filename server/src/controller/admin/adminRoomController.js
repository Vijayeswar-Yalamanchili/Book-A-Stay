import RoomsModel from "../../models/roomsModel.js"

const addRoom = async(req,res) => {
    try {
        console.log(req.body,req.params)
        const newRoom = await RoomsModel.create(req.body)
        res.status(200).send({
            newRoom 
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Adding stay"
        })
    }
}

export default {
    addRoom
}