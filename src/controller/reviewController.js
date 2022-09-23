const userModel = require("../models/userModels");
const bookModel = require("../models/bookModels");
const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose");

const {
  isValidName,
  isValidRating,
  isValidDate,
} = require("../validation/validator");

const createReview = async function (req, res) {
  try {
    let BookId = req.params.bookId;
    let data = req.body;

    let { bookId, reviewedBy, reviewedAt, rating, review } = data;

    if (!BookId) {
      return res
        .status(400)
        .send({ status: false, message: "bookId is required" });
    }

    if (!bookId) {
      return res
        .status(400)
        .send({ status: false, message: "BookId is required" });
    }

    if (!reviewedAt) {
      return res
        .status(400)
        .send({ status: false, message: "reviewedAt is required" });
    }

    if (!rating) {
      return res
        .status(400)
        .send({ status: false, message: "rating is required" });
    }

    if (!mongoose.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid bookId" });
    }

    if (!mongoose.isValidObjectId(BookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid bookId" });
    }

    if (!isValidName(reviewedBy)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid reviewedBy" });
    }

    if (!isValidDate(reviewedAt)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid reviewedAt" });
    }

    if (!isValidRating(rating)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter rating from 1 to 5" });
    }

    if (!isValidName(review)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid review" });
    }

    if (!data.reviewedBy) {
      data.reviewedBy = "guest";
    }

    let createData = { ...data };

    let createReview = await reviewModel.create(createData);

    let getBook = await bookModel.findOne({ _id: createReview.bookId });

    let updateBook = await bookModel.findOneAndUpdate(
      { _id: createReview.bookId },
      { $set: { reviews: getBook.reviews + 1 } }
    ).select({ __v:0, ISBN: 0});

    let bookDetails = updateBook.toObject();
    let reviewDetails = createReview.toObject();

    let responseData = {
      ...bookDetails,
      reviewData: {
        _id: createReview._id,
        bookId: createReview.bookId,
        reviewedBy: createReview.reviewedBy,
        reviewedAt: createReview.reviewedAt,
        rating: createReview.rating,
        review: createReview.review,
      },
    };

    return res
      .status(201)
      .send({ status: false, message: "Book list", data: responseData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// PUT /books/:bookId/review/:reviewId
// Update the review - review, rating, reviewer's name.
// Check if the bookId exists and is not deleted before updating the review. Check if the review exist before updating the review. Send an error response with appropirate status code like this if the book does not exist
// Get review details like review, rating, reviewer's name in request body.
// // Return the updated book document with reviews data on successful operation. The response body should be in the form of JSON object like this

////==================================================Update Review ========================================================/////

const updateReview = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    let reviewId = req.params.reviewId;
    let { reviews, rating, reviewedBy } = req.body;

    if (!mongoose.isValidObjectId(req.params.bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid bookId" });
    }

    if (!mongoose.isValidObjectId(req.params.reviewId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid reviewId" });
    }

    if (Object.keys(req.body).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide any input to update" });
    }

    const bookData = await bookModel.findOne({ _id: bookId, isDeleted: false }).select({ __v: 0, ISBN:0});

    if (!bookData) {
      return res.status(404).send({ status: false, message: "Book not exist" });
    }

    const updatedReview = await reviewModel
      .findOneAndUpdate(
        { _id: reviewId, bookId: bookId, isDeleted: false },
        {
          $set: {
            reviews: reviews,
            rating: rating,
            reviewedBy: reviewedBy,
            reviewedAt: new Date(),
          },
        },
        { new: true }
      )
      .select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 });

    if (!updatedReview) {
      return res
        .status(404)
        .send({ status: false, message: "Review not exist" });
    }

    let bookDetails = bookData.toObject();

    let reviewData = updatedReview.toObject();

    let responseData = { ...bookDetails, reviewData };

    return res
      .status(200)
      .send({ status: true, message: "book list", data: responseData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

module.exports = { createReview, updateReview };
