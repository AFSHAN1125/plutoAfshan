const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    author_id: {type:Number, require:true}, 
    author_name: {type:String}, 
    age: {type:Number},
    address: {type:String},
    
    
    
    
}, { timestamps: true });


module.exports = mongoose.model('author', authorSchema)