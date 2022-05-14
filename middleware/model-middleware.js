const connectToDatabase = require('../models/connect-to-database.js');
const Student = require('../models/student.js');
const Course = require('../models/course.js');

const createModelMiddleware = async (req, res, next) => {
    console.log('Connecting to database');
    const {DBQuery, disconnect} = await connectToDatabase();

    req.models = {
        student: new Student(DBQuery, disconnect),
        course: new Course(DBQuery, disconnect)
    }

    req.disconnect = disconnect;
    next();
}

const disconnectFromDatabaseMiddleware = (req, res, next) => {
    console.log('Disconnecting from database\n');
    
    req.disconnect();
    next();
}

module.exports = {
    createModelMiddleware,
    disconnectFromDatabaseMiddleware
}