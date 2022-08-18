const { count } = require("console")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}
//  2
const  booksList= async function (req, res) {
let allBooks = await BookModel.find().select({ _id : 0, bookName: 1,author : 1})
  res.send({msg :allBooks})
}

//    3

const  getBooksInYear= async function (req, res) {
    let year =req.params.year
    let allBooks = await BookModel.find().select({ year : {$eq :year}})
    res.send({msg :allBooks})
    }

    //4

    const  getParticularBooks = async function (req, res) {
      
        let allBooks = await BookModel.find()
        res.send({msg :allBooks})
        }


/// 5

const  getXINRBooks= async function (req, res) {

    let allBooks = await BookModel.find({"prices.indianPrice" : { $in : ["100INR","200INR","500INR"]}})
    res.send({msg :allBooks})
    }

    ///6
    
const  getRandomBooks= async function (req, res) {
   
    let allBooks = await BookModel.find({$or:[{stockAvilable :true},{totalPages: {$gt : 500}}]})
    res.send({msg :allBooks})
    }



const getBooksData= async function (req, res) {
    let allBooks= await BookModel.find(   )
    res.send({msg: allBooks})
}

module.exports.createBook= createBook
module.exports.booksList = booksList
module.exports.getBooksInYear = getBooksInYear
module.exports.getParticularBooks =getParticularBooks
module.exports.getXINRBooks =getXINRBooks
module.exports.getRandomBooks =getRandomBooks
module.exports.getBooksData =getBooksData