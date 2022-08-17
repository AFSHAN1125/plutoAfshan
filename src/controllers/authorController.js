const AuthorModel = require("../models/authorModel.js")
const createAuthor= async function(req, res){
    let data = req.body
    let savedAuthorData= await AuthorModel.create(data);
    res.send({msg: savedAuthorData})


}

module.exports.createAuthor=createAuthor;