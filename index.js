const connectToDatabase = require('./connect-to-database');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
app.use(bodyParser.json());
const port = 3000;

// health route to verify that connection to database is active
app.get('/health', (req, res, next) => {
    const responseBody = {
        status: 'up',
        port
    };

    res.json(responseBody);
    next();
});

// GET route that shows all students in database
app.get('/allStudents', async (req, res, next) => {
    try {
        console.log("Running the GET route for all students...");
        const {DBQuery, disconnect} = await connectToDatabase();

        // SQL to get all students
        const results = await DBQuery('SELECT * FROM student');
        disconnect();

        // display results on terminal
        console.log("Results: ", results);
        console.log("Disconnecting from database...\n");
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }

    next();
});

// GET route to get student by ID
app.get('/student/:id', async (req, res, next) => {
    try {
        console.log("Running the GET route for a student by ID...");
        const id = req.params.id;
        const {DBQuery, disconnect} = await connectToDatabase();

        // SQL line to get student by ID
        const results = await DBQuery(`SELECT * FROM student WHERE id = ?`, [id]);
        disconnect();

        // display results on terminal
        console.log("Results: ", results);
        console.log("Disconnecting from database...\n");
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }

    next();
});

// GET route to get student by name
app.get('/student', async (req, res, next) => {
    try {
        console.log("Running the GET route for students by name...");
        const name = req.query.name;

        const {DBQuery, disconnect} = await connectToDatabase();
        let results;
        
        // check if user input a name
        if (name) {
            results = await DBQuery(`SELECT * FROM student WHERE name = ?`, [name]);
        } else {
            results = await DBQuery('SELECT * FROM student');
        }

        disconnect();

        // display results on terminal
        console.log("Results: ", results);
        console.log("Disconnecting from database...\n");
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    } 

    next();
});

// route that creates a new student
app.post('/newStudent', async (req, res, next) => {
    try {
        console.log("Running the POST route for a new student...");
        const payload = req.body;
        const {DBQuery, disconnect} = await connectToDatabase();

        // SQL to create and return new student
        const results = await DBQuery('INSERT INTO student(name) VALUES (?)', [payload.name]);
        const newlyCreatedStudent = await DBQuery('SELECT * FROM student WHERE id = ?', [results.insertId]);
        disconnect();

        // display results on terminal
        console.log("Results: ", newlyCreatedStudent);
        console.log("Disconnecting from database...\n");
        res.status(201).json(newlyCreatedStudent);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }

    next();
});

// route that updates a student's info
app.put('/student/:id', async (req, res, next) => {
    try {
        console.log("Running the PUT route for updating student...");
        const id = req.params.id;
        const payload = req.body;
        const {DBQuery, disconnect} = await connectToDatabase();


        // SQL to update and return student
        const results = await DBQuery('UPDATE student SET name = ? WHERE id = ?', [payload.name, id]);
        const newlyCreatedStudent = await DBQuery('SELECT * FROM student WHERE id = ?', [id]);
        disconnect();

        // display results on terminal
        console.log("Results: ", newlyCreatedStudent);
        console.log("Disconnecting from database...\n");
        res.json(newlyCreatedStudent);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }

    next();
});

// route that deletes student from database
app.delete('/student/:id', async (req, res, next) => {
    try {
        console.log("Running the DELETE route for student...");
        const id = req.params.id;
        const {DBQuery, disconnect} = await connectToDatabase();

        // SQL to delete student
        const results = await DBQuery('DELETE FROM student WHERE id = ?', [id]);
        disconnect();

        // display results on terminal
        console.log("Results: ", results);
        console.log("Disconnecting from database...\n");
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }

    next();
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});