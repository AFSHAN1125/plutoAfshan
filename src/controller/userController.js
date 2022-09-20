const userModel = require("../models/userModels");

const {
  isValidName,
  isValidPassword,
  isValidEmail,
  isValidTitle,
  isValidMobileNo,
  isValidPincode
} = require("../validation/validator");

const registerUser = async function (req, res) {
  try {
    const data = req.body;

    const { title, name, phone, email, password, address } = { ...data };
    const { street, city, pincode } = { ...address };

    if (!title) {
      return res
        .status(400)
        .send({ status: false, message: "title is required" });
    }

    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "title is required" });
    }

    if (!phone) {
      return res
        .status(400)
        .send({ status: false, message: "title is required" });
    }

    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "title is required" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "title is required" });
    }

    if (!isValidTitle(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid title" });
    }

    if (!isValidName(name)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid name" });
    }

    if (!isValidMobileNo(phone)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid phone number" });
    }

    const isPhoneAlreadyUsed = await userModel.findOne({ phone });

    if (isPhoneAlreadyUsed) {
      return res
        .status(400)
        .send({ status: false, message: "phone already exist" });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid email" });
    }

    const isEmailAlreadyUsed = await userModel.findOne({ email });

    if (isPhoneAlreadyUsed) {
      return res
        .status(400)
        .send({ status: false, message: "email already exist" });
    }

    if (!isValidPassword(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid password (min-8,max-15, contains atleast one num and symbol each, Have a mixuture of uppercase and lowercase letters)" });
    }

    if (!isValidName(street)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid street" });
    }

    if (!isValidName(city)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid street" });
    }

    if (!isValidPincode(pincode)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid pincode" });
    }

    const createUser = await userModel.create(data);

    res
      .status(201)
      .send({ status: true, message: "Success", data: createUser });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { registerUser };
