import mongoose from "./indexModel.js"

const roomsSchema = new mongoose.Schema({
    hotelId : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    maxPeople : {
        type : Number,
        required : true
    },
    roomNumbers: [
        {
            number : Number,
            unAvailableDates : {type : [Date]}
        }
    ] 
},
{   timestamps : true  },
{   collection : 'rooms' })

const RoomsModel = mongoose.model('rooms', roomsSchema)

export default RoomsModel