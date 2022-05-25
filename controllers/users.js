const bycrypt = require('bcrypt');

const UserModel = require('../models/users');

// method to create a new user
const createNewUser = async(name,email,password) => {
    // check if name,email,and password is not empty
    if (name == null || name == undefined || name.length == 0) {
        return {
            status: 400,
            error: 'Name is required'
        }
    } else if (email == null || email == undefined || email.length == 0) {
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
    const ifExists = await UserModel.findUserByEmail(email); 
    if (ifExists.length > 0) {
        return {
            status: 409,
            error: 'User already exists'
        }
    }

    // create salt and hashed password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password,salt);

    // create new user and return account info
    const result = await UserModel.createNewUser(name,email,hashedPassword,salt);
    return result;
}

// method to find user
const findUser = async(email) => {
    // check if email is not empty
    if (email == null || email == undefined || email.length == 0) {
        return {
            status: 400,
            error: 'Email is required'
        }
    }

    // check if user email exists in database
    const result = await UserModel.findUserByEmail(email);
    if (result.length == 0) {
        return {
            status: 404,
            error: 'User does not exist'
        }
    }

    const altResult = {name: result[0].name, email: result[0].email};
    return altResult;
}

module.exports = {
    createNewUser,
    findUser
}
