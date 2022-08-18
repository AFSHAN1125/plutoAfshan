const { count } = require("console")
const BookModel= require("../models/BOOKMODEL18.js")
const AuthorModel= require("../models/AUTHORMODEL18.js")
const authorModel = require("../models/AUTHORMODEL18.js")
const BOOKMODEL18 = require("../models/BOOKMODEL18.js")

//...................................Question-1.................................>>

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}
const createAuthor=async function(req,res) {
    let data =req.body
    let savedAuthorData= await AuthorModel.create(data);
    res.send({msg: savedAuthorData}) 
}
//    Question  2     >>
const booklist= async function(req,res){
    let data= await AuthorModel.findOne({author_name: "Chetan Bhagat"}).select({author_id :1 , _id:0})//data store id of chetan bhagat author object in object form.
    let listofbook= await BookModel.find({author_id: data.author_id})//access author_id from data object which contain author_id.
    res.send({Message:listofbook});
}

//  Question  3  >>
const author= async function(req,res){
    let data=await BookModel.findOneAndUpdate(
        {name:"Two states"},
        {$set: {price:100}},
        {new: true}
    ).select({author_id:1,price:1,_id:0});
    let data1= await AuthorModel.findOne({author_id: data.author_id}).select({author_name:1,_id:0})
    let authorprice= {AuthorName: data1.author_name, price: data.price};
    res.send({authorprice});//
}
//Question4 >>
// const authorname= async function(req,res){
//      let book= await BookModel.find({price: {$gte:50 , $lte:100}}).select({author_id:1,_id:0});
//      let author=await authorModel.find()
//      let array=[]
//      for(let i=0;i<book.length;i++)
//      {
//         for(let j=0;j<author.length;j++)
//         {
//             if(book[i].author_id == author[j].author_id){
//                 array.push(author[j].author_name)
//             }
//         }
//      }
//      res.send(array)
//     }
const authorname= async function(req,res){
    let book= await BOOKMODEL18.find({prices: {$gte:50 , $lte:100}})
        let data= book.map(x=>x.author_id)
        console.log(data)
        let arr=[]
        for (let i= 0 ; i< data.length ; i++){
            let authorname=await authorModel.find({author_id:data[i]}).select({ author_name: 1, _id: 0 });
            arr.push(authorname)
        }
        
        res.send({msg :arr})
    }



module.exports.createBook =createBook;
module.exports.createAuthor=createAuthor;
module.exports.booklist=booklist;
module.exports.author= author;
module.exports.authorname=authorname;