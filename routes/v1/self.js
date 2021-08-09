const userService = require('../../services/user')
const jwt = require("jsonwebtoken")
module.exports = () => {
    return (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
            const user = userService.getUser(authData.id)
            if (err) {
                res.sendStatus(403)
            } else {
                res.status(200).json({
                    user
                })
            }
        })
    }
}