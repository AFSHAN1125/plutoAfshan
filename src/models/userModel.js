const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema( {
    bookName :String ,
    authorName :String,
    category : {
       type :String ,
       enum :[  "LOVESTORY", "FICTION", "NON-FICTION"]
    },
    year :Number

  },
{timestamps:true });

module.exports = mongoose.model('user' ,booksSchema )

