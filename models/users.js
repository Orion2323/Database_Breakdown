const knex = require('../database/knex');

const USER_TABLE = 'professor_user';

// method that creates a new user in database
const createNewUser = async (name,email,password,salt) => {
    const result = await knex(USER_TABLE).insert({name,email,password,salt});
    return {
        name: name,
        email: email,
        password: password
    }
}

// method that authenticates user
const authenticateUser = async (email,password) => {
    const result = await knex(USER_TABLE).where({email,password});
    return result;
};

// method that checks for any user with email
const findUserByEmail = async (email) => {
    const result = await knex(USER_TABLE).where({email});
    return result;
};

module.exports = {
    createNewUser,
    authenticateUser,
    findUserByEmail
}