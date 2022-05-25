const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');

const UserModel = require('../models/users');

// method to check if user is authenticated
const authenticateUser = async (email,password) => {
    // check if email and password is not empty
    if (email == null || email == undefined || email.length == 0) {
        return {
            status: 400,
            error: 'Email is required'
        }
    } else if (password == null || password == undefined || password.length == 0) {
        return {
            status: 400,
            error: 'Password is required'
        }
    }

    // check if user email exists in database
    const userExists = await UserModel.findUserByEmail(email);
    if (userExists.length == 0) {
        return {
            status: 404,
            error: 'User does not exist'
        }
    }

    // create hashed password
    const hashedPassword = await bycrypt.hash(password,userExists[0].salt);

    // check if user password is correct
    const ifUserAuthenticated = await UserModel.authenticateUser(email,hashedPassword);
    if (ifUserAuthenticated.length == 0) {
        return {
            status: 401,
            error: 'Invalid credentials'
        }
    } 

    const token = await createAuthToken(email,"User");
    return token;
}

// method that returns an authentication token
const createAuthToken = async (email,role) => {
    const accessTokenSecret = "secret";
    const ifExists = await UserModel.findUserByEmail(email);

    // check if user exists
    if (!ifExists) {
        return {
            status: 404,
            error: 'User does not exist'
        }
    }

    // check if user is a professor
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
    authenticateUser,
    createAuthToken
}