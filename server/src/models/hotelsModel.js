import mongoose from "./indexModel.js"

const hotelsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    address : {
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
    description : {
        type : String,
        required : true
    },
    lowestPrice : {
        type : Number,
        required : true
    },
    aminities : {
        type : [String]
    },
    rating : {
        type : Number,
        min : 0,
        max : 10
    },
    experience : {
        type : String,
        required : false
    }, 
    featured : {
        type : String,
        required : true
    } , 
    overview : {
        type : String,
        required : true
    },
    hotelImage : {
        type : String,
        // required : true
    },
    roomImages : {
        type : [String],
        // required : true
    },
    rooms : {
        type : [String]
    }
},
{   timestamps : true  },
{   collection : 'stays' })

const HotelsModel = mongoose.model('stays', hotelsSchema)

export default HotelsModel