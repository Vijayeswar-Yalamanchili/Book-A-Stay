import mongoose from "./indexModel.js"

const ordersSchema = new mongoose.Schema({
    currentUserId : {
        type : String,
        required : true
    },
    hotelId : {
        type : String,
        required : true
    },
    hotelImage : {
        type : String,
    },
    hotelName : {
        type : String
    },
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    receipt : {
        type : String,
        required : true
    },
    currency : {
        type : String,
        required : true
    },
    orderId : {
        type : String,
    },
    paymentId : {
        type : String,
    },
},
{   timestamps : true  },
{   collection : 'orders' })

const OrdersModel = mongoose.model('orders', ordersSchema)

export default OrdersModel