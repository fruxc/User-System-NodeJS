const fs = require("fs");
const bcrypt = require("bcrypt");

var users = []
fs.readFile("./database/users.json", "utf8", (err, allUsers) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    users = JSON.parse(allUsers)
});

const getAllUsers = () => {
    return users
}

const getUser = (id) => {
    const user = users.filter((eachUser) => eachUser.id === id)
    return user;
}

const isUserValid = (email) => {
    const user = users.filter((eachUser) => eachUser.email === email)
    console.log(user)
    return user
}


module.exports = {
    getAllUsers,
    getUser,
    isUserValid
}