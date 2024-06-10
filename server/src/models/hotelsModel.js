import mongoose from "./indexModel.js"

const hotelsSchema = new mongoose.Schema({
    hotelName : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    distance : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    roomPhotos : {
        type : [String]
    },
    hotelPhotos : {
        type : [String]
    },
    aminities : {
        type : [String]
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    detailedDesc : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min : 0,
        max : 10
    },
    rooms: {
        type : [String]
    },
    lowestPrice : {
        type : Number,
        required : true
    },
    featured : {
        type : Boolean,
        required : true
    } ,
    experience : {
        type : String,
        required : false
    },  
},
{   timestamps : true  },
{   collection : 'stays' })

const HotelsModel = mongoose.model('stays', hotelsSchema)

export default HotelsModel