const express = require('express');
const router = express.Router();
const userModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/createBook",UserController.createBook )

router.get("/getBooksData", UserController.getBooksData)

module.exports = router;
