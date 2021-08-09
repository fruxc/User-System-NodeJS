const uuid4 = require('uuid4');
const fs = require('fs');
const id = uuid4();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const insertUser = (name, email, mobile, password, avatar) => {
    password = bcrypt.hashSync(password, 10);
    const user = {
        id: id,
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        avatar: avatar
    }
    fs.readFile('./database/users.json', function (err, data) {
        var json = JSON.parse(data)
        json.push(user)
        fs.writeFile("./database/users.json", JSON.stringify(json), (err, res) => {
            console.log(err)
        })
    })
    return id;
}


module.exports = {
    insertUser,
}