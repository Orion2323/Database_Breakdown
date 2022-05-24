const knex = require('../database/knex');
const bycrypt = require('bcrypt');

const USER_TABLE = 'student_user';

// method that creates a new user in database
const createNewUser = async (name,email,password) => {
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

    // check if user already exists
    const ifExists = await findUserByEmail(email); 
    if (ifExists.length > 0) {
        return {
            status: 409,
            error: 'User already exists'
        }
    }

    // code executes if no errors have been found
    // create salt and hashed password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const result = await knex(USER_TABLE).insert({name,email,password: hashedPassword,salt});
    return {
        name: name,
        email: email,
        password: password
    }
}

// method that authenticates user
const authenticateUser = async (email, password) => {
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

    const users = await findUserByEmail(email);

    // check if there are any users with given email
    if (users.length == 0) {
        return {
            status: 404,
            error: 'User not found'
        }
    }

    const hashedPassword = await bycrypt.hash(password,users[0].salt);

    // check if given password matches with stored password
    if (hashedPassword == users[0].password) {
        return "User authenticated";
    } else {
        return {
            status: 401,
            error: 'Invalid password'
        }
    }
};

// method that checks for any user with email
const findUserByEmail = async (email) => {
    // check if email var is not empty
    if (email == null || email == undefined || email.length == 0) {
        return {
            status: 400,
            error: 'Email is required'
        }
    }

    // code executes if no errors have been found
    const result = await knex(USER_TABLE).where({email});
    return result;
};

module.exports = {
    createNewUser,
    authenticateUser,
    findUserByEmail
}