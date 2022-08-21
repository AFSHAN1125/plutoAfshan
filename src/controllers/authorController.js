const AuthorModel= require("../models/authorModel")

const createAuthor = async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}

const allBooks =async function(req ,res){
    let autherAllBooks = await AuthorModel.find()
    res.send({data : autherAllBooks})


}
module.exports.createAuthor= createAuthor
module.exports.allBooks=allBooks