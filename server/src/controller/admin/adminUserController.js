import UserAuthModel from "../../models/userAuthModel.js"

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

export default {
    getUserById,
    getAllUsers,
    deleteUser,
    updateUserById,    
}