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

const getHotelsList = async(req,res) => {
    try {
        const list = await HotelsModel.find()
        res.status(200).send({
            list
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all users"
        })
    }
}

export default {
    getUserById,
    getHotelsList
}