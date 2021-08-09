const userService = require('../../../services/user')
module.exports = () => {
    return (req, res) => {
        const userId = req.params.id
        const user = userService.getUser(userId)
        let message = ''
        if (user.length > 0) {
            message = user
        } else {
            message = 'User not found'
        }
        res.status(200).json({
            success: true,
            message,
        })
    }
}