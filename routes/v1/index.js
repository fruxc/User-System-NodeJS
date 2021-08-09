const routes = require('express').Router();

module.exports = () => {
    routes.get('/self', require('./self')())
    routes.post('/update', require('./update')())
    routes.use('/users', require('./users')())
    routes.post('/changePassword', require('./changePassword')())
    return routes;
}