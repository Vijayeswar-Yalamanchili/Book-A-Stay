import jwt from 'jsonwebtoken'


//jwt

const createLoginToken = async(payload) => {
    let loginToken = await jwt.sign(payload,process.env.JWT_SECRETKEY_LOGIN,{
        expiresIn : process.env.JWT_EXPIRY_LOGIN
    })
    return loginToken
}

const decodeLoginToken = async(token) => {
    return await jwt.decode(token)
}


//middlewares

//session expiry
const authenticate = async(req,res,next) => {
    // let token = req?.headers?.authorization
    let token  = req?.headers?.authorization?.split(' ')[1]
    // console.log(token)
    if(token){
        let payload = await decodeLoginToken(token)
        let currentTime = +new Date()
        if(Math.floor(currentTime/1000)<payload.exp){
            next()
        }else{
            res.status(402).send({
                message :"Session expired"
            })
        }
    }else{
        res.status(402).send({ 
            message :"Session is no longer available"
        })
    }
}

//mailId based
const getUserEmail = async(req,res,next) => {
    // let token = req?.headers?.authorization
    let token  = req?.headers?.authorization?.split(' ')[1]
    if(token){
        let payload = await decodeLoginToken(token)
        // console.log(payload);
        req.user = payload
        // console.log(req.user.isAdmin)        // o/p : false
        next()        
    }else{
        res.status(500).send({
            message :"Expired Token"
        })
    }
}

//role based
const adminGuard = async(req,res,next) => {
    let token  = req?.headers?.authorization?.split(' ')[1]
    // let token = req?.headers?.authorization
    if(token){
        let payload = await decodeLoginToken(token)
        console.log(payload.isAdmin)
        if(payload.isAdmin === true){
            next()
        }else{
            res.status(401).send({
                message :"Request noted & Only Admins are allowed to perform"
            })
        }        
    }else{
        res.status(500).send({
            message :"Unauthorised access"
        })
    }    
}

export default {
    createLoginToken,
    decodeLoginToken,
    authenticate,
    getUserEmail,
    adminGuard
}