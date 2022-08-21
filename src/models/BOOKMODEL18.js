const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    Bookname: {type:String}, 
    price: Number,
    ratings: {type:Number}
    
    
    
    
}, { timestamps: true });


module.exports = mongoose.model('NewBooks', bookSchema)