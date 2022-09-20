//---------------------------------------importing modules--------------------------------------------
const mongoose = require("mongoose")

//----------------------------------------Creating Schema---------------------------------------------

const userSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true,
        enum:["Mr","Mrs","Miss"] ,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true

    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: Boolean,
        default: false,
        unique: true

    },
    password:{
        type: String,
        required:true
    },
    address:{
        street: string,
        city: String,
        pincode: String
    },
    

     
 },{ timestamps: true });


//---------------------------------- exporting all the model here--------------------------------------

module.exports = mongoose.model("User", userSchema);


    // title: {string, mandatory, enum[Mr, Mrs, Miss]},
    // name: {string, mandatory},
    // phone: {string, mandatory, unique},
    // email: {string, mandatory, valid email, unique}, 
    // password: {string, mandatory, minLen 8, maxLen 15},
    // address: {
    //   street: {string},
    //   city: {string},
    //   pincode: {string}
    // },
    // createdAt: {timestamp},
    // updatedAt: {timestamp}
  