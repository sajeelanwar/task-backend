const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]

    if (!token) { return res.status(401).json({ message: "Unauthorized or access token missing", isError: true }) }

    jwt.verify(token, "secretkey", async (error, result) => {
        if (!error) {
            req.uid = result.uid
            next()
        } else {
            console.error(error)
            res.status(401).json({ message: "Unauthorized or user doesn't have access", isError: true })
        }
    })

}

module.exports = { verifyToken }