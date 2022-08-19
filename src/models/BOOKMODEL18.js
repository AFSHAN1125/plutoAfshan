const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookname: {type:String}, 
    author_id: {type:Number , required:true}, 
    price: {type:Number},
    ratings: {type:Number}
    
    
    
    
}, { timestamps: true });


module.exports = mongoose.model('Booklibrary', bookSchema)