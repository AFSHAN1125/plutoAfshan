const userModel = require("../models/userModels");
const bookModel = require("../models/bookModels");
const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose");

const {
    isValidName,
    isValidRating,
    isValidDate
} = require("../validation/validator");



const createReview = async function (req, res) {

    try {

        let BookId = req.params.bookId
        let data = req.body

        let { bookId, reviewedBy, reviewedAt, rating, reviews } = data

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

        if (!reviewedBy) {
            return res
                .status(400)
                .send({ status: false, message: "reviewedBy is required" });
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
                .send({ status: false, message: "Enter valid rating" });
        }


        if (!isValidName(reviews)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter valid reviews" });
        }

        let createReview = await reviewModel.create(data)

        let responseData= {_id: createReview._id, bookId:createReview.bookId, reviewedBy: createReview.reviewedBy, reviewedAt: createReview.reviewedAt, rating: createReview.rating, reviews: createReview.reviews}

        return res.status(201).send({ status: false, message: "Success", data: responseData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }

}

module.exports = { createReview }