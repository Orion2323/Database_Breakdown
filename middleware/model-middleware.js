const User = require('../models/users');

const createModelMiddleware = async (req, res, next) => {
    req.models = {
        user: User
    }

    next();
}

module.exports = {
    createModelMiddleware,
}