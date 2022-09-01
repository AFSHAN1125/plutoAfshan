const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authenticate = function(req, res, next) {
       
  //check if token is present
  //check if the token is valid
//    console.log(req.headers)
  let token = req.headers['x-auth-token']

  console.log(token)

  if(!token) return res.send({status :false , msg :"token is not present"})

  let decodedToken = jwt.verify(token , 'functionup-plutonium-very-very-secret-key')

  if(!decodedToken) return res.send({status :false , msg :"token is not valid"})

    next();
    
}   

const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request

  let token = req.headers['x-auth-token']

  if(!token) return res.send({status :false , msg :"token is not present"})

    
  let decodedToken = jwt.verify(token , 'functionup-plutonium-very-very-secret-key')

  if(!decodedToken) return res.send({status :false , msg :"token is not valid"})

  let userToBeModified = req.params.userId

  let userLoggedIn = decodedToken.userId

  //checking if the logged-in user has only posted not others are allowed

  if(userToBeModified !=  userLoggedIn) returnres.send({status :false , msg :"user not exist"})

    next()
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise

