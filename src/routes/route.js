const express = require('express');
const router = express.Router();
const BookController= require("../controllers/BOOKCONTROLLER18")
//const AuthorController= require("../controllers/bookController")
// const UserModel= require("../models/userModel.js")
// const UserController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", BookController.createBook)
router.post("/createAuthor",BookController.createAuthor)
 router.get("/getbooklist",BookController.getbooklist)
 router.get("/getauthorprice",BookController.author)
 router.get("/getauthorname",BookController.authorname)


module.exports = router;

