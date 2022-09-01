const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")

const commonMiddleware = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

try{

    router.post("/users", userController.createUser)

   router.post("/login", userController.loginUser )

//The userIdis sent by front end

router.get("/users/:userId", commonMiddleware.authenticate , commonMiddleware.authorise, userController.getUserData)       

router.post("/users/:userId/posts", commonMiddleware.authenticate , commonMiddleware.authorise, userController.postMessage)       

router.put("/users/:userId", commonMiddleware.authenticate , commonMiddleware.authorise, userController.updateUser)       

router.delete("/users/:userId", commonMiddleware.authenticate , commonMiddleware.authorise, userController.deleteUser)       
  
}catch(err){
    console.log("There is an error : " , err.message)
    res.status(500).send({msg :"SERVER ERROR ", error :err.message})
}

  
module.exports = router;
