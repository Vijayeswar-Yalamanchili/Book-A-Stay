import Orders from "../models/ordersModel.js"
import HotelsModel from "../models/hotelsModel.js"

const getMyOrders = async(req,res) => {
    try {
        const allorders = await Orders.find({currentUserId : req.params.id})
        for (let order of allorders) {
            if (order.hotelId) {
              const hotel = await HotelsModel.findById(order.hotelId);
              if (hotel) {
                order.hotelName = hotel.name;
                order.hotelImage = hotel.hotelImage
                await order.save()
                }
            }
        }
        res.status(200).send({
            allorders
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Getting all stays"
        })
    }
}

const updateOrderDatas = async(req,res) => {
    try {
        const updateOrderData = await Orders.findByIdAndUpdate({_id : req.body.id},{ $set : { orderId : req.body.orderId, paymentId : req.body.paymentId} })
        res.status(200).send({
            updateOrderData
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Internal Server Error in Getting all stays"
        })
    }
}

export default {
    getMyOrders,
    updateOrderDatas
}