

const JWT = require("jsonwebtoken")




const authentication = async function (req, res, next) {
    try {
        let token = req.header('x-api-key')
        if (!token) { return res.status(400).send({ status: false, message: "Token must be present" }) }

        JWT.verify(token, "keep-it-secret-tillThe-endOf-Course", function (error, decodedToken) {
            if (error) {
                 res.status(401).send({ status: false, message: "Invalid Token" })
            } else {
                req.token = decodedToken
                next()
            }
        })


    } catch (error) {
        res.status(500).send({ status: false, message: error.msg })
    }

}

module.exports = { authentication }