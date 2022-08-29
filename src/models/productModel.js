const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    productname: String,
    category:String,
	price:{type:Number, require:true}, //mandatory property
},
	
    
 { timestamps: true });

module.exports = mongoose.model('Newproduct', productSchema) //users
