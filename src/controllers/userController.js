const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//-----------------------------CREATE-USER------------------------------------

const createUser = async function (abcd, xyz) {
  try{
     let data = abcd.body;
     let savedData = await userModel.create(data);
     console.log(abcd.newAtribute);
     xyz.status(201).send({ msg:savedData });
  }catch(err){
    console.log("This is an Error : " , err.message)
    res.status(500).send({msg :"SERVER ERROR" , error :err.message})
  }
  
};   

//---------------------------------LOG-IN--------------------------------------

const loginUser = async function (req, res) {
  try{
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId:userName, password:password });
    if (!user)
       return res.status(404).send({
       status:false,  
       msg:"username or the password is not corerct",
    })

    let token = jwt.sign(
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

const getUserData = async function (req, res) {
   try{
    let userId = req.params.userId;
    let userDetails = awaituserModel.findById(userId);
    
    if (!userDetails)     
      return res.status(404).send({ status:false, msg:"No User found" });
  
    res.status(404).send({ status:true, data:userDetails });
   }catch(err){
    console.log("There is an error : " , err.message)
    res.status(500).send({msg :"SERVER ERROR ", error :err.message})
   }
  
};

// --------------------------------UPDATE USER-----------------------------------------

const updateUser = async function (req, res) {
  
  try{
    let userId = req.params.userId;

    let user = awaituserModel.findById(userId);
  
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.status(404).send("No such user exists");
    }
    
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id:userId }, userData);
    res.send({ status:true, data:updatedUser });
  }catch(err){
    console.log("There is an error : " , err.message)
    res.status(500).send({msg :"SERVER ERROR ", error :err.message})
   }
  
  }
 
//--------------------------------POST MESSAGE-------------------------------

const postMessage = async function(req , res){
 
  try{
    let message = req.body.message

  let userId = req.params.userId;

  let user = awaituserModel.findById(userId);

  //Return an error if no user with the given id exists in the db
  if (!user) {
    returnres.status(404).send("No such user exists");
  }
  
  // adding the post to valid usrer

  let updatedPost = user.posts

  updatedPost.push(message)

  let updatedUser = await userModel.findOneAndUpdate({_id :userId} , {posts :updatedPost} , {new :true})

  return res.send({status :true , data :updatedUser})

  }catch(err){
    console.log("There is an error : " , err.message)
    res.status(500).send({msg :"SERVER ERROR ", error :err.message})
   }
  
}
// --------------------------------DELETED USER------------------------------

const deleteUser = async function(req , res){
 try{
  let userId = req.params.userId;

  let user = awaituserModel.findById(userId);

  if (!user) {
    return res.send("No such user exists");
  }  
    let newData = user.isDeleted.toString() 

    if(newData == "false"){
        return res.send("Can not delete")
    }else{  
        let updatedUser = await userModel.findByIdAndUpdate({_id :userId})
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
