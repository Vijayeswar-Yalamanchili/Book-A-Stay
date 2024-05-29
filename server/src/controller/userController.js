import UserAuthModel from "../models/userAuthModel.js"

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

const updateUserById = async(req,res) => {
    try {
        const updateUser = await UserAuthModel.findByIdAndUpdate({_id:req.params.id},{$set : req.body},{new : true})
        res.status(200).send({
            updateUser
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in updating user"
        })
    }
}

const deleteUser = async(req,res) => {
    try {
        const removeUser = await UserAuthModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            removeUser
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Deleting User"
        })
    }
}

export default {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUser
}