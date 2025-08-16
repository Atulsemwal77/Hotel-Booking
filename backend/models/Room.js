import mongoose from "mongoose";

const roomSechma = new mongoose.Schema({
    hotel : {type : String, ref: "Hotel", required : true},
    roomType : {type : String , require : true},
    pricePerNight : {type : Number , require : true},
    amenities : {type : Array ,require : true},
    images : [{type : String}],
    isAvailable : {type : Boolean , default : true}
    
} , {
    timestamps : true
})

const Room = mongoose.model("Room" , roomSechma)

export default Room;