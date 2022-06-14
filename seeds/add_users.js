const random = require('../utils/random-generator.js');

exports.seed = async (knex) => {
    const users = random.n(random.user,10);
    await knex('professor_user').insert(users);
};