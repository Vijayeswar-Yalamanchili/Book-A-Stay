import hashPwd from "../middleware/hashPwd.js"
import UserAuthModel from "../models/userAuthModel.js"

const register = async(req,res) => {
    try {
        const {email, password} = req.body
        const checkUserEmail = await UserAuthModel.findOne({email : email})
        if(!checkUserEmail){
            req.body.password = await hashPwd.createHash(password)
            const newUser = await UserAuthModel.create(req.body)
            res.status(200).send({
                message : "User created successfully",
                newUser
            })
        }  else{
            res.status(400).send({
                message : `User with ${req.body.email} already exists`
            })
        }      
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in user registeration"
        })
    }
}

const login = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await UserAuthModel.findOne({email : email})
        if(user){
            if(await hashPwd.hashCompare(password,user.password)){
                await UserAuthModel.findOneAndUpdate({email : email},{$set : {isLoggedIn : true}})
                res.status(200).send({
                    message : "Login Successful"
                })
            }else {
                res.status(400).send({
                    message : "Incorrect Password"
                })
            }
        }else {
            res.status(400).send({
                message : "Email Not Found"
            })
        }        
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in user login"
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

const logout = async(req,res) => {
    try {
        const user = await UserAuthModel.findOne({_id : req.params.id})
        if(user){
            let logout =  await UserAuthModel.findOneAndUpdate({_id : req.params.id},{ "$set": { isLoggedIn: false }},{new : true})
            res.status(200).send({
                message : "Logged Out Successfully",
                logout
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in logging out"
        })
    }
}

export default {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUserById,
    logout
}