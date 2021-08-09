const verifyToken = (req, res, next) => {
    const bearerHeaders = req.headers['authorization'];
    if(typeof bearerHeaders !== 'undefined'){

    }else{
        res.sendStatus(403);
    }
}

module.exports = {
    verifyToken
}