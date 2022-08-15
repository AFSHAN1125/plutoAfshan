const userModel =require("../models/userModel")
const createBook= async function (req, res) {
    let  data= req.body
    let savedData= await userModel.create(data)
    res.send({msg:savedData})
}

const getBooksData = async function (req, res) {
    let allBooks = await userModel.find()
    res.send({msg:allBooks})
}



module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
