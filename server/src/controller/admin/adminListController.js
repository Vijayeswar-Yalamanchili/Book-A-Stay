import HotelsModel from "../../models/hotelsModel.js"

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

export default {
    getTypesList,
    getHotelsList,
    getVillasList,
    getResortsList,
    getCottagesList,
    getCabinsList
}