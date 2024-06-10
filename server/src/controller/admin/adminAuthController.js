import hashPwd from "../../middleware/hashPwd.js"
import UserAuthModel from "../../models/userAuthModel.js"
import auth from "../../middleware/auth.js"

const register = async(req,res) => {
    try {
        const {email, password} = req.body
        const checkUserEmail = await UserAuthModel.findOne({email : email})
        if(!checkUserEmail){
            req.body.password = await hashPwd.createHash(password)
            const newUser = await UserAuthModel.create(req.body)
            const adminStatus = await UserAuthModel.findOneAndUpdate({email : email},{$set : {isAdmin : true}},{new : true})
            res.status(200).send({
                message : "Admin created successfully",
                newUser
            })
        }  else{
            res.status(400).send({
                message : `Admin with ${req.body.email} already exists`
            })
        }      
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in Admin registeration"
        })
    }
}

const login = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await UserAuthModel.findOne({email : email})
        if(user){
            if(await hashPwd.hashCompare(password,user.password)){
                const adminLoginToken = await auth.createLoginToken({
                    id : user._id,
                    name : `${user.firstName} ${user.lastName}`,
                    firstName: user.firstName,
                    lastName : user.lastName,
                    email:user.email,
                    isLoggedIn : user.isLoggedIn,
                    isAdmin : user.isAdmin
                })
                await UserAuthModel.findOneAndUpdate({email : email},{$set : {isLoggedIn : true}})
                res.status(200).send({
                    message : "Login Successful",
                    adminLoginToken,
                    id:user._id,
                    isAdmin : user.isAdmin
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

const logout = async(req,res) => {
    try {
        const user = await UserAuthModel.findOne({_id : req.params.id})
        if(user){
            let logout =  await UserAuthModel.findOneAndUpdate({_id : req.params.id},{ "$set": { isLoggedIn: false }},{new : true})
            res.status(200).send({
                message : "Logged Out Successfully"
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
    logout
}