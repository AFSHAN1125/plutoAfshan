const userModel = require("../models/userModels");
const bookModel = require("../models/bookModels");
const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose");

const {
  isValidtitle,
  isValidexcerpt,
  isValiduserId,
  isValidISBN,
  isValidcategory,
  isValidsubCategory,
  isValidreviews,
} = require("../validation/validator");

///////==================================================  Creating Book =================================================================/////////
const createBook = async function (req, res) {
  try {
    let data = req.body;
    let { title, excerpt, userId, ISBN, category, subcategory } = data;

    if (!title) {
      return res
        .status(400)
        .send({ status: false, message: "title is required" });
    }
    if (!excerpt) {
      return res
        .status(400)
        .send({ status: false, message: "excerpt is required" });
    }
    if (!userId) {
      return res
        .status(400)
        .send({ status: false, message: "userId is required" });
    }
    if (!ISBN) {
      return res
        .status(400)
        .send({ status: false, message: "ISBN is required" });
    }
    if (!category) {
      return res
        .status(400)
        .send({ status: false, message: "category is required" });
    }
    if (!subcategory) {
      return res
        .status(400)
        .send({ status: false, message: "subCategory is required" });
    }


    let saveddata = await bookModel.create(data);

    return res
      .status(201)
      .send({ status: true, message: "success", data: saveddata });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};




//////////=============================================== fetching book details by query ===========================================================/////////////

const getBooks = async function (req, res) {
  try {
    let data = req.query;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide any Query Input" });
    }

    if (req.query.userId) {
      if (!mongoose.isValidObjectId(req.query.userId)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter valid userId" });
      }
    }

    let obj = { isDeleted: false, ...data };

    let books = await bookModel
      .find(obj)
      .select("_id title excerpt userId category releasedAt reviews");

    if (books.length == 0) {
      return res.status(404).send({ status: false, message: "No Book Found" });
    }

    let booksData = books.sort(function (a, b) {
      return a.title - b.title;
    });

    return res
      .status(200)
      .send({ status: true, message: "Book List", data: booksData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};



////===================================================  fetching book details by params (bookId)  ========================================================//////

const getBooksParams = async function (req, res) {
  try {
    let bookId = req.params.bookId;

    if (!mongoose.isValidObjectId(req.params.bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid bookId" });
    }

    const bookData = await bookModel
      .findById({ _id: bookId, isDeleted: false })
      .select({ ISBN: 0 });

    if (!bookData) {
      return res.status(404).send({ status: false, message: "Book not exist" });
    }
    let bookDetails = bookData.toObject();

    const reviewData = await reviewModel.find({
      bookId: bookId,
      isDeleted: false,
    });

    let data = { ...bookDetails, review: reviewData };

    return res
      .status(200)
      .send({ status: true, message: "Book List", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

module.exports = { createBook, getBooks, getBooksParams };
