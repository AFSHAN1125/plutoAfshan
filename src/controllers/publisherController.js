const PublisherModel= require("../models/publisherModel")

const createPublisher= async function (req, res) {
    let publisher = req.body
   
    let publisherCreated = await PublisherModel.create(publisher)
    res.send({data: publisherCreated})
}


const allPublisher= async function (req, res) {
    
   
    let  allPublisherBooks = await PublisherModel.find()
    res.send({data: allPublisherBooks})
}

module.exports.createPublisher= createPublisher
module.exports. allPublisher=  allPublisher