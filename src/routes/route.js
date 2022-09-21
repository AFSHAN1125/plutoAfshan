const express = require('express')
const router = express.Router()
const {registerUser,userLogin} = require("../controller/userController")
const {createBook,getBooks} = require("../controller/bookController")
const{authentication}=require("../middleware/auth")

router.post("/register", registerUser)

router.post("/login", userLogin)

router.post("/createBook",createBook)

router.get("/books",authentication,getBooks)

module.exports = router