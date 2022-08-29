const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
constcommonMids = require("../CommonMiddlewares/commonMids")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", userController.getUserData)

router.put("/users/:userId", userController.updateUser)

// deleted user

router.delete("/users/:userId" ,commonMids.Auth ,  userController.deleteUser)




module.exports = router;