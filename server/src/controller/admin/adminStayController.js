import HotelsModel from "../../models/hotelsModel.js"

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

export default {
    getStayById,
    addStay,
    updateStay,
    deleteStay
}