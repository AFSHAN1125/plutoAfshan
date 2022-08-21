const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId

const publisherSchema = new mongoose.Schema({
  
  publishername: String,
  headQuarter: String

}, { timestamps: true });


module.exports = mongoose.model('newPublisher', publisherSchema)