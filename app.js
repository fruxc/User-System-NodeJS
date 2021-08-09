const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken")
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


app.post('/signup', upload.single('avatar'), function (req, res, next) {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const mobile = req.body.mobile
    const avatar = req.file.filename
    const id = registrationService.insertUser(name, email, password, mobile, avatar)
    res.status(200).json({
        success: true,
        message: `User has been successfully registered with id ${id}`
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});