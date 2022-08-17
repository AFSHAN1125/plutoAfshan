const mongoose= require('mongoose');


const authorSchema = new mongoose.Schema( {
    author_id:{type:Number , required: true},
    authorname: {type:String},
    age:{type:Number},
    address:{type:String},

}, {  timestamps: true });





module.exports = mongoose.model('author', authorSchema)