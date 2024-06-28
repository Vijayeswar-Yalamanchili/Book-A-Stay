import UserAuthModel from "../models/userAuthModel.js"

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
        const updatedUserDetails = await UserAuthModel.findByIdAndUpdate({_id:req.params.id},{$set : req.body},{new : true})
        res.status(200).send({
            updatedUserDetails
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
    getUserById,
    updateUserById,
    deleteUser
}