const random = new(require('chance'));
const bycrypt = require('bcrypt');

const mixins = {
    user: (options = {}) => {
        // create password,salt, and hashed password
        const password = 'password';
        const salt = bycrypt.genSaltSync(10);
        const hashedPassword = bycrypt.hashSync(password,salt); 
        
        // return newly created user
        return {
            name: random.name(),
            email: random.email(),
            password: hashedPassword,
            salt: salt,
            ...options,
        }
    },
};

random.mixin(mixins);
module.exports = random;