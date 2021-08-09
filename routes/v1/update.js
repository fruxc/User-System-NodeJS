const userService = require('../../services/user')
const jwt = require("jsonwebtoken")
const fs = require('fs');
const {
    request
} = require('express')
module.exports = () => {
    return (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {
                const prevUser = userService.isUserValid(req.body.email)
                console.log(prevUser)
                requestData = req.body
                const name = requestData.name || prevUser[0].name
                const email = requestData.email || prevUser[0].email
                const mobile = requestData.mobile || prevUser[0].mobile
                const password = prevUser[0].password
                const id = prevUser[0].id
                const user = {
                    id: id,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile,
                }
                fs.readFile('./database/users.json', function (err, data) {
                    var json = JSON.parse(data)
                    json.pop(prevUser)
                    json.push(user)
                    fs.writeFile("./database/users.json", JSON.stringify(json), (err, res) => {
                        console.log(err)
                    })
                })
                res.status(200).json({
                    user
                })
            }
        })
    }
}