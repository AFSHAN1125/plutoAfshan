const userModel = require('../models/userModels');
const bookModel = require('../models/userModels');

const {
    isValidtitle,
    isValidexcerpt,
    isValiduserId,
    isValidISBN,
    isValidcategory,
    isValidsubCategory,
    isValidreviews,
  } = require("../validation/validator");

//----------------------------------Creating Book -----------------------------------------------------------------
const createBook = async function (req, res) {
    try {
        let data = req.body
        let { title, excerpt, userId, ISBN, category, subCategory, reviews } = data;

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
        if (!ISBN ){
            return res
                .status(400)
                .send({ status: false, message: "ISBN is required" });
        }
        if (!category) {
            return res
                .status(400)
                .send({ status: false, message: "category is required" });
        }
        if (!subCategory) {
            return res
                .status(400)
                .send({ status: false, message: "subCategory is required" });
        }
        if (!reviews) {
            return res
                .status(400)
                .send({ status: false, message: "reviews is required" });
        }
        
        let saveddata = await bookModel.create(data)
        
        return res.status(201).send({status: true, message:"success", data: saveddata})
    }
        
        catch (error) {

            res.status(500).send({ status:false, message: error.message })
        
          }
        
        };

        module.exports = {createBook}