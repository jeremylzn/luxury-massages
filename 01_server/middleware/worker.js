const jwt = require("jsonwebtoken");
const User = require("../../00_db/models/user.js");

const worker = async(req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisisasecrettoken')
        const user = await User.findOne({ _id: decoded._id })

        if (!user || user.accessToken != token || !user.role == 2) {
            throw new Error()
        }

        req.token = token
        req.user = user // Add a property 'user' to the request

        next()
    } catch (err) {
        console.log(err)
        res.status(401).send({ error: 'Invalid authorization' })
    }

}

module.exports = worker