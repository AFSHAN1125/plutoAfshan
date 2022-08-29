const ProductModel = require("../models/productModel")

const createproduct = async function (req,res){
let data = req.body
let savedata= await ProductModel.create(data)
res.send({msg:savedata})
} 
 

module.exports.createproduct=createproduct