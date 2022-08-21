const { default: mongoose } = require("mongoose")
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")
//  const mongoose = require('mongoose')


const createBook= async function (req, res) {
    
    let authorId = req.body.author
    let publisherId = req.body.publisher
    let isValid = mongoose.Types.ObjectId.isValid(authorId)
    let isValid1 = mongoose.Types.ObjectId.isValid(publisherId)

    if(isValid === false)
{
  return  res.send("invaild id length")
}
else if (isValid1=== false)
{
  return  res.send("invaild id length")
}
let idForAuthor =await authorModel.findById(authorId)
let idForPublisher =await publisherModel.findById(publisherId)
    if(!idForAuthor){
     res.send("authorId is not present")
    }else if (!idForPublisher){
         return res.send("publisherId is not present")

    }else if (!idForAuthor && !idForPublisher){
         return res.send("author is not present put vaild id")

    }else{ 
         let databook = await bookModel.create(req.body )
         res.send({data : databook})
    }
}



const getBooksData = async function (req, res) {
    
    let books =  await bookModel.find().populate('author').populate('publisher')    
   res.send({ data: books })
}

const getBooksWithAuthorDetails = async function (req, res) {
   
     let data =   await publisherModel.find({name : ["Penguin","HarperCollins"]}).select({_id : 1})
     let bookid = await bookModel.updateMany({ publisher : data },{ $set : {isHardCover : true , new : true }},{upsert : true})

     let authorIds = await authorModel.find( { ratings : { $gt : 3.5 }}).select({_id : 1})
     let rating1 = await bookModel.updateMany({author : authorIds }, { $inc : {price :10 }},{upsert : true})
  
     res.send({ data: bookid , rating1})
}
module.exports.createBook= createBook
module.exports.getBooksWithAuthorDetails= getBooksWithAuthorDetails
module.exports.getBooksData=getBooksData





