import auth from "../middleware/auth.js"
import hashPwd from "../middleware/hashPwd.js"
import UserAuthModel from "../models/userAuthModel.js"
import contactEmailId from '../helper/emailService.js'
import forgotPasswordMail from '../helper/forgotPwdemailService.js'

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
                const loginToken = await auth.createLoginToken({
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
                    loginToken,
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

const forgotPassword = async(req,res) => {
    try {
        const {email} = req.body
        const userEmail = await UserAuthModel.find({email: email})
        if(userEmail){
            req.body.email = await hashPwd.createHash(email)
            let emailToHash = req.body.email
            let hashedEmail = await UserAuthModel.updateOne({emailHash : req.body.email})
            const forgotPassToken = await auth.createForgotPassToken({
                email:userEmail.email,
                _id : userEmail._id
            })
            res.status(200).send({
                message : "Please Check Your Email",
                email: userEmail.email,
                _id : userEmail._id,
                forgotPassToken
            })
            const result = await UserAuthModel.findOneAndUpdate({email:email},{$set : {forgotPassToken : forgotPassToken,emailHash : req.body.email}})
            const getUserData = await UserAuthModel.findById(result._id)
            const emailVerifyURL = `${process.env.BASE_URL}/resetPassword/${getUserData.emailHash}/verify/${getUserData.forgotPassToken}`
            await forgotPasswordMail(email, emailVerifyURL)
        }else{
            res.status(400).send({
                message: "Email Id not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message : "Internal server error in fetching email"
        })
    }
}

const verifyCode = async(req,res) => {
    try {
        const dataToVerify = await UserAuthModel.findOne({emailHash: req.params.id,forgotPassToken: req.params.token})
        if(dataToVerify){
            console.log(dataToVerify)
            await UserAuthModel.findOneAndUpdate({ _id: dataToVerify._id },
                { $set: {  userPassID: "", userPassToken: "" } }
            )
            await UserAuthModel.findOneAndUpdate({ _id: dataToVerify._id },
                { $unset: { userPassID: "", userPassToken: "" } }
            )
            res.status(200).send({
                message : "Email verified Successfully"
            })
        }else{
            res.status(400).send({
                message: "Invalid Link"
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in verifing code"
        })
    }
}

const resetPassword = async(req,res) => {
    try {
        const user = await UserAuthModel.findOne({email : req.body.email})
        if(user){
            req.body.password = await hashPwd.createHash(req.body.password)
            let resetPwd = await UserAuthModel.updateOne({password : req.body.password})
            res.status(200).send({
                message : "Password updated successfully",
                resetPwd
            })
        }else{
            res.status(400).send({
                message : `User with ${req.body.email} doesn't exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in Updating password"
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

const contactEmail = async(req,res) => {
    try {
        const {email} = req.body
        res.status(200).send({
            message : "Thanks for Contacting us, We will revert you back!!!",
        })
        await contactEmailId(email)
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in registering query by email"
        })
    }
}

export default {
    register,
    login,
    forgotPassword,
    verifyCode,
    resetPassword,
    logout,
    contactEmail
}