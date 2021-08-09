const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken")
const auth = require("./middleware/verifyToken")
const routesController = require("./routes/v1")()
const registrationService = require("./services/registration_service/registration")
const multer = require('multer')
const upload = multer({
    dest: 'uploads/'
})


const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());
app.use('/api/v1', routesController)


app.post('/api/signup', upload.single('avatar'), function (req, res, next) {
    const id = registrationService.insertUser(req.body.name, req.body.email, req.body.mobile, mobile, req.file.filename)
    res.status(200).json({
        success: true,
        message: `${req.body.name} has been successfully registered with id ${id}`
    })
})

app.post('/api/post', auth.verifyToken, function (req, res, next) {
    res.status(200).json({
        message: 'Posted'
    })
})

app.post('/api/login', (req, res, next) => {
    const user = {
        email: "hammad@123.com",
        password: "123123"
    }
    jwt.sign({
        user
    }, 'secretKey', (err, token) => {
        res.json({
            token
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});