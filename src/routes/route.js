const express = require('express')
const router = express.Router()
const {registerUser,userLogin} = require("../controller/userController")
const {createBook,getBooks, getBooksParams, updateBook} = require("../controller/bookController")
const{authentication}=require("../middleware/auth")

router.post("/register", registerUser)

router.post("/login", userLogin)

router.post("/createBook",authentication,createBook)

router.get("/books",authentication,getBooks)

router.get("/books/:bookId",authentication, getBooksParams )

router.put("/books/:bookId",authentication, updateBook )

module.exports = router