import mongoose from "mongoose";

const UserSehema = mongoose.Schema({
    _id : {type : String, reqired : true, },
    username : {type : String, reqired : true, },
    email : {type : String, reqired : true, },
    image : {type : String, reqired : true, },
    role : {type : String, enum :["User" , "HotelOwner"], default : "user" },
    recentSearchedCities : [{type : String, required : true}],


},{
    timestamps : true
})
const user = mongoose.model("User" , UserSehema)

export default user