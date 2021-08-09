const userService = require('../../../services/user')
module.exports = () => {
    return (req, res) => {
        const allUsers = userService.getAllUsers()
        res.status(200).json({
            success: true,
            message: allUsers
        })
    }
}