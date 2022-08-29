constjwt = require("jsonwebtoken");
constuserModel = require("../models/userModel");

/*
  Read all the comments multiple times to understand why we are doing what we are doing in login api and getUserDataapi
*/
constcreateUser = asyncfunction (abcd, xyz) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  letdata = abcd.body;
  letsavedData = awaituserModel.create(data);
  console.log(abcd.newAtribute);
  xyz.send({ msg:savedData });
};

//---------------------------------LOG-IN--------------------------------------

constloginUser = asyncfunction (req, res) {
  letuserName = req.body.emailId;
  letpassword = req.body.password;

  letuser = awaituserModel.findOne({ emailId:userName, password:password });
  if (!user)
    returnres.send({
      status:false,
      msg:"username or the password is not corerct",
    });  
    
// --------------------------------TOKEN----------------------------------------------

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret (This is basically a fixed value only set at the server. This value should be hard to guess)
  // The same secret will be used to decode tokens 
  
  lettoken = jwt.sign(
    {
      userId:user._id.toString(),
      batch:"plutonium",
      organisation:"FunctionUp",
    },
    "functionup-plutonium-very-very-secret-key"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status:true, token:token });
};

// --------------------------GET-USER-DATA-----------------------------------------

constgetUserData = asyncfunction (req, res) {
 
    lettoken = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    //If no token is present in the request header return error. This means the user is not logged in.
    if (!token) returnres.send({ status:false, msg:"token must be present" });
  
    console.log(token);
  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself

  // Decoding requires the secret again. 
  // A token can only be decoded successfully if the same secret was used to create(sign) that token.
  // And because this token is only known to the server, it can be assumed that if a token is decoded at server then this token must have been issued by the same server in past.
  letdecodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
  if (!decodedToken)
    returnres.send({ status:false, msg:"token is invalid" });

  letuserId = req.params.userId;
  letuserDetails = awaituserModel.findById(userId);
  if (!userDetails)
    returnres.send({ status:false, msg:"No such user exists" });

  res.send({ status:true, data:userDetails });
  // Note: Try to see what happens if we change the secret while decoding the token
};

// --------------------------------UPDATE USER-----------------------------------------

constupdateUser = asyncfunction (req, res) {
  // Do the same steps here:
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases

  letuserId = req.params.userId;
  letuser = awaituserModel.findById(userId);

  //Return an error if no user with the given id exists in the db
  if (!user) {
    returnres.send("No such user exists");
  }

  letuserData = req.body;
  letupdatedUser = awaituserModel.findOneAndUpdate({ _id:userId }, userData);
  res.send({ status:true, data:updatedUser });
};

// --------------------------------DELETED USER------------------------------

constdeleteUser = asyncfunction(req , res){
    letuserId = req.params.userId
    letuser = awaituserModel.findById(userId)

    if(!user){
        returnres.send("doesn't exist")
    }
    letnewData = user.isDeleted.toString() 

    if(newData == false){
        returnres.send("Can not delete")
    }else{  
        letupdatedUser = awaituserModel.findByIdAndUpdate({_id :userId})
        res.send({status :true , msg :"details are deleted"})
    }

}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser
