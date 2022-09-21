const express = require('express')
const router = express.Router()
const {registerUser,userLogin} = require("../controller/userController")
const {createBook} = require("../controller/bookController")

router.post("/register", registerUser)

router.post("/login", userLogin)

router.post("/createBook",createBook)

module.exports = router