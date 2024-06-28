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

const getStayById = async(req,res) => {
    try {
        const stayById = await HotelsModel.findById({_id : req.params.id})
        res.status(200).send({
            stayById
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting stay by stayId"
        })
    }
}

const addStay = async(req,res) => {
    try {
        if(req.body.city !== ''){
            let city = req.body.city.toLowerCase()
            let aminity = req.body.aminities
            let updatedAminity = aminity.split(',')
            const addNewStay = await HotelsModel.create({
                ...req.body,
                city : city,
                aminities : updatedAminity,
                hotelImage : req.files.hotelImage[0]?.filename,
                roomImages : req.files.roomImages.map(ele => ele.filename)
            })
            res.status(200).send({
                addNewStay
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Adding stay"
        })
    }
}

const updateStay = async(req,res) => {
    try {
        if(req.body.city !== ''){
            let aminity = req.body.aminities
            let updatedAminity = aminity.split(',')
            let city = req.body.city.toLowerCase()
            const updatedStay = await HotelsModel.findByIdAndUpdate({_id:req.params.id},{$set : {
                ...req.body,
                aminities : updatedAminity,
                city : city,
                hotelImage : req.files.hotelImage[0]?.filename,
                roomImages : req.files.roomImages.map(ele => ele.filename)
            }})
            res.status(200).send({
                updatedStay
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in updating stay"
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

const getAllUsers = async(req,res) => {
    try {
        const allUsers = await UserAuthModel.find()
        res.status(200).send({
            allUsers
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all users"
        })
    }
}

const deleteUser = async(req,res) => {
    try {
        const deletedUser = await UserAuthModel.findByIdAndDelete(req.params.userId)
        res.status(200).send({
            deletedUser
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in deleting user"
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
    getStayById,
    addStay,
    updateStay,
    deleteStay,
    getAllUsers,
    deleteUser
}