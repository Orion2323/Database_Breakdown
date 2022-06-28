const mysql = require('mysql');

// set up connection to database
const DBConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    insecureAuth: true,
});

// check whether connection was successful
DBConnection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Connected to database');
    createDatabasePromisified();
});

// create database asynvhronously
const createDatabasePromisified = async() => {
    const util = require('util');
    const DBQuery = util.promisify(DBConnection.query).bind(DBConnection);

    try {
        // create a database
        const result = await DBQuery('CREATE DATABASE IF NOT EXISTS db');
        console.log("Created Database db with promise");
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

        // insert student data into variable
        const insertStudentsQuery = `
            INSERT INTO student (name)
            VALUES
            ('John'),
            ('Jane'),
            ('Mary');
        `;

        // insert course data into variable
        const insertCoursesQuery = `
            INSERT INTO course (name)
            VALUES
            ('CS 101'),
            ('MATH 332'),
            ('CS 200');
        `;

        // insert student data into student table and see result
        const insertStudentResult = await DBQuery(insertStudentsQuery);
        console.log("\nInserted students with result: ", insertStudentResult);
        
        // insert course data into course table and see result
        const insertCourseResult = await DBQuery(insertCoursesQuery);
        console.log("\nInserted courses with result: ", insertCourseResult);

        // select all data from student table
        const selectStudentQueryResults = await DBQuery('SELECT * FROM student');
        console.log("\nSelected students with result: ", selectStudentQueryResults);

        // select all data from course table
        const selectCourseQueryResults = await DBQuery('SELECT * FROM course');
        console.log("\nSelected courses with result: ", selectCourseQueryResults);

        // clear both tables of data
        const deleteStudent = await DBQuery('DELETE FROM student');
        const deleteCourse = await DBQuery('DELETE FROM course');

        console.log("Closing connection");
        DBConnection.end();
    } catch (err) {
        console.log(err);
    }
}