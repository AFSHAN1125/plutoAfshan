const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    name: {type:String}, 
    author_id: {type:Number , required:true}, 
    price: {type:Number},
    ratings: {type:Number}
    
    
    
    
}, { timestamps: true });


module.exports = mongoose.model('Book1', bookSchema)