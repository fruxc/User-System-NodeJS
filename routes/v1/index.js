const routes = require('express').Router();

module.exports = () => {
    routes.use('/users', require('./users')())
    return routes;
}