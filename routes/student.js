const express = require('express');
const router = express.Router();

// GET route to show all students
router.get('/', async (req, res, next) => {
    try {
        const allStudents  = await req.models.student.fetchAllStudents();

        // check for errors
        if (allStudents.error == undefined || allStudents.error == null) {
            res.status(200).json(allStudents);
        } else {
            res.status(404).json(allStudents.error);
        }
    } catch (err) {
        res.status(500).json(err);
    }

    next();
});

// GET route to show a student by ID
router.get('/id/:id', async (req, res, next) => {
    try {
        const student = await req.models.student.fetchStudentById(req.params.id);

        // check for errors
        if (student.error == "Input an id") {
            res.status(400).json(student.error);
        } else if (student.error == "Student id not found") {
            res.status(404).json(student.error);
        } else {
            res.status(200).json(student);
        }

    } catch (err) {
        res.status(500).json(err);
    }

    next();
});

// GET route to show a student by name
router.get('/name/:name', async (req, res, next) => {
    try {
        const student = await req.models.student.fetchStudentByName(req.params.name);

        // check for errors
        if (student.error == "Input an id") {
            res.status(400).json(student.error);
        } else if (student.error == "Student name not found") {
            res.status(404).json(student.error);
        } else {
            res.status(200).json(student);
        }
    }  catch (err) {
        res.status(500).json(err);
    }

    next();
});

// POST route to create a student
router.post('/', async (req, res, next) => {
    try {
        const student = await req.models.student.createStudent(req.body.name);

        // check for errors
        if (student.error == undefined || student.error == null) {
            res.status(201).json(student);
        } else {
            res.status(400).json(student.error);
        }
    } catch (err) {
        res.status(500).json(err);
    }

    next();
});

// DELETE route to delete a student
router.delete('/:id', async (req, res, next) => {
    try {
        const student = await req.models.student.deleteStudent(req.params.id);
        
        // check whether student was deleted
        if (student) {
            res.status(204).json("Student deleted");
        } else {
            res.status(404).json("Student not deleted");
        }
    } catch (err) {
        res.status(500).json(err);
    }

    next();
});

module.exports = router;