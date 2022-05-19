const userModel = require('../models/users');
const jwt = require('jsonwebtoken');

// method that returns an authentication token
const createAuthToken = async (email,role) => {
    const accessTokenSecret = "secret";
    const ifExists = await userModel.findUserByEmail(email);

    // check if user exists
    if (!ifExists) {
        return {
            status: 404,
            error: 'User does not exist'
        }
    }

    // check if user is a student
    if (role != "User") {
        return {
            status: 401,
            error: 'Invalid role'
        }
    }

    // code executes if no errors have been found
    const token = jwt.sign({...ifExists[0],claims:["User"]},accessTokenSecret);
    return token;
}

module.exports = {
    createAuthToken
}