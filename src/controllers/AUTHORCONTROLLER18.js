const authormodel = require ("../models/AUTHORMODEL18")
const createAuthor= async function(req,res){
    let data= req.body
    let savedAuthorData = await authormodel.create(data);
    res.send({msg: savedAuthorData})

}
module.exports.createAuthor=createAuthor;