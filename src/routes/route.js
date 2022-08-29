const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const productController= require("../controllers/productController")
const ordercontroller= require("../controllers/orderController")
const UserController= require("../controllers/userController")
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/createUser", commonMW.mid1,UserController.createUser)
 
router.post("/createproduct", productController.createproduct  )

router.post("/createorder", ordercontroller.createorder )




module.exports = router;