const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
   
    bookname: String,
    authorId: { type :  ObjectId,
        ref : "newAuthor"},
    price :Number,
    ratings : Number,
    publisherId :{type : ObjectId,
    ref : "newPublisher"}
    


}, { timestamps: true });


module.exports = mongoose.model('newBook', bookSchema)
