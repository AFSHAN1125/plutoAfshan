const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// const token = asyncfunction(req , res){
// try {
  
//   next()

// } catch (err) {
//    res.status(201).send(error.message)
// }
// }

const authenticate = function(req, res, next) {
  try{
     
    let token = req.headers['x-auth-token']

    console.log(token)

    if(!token) return res.send({status :false , msg :"token is not present"})

    let decodedToken = jwt.verify(token , 'functionup-plutonium-very-very-secret-key')

    if(!decodedToken) returnres.send({status :false , msg :"token is not valid"})

    next();
  }catch(err){
    console.log("There is an error : " , err.message)
    res.status(500).send({msg :"SERVER ERROR ", error :err.message})
   }
  
    
}   

const authorise = function(req, res, next) {
    
  try{
    
  let token = req.headers['x-auth-token']

  if(!token) returnres.send({status :false , msg :"token is not present"})

    
  let decodedToken = jwt.verify(token , 'functionup-plutonium-very-very-secret-key')

  if(!decodedToken) returnres.send({status :false , msg :"token is not valid"})

  let userToBeModified = req.params.userId

  let userLoggedIn = decodedToken.userId

  //checking if the logged-in user has only posted not others are allowed

  if(userToBeModified !=  userLoggedIn) returnres.status(404).send({status :false , msg :"user not found"})

    next()
  }catch(err){
    console.log("There is an error : " , err.message)
    res.status(500).send({msg :"SERVER ERROR ", error :err.message})
   }

}

module.exports.authenticate = authenticate
module.exports.authorise = authorise
// module.exports.token = token

