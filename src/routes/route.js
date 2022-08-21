const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController= require("../controllers/publisherController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )
router.post("/allBooks", authorController.allBooks  )

router.post("/createBook", bookController.createBook  )
 router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)
 router.get("/getBooksData", bookController.getBooksData)


router.post("/createPublisher",publisherController.createPublisher)
router.post("/allPublisher",publisherController.allPublisher)




module.exports = router;