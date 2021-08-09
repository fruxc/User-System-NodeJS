const fs = require("fs");

var users = ''
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
    const user = users.filter((eachUser) => eachUser.id == id)
    return user;
}


module.exports = {
    getAllUsers,
    getUser,
}