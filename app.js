const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userService = require("./services/user")
const auth = require("./middleware/verifyToken")
const routesController = require("./routes/v1")()
const registrationService = require("./services/registration")
const multer = require('multer')
const upload = multer({
    dest: 'uploads/'
})


const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());
app.use('/api/v1', auth.verifyToken, routesController)


app.post('/signup', upload.single('avatar'), function (req, res, next) {
    if (!userService.isUserValid(req.body.email).length) {
        const id = registrationService.insertUser(req.body.name, req.body.email, req.body.mobile, req.body.password, req.file.filename)
        res.status(200).json({
            success: true,
            message: `${req.body.name} has been successfully registered with id ${id}`
        })
    } else {
        res.status(403).json({
            success: false,
            message: "User already registered"
        })
    }
})


app.post('/login', async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const user = userService.isUserValid(email);
    if (user && (await bcrypt.compare(password, user[0].password))) {
        const token = jwt.sign({
                id: user[0].id,
                email
            },
            process.env.SECRET_KEY, {
                expiresIn: "1h",
            }
        );
        res.status(200).json({
            email,
            token
        });
    } else {
        res.status(400).json({
            error: "Email or password is incorrect"
        });
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});