constjwt = require("jsonwebtoken");
constuserModel = require("../models/userModel");

//-----------------------------CREATE-USER------------------------------------

constcreateUser = asyncfunction (abcd, xyz) {
  try{
     letdata = abcd.body;
     letsavedData = awaituserModel.create(data);
     console.log(abcd.newAtribute);
     xyz.status(201).send({ msg:savedData });
  }catch(err){
    console.log("This is an Error : " , err.message)
    res.status(500).send({msg :"SERVER ERROR" , error :err.message})
  }
  
};   

//---------------------------------LOG-IN--------------------------------------

constloginUser = asyncfunction (req, res) {
  try{
    letuserName = req.body.emailId;
    letpassword = req.body.password;

    letuser = awaituserModel.findOne({ emailId:userName, password:password });
    if (!user)
       returnres.status(404).send({
       status:false,  
       msg:"username or the password is not corerct",
    })

    lettoken = jwt.sign(
      {
        userId:user._id.toString(),
        batch:"plutonium",
        organisation:"FunctionUp",
      },
      "functionup-plutonium-very-very-secret-key"
    );
    console.log(token)
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status:true, token:token });
  
  }catch(err){
    console.log("There is an error : " , err.message)
    res.status(500).send({msg :"SERVER ERROR ", error :err.message})
  }
}
// --------------------------GET-USER-DATA-----------------------------------------

constgetUserData = asyncfunction (req, res) {
   try{
    letuserId = req.params.userId;
    letuserDetails = awaituserModel.findById(userId);
    
    if (!userDetails)     
      returnres.status(404).send({ status:false, msg:"No User found" });
  
    res.status(404).send({ status:true, data:userDetails });
   }catch(err){
    console.log("There is an error : " , err.message)
    res.status(500).send({msg :"SERVER ERROR ", error :err.message})
   }
  
};

// --------------------------------UPDATE USER-----------------------------------------

constupdateUser = asyncfunction (req, res) {
  
  try{
    letuserId = req.params.userId;

    letuser = awaituserModel.findById(userId);
  
    //Return an error if no user with the given id exists in the db
    if (!user) {
      returnres.status(404).send("No such user exists");
    }
    
    letuserData = req.body;
    letupdatedUser = awaituserModel.findOneAndUpdate({ _id:userId }, userData);
    res.send({ status:true, data:updatedUser });
  }catch(err){
    console.log("There is an error : " , err.message)
    res.status(500).send({msg :"SERVER ERROR ", error :err.message})
   }
  
  }
 
//--------------------------------POST MESSAGE-------------------------------

constpostMessage = asyncfunction(req , res){
 
  try{
    letmessage = req.body.message

  letuserId = req.params.userId;

  letuser = awaituserModel.findById(userId);

  //Return an error if no user with the given id exists in the db
  if (!user) {
    returnres.status(404).send("No such user exists");
  }
  
  // adding the post to valid usrer

  letupdatedPost = user.posts

  updatedPost.push(message)

  letupdatedUser = awaituserModel.findOneAndUpdate({_id :userId} , {posts :updatedPost} , {new :true})

  returnres.send({status :true , data :updatedUser})

  }catch(err){
    console.log("There is an error : " , err.message)
    res.status(500).send({msg :"SERVER ERROR ", error :err.message})
   }
  
}
// --------------------------------DELETED USER------------------------------

constdeleteUser = asyncfunction(req , res){
 try{
  letuserId = req.params.userId;

  letuser = awaituserModel.findById(userId);

  if (!user) {
    returnres.send("No such user exists");
  }  
    letnewData = user.isDeleted.toString() 

    if(newData == "false"){
        returnres.send("Can not delete")
    }else{  
        letupdatedUser = awaituserModel.findByIdAndUpdate({_id :userId})
        res.send({status :true , msg :updatedUser})
    }
 }catch(err){
  console.log("There is an error : " , err.message)
  res.status(500).send({msg :"SERVER ERROR ", error :err.message})
 }
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage
module.exports.deleteUser = deleteUser
