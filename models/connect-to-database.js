const mysql = require('mysql');
const util = require('util');

const connectToDatabase = async () => {
    try {
        const DBConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            insecureAuth: true,
            database: 'db'
        });

        const DBCreateConnection = util.promisify(DBConnection.connect).bind(DBConnection);
        await DBCreateConnection();

        const DBQuery = util.promisify(DBConnection.query).bind(DBConnection);
        const disconnect = () => DBConnection.end();
        return {DBQuery, disconnect};
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = connectToDatabase;