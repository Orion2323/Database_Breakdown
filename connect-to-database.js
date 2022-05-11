const mysql = require('mysql');

// set up connection to database
const DBConnection = mysql.createConnection({
    host: 'name-of-host',
    user: 'name-of-user',
    password: 'users-password',
    insecureAuth: true,
});

// check whether connection was successful
DBConnection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    connectionSuccessHandler();
});

const connectionSuccessHandler = () => {
    console.log('Connected to database');
    createDatabase();
}

// create a database
const createDatabase = () => {
    DBConnection.query('CREATE DATABASE IF NOT EXISTS db', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("Created Database db");
        createDatabasePromisified();
    });
}

const createDatabasePromisified = async() => {
    const util = require('util');
    const DBQuery = util.promisify(DBConnection.query).bind(DBConnection);

    try {
        // create a database
        const result = await DBQuery('CREATE DATABASE IF NOT EXISTS db');
        console.log("Created Database db");
    } catch (err) {
        console.log(err);
    }

    try {
        // create student table
        const useDatabaseQuery = 'USE db';
        const studentTableQuery = `
        CREATE TABLE IF NOT EXISTS student (
            id INTEGER AUTO_INCREMENT,
            name VARCHAR(30),

            PRIMARY KEY (id)
        )`;

        // create student table
        const courseTableQuery = `
        CREATE TABLE IF NOT EXISTS course (
            id INTEGER AUTO_INCREMENT,
            name VARCHAR(30),

            PRIMARY KEY (id)
        )`;

        await DBQuery(useDatabaseQuery);
        await DBQuery(studentTableQuery);
        await DBQuery(courseTableQuery);

        console.log("Created Tables student and course");

        await Promise.all(
            [
                DBQuery(studentTableQuery),
                DBQuery(courseTableQuery),
            ]
        );

        // insert data into student table
        const insertStudentsQuery = `
            INSERT INTO student (name)
            VALUES
            ('John'),
            ('Jane'),
            ('Mary');
        `;

        // insert data into course table
        const insertCoursesQuery = `
            INSERT INTO course (name)
            VALUES
            ('CS 101'),
            ('MATH 332'),
            ('CS 200');
        `;

        const insertStudentResult = await DBQuery(insertStudentsQuery);
        console.log("Inserted students with result: ", insertStudentResult);
        
        const insertCourseResult = await DBQuery(insertCoursesQuery);
        console.log("Inserted courses with result: ", insertCourseResult);

        const selectStudentQueryResults = await DBQuery('SELECT * FROM student');
        console.log("Selected students with result: ", selectStudentQueryResults);

        const selectCourseQueryResults = await DBQuery('SELECT * FROM course');
        console.log("Selected courses with result: ", selectCourseQueryResults);


        // clear both tables of data
        const deleteStudent = await DBQuery('DELETE FROM student');
        const deleteCourse = await DBQuery('DELETE FROM course');

        //console.log("Deleted students and courses");
        console.log("Closing connection");
        DBConnection.end();
    } catch (err) {
        console.log(err);
    }
}