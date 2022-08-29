const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const orderSchema = new mongoose.Schema( {
    userId: {type:ObjectId, 
     ref:"Newuser"},
	productId: {type:ObjectId,
    ref:"Newproduct"},
	amount: {type:Number, default:0},
	isFreeAppUser: {type:Boolean, default:false},
    date: String
},
	
    
 { timestamps: true });

module.exports = mongoose.model('Neworder', orderSchema) //users
