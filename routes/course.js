const express = require('express');
const router = express.Router();

// GET route to show all courses
router.get('/', async (req, res, next) => {
    try {
        const allCourses  = await req.models.course.fetchAllCourses();

        // check for errors
        if (allCourses.error == undefined || allCourses.error == null) {
            res.status(200).json(allCourses);
        } else {
            res.status(404).json(allCourses.error);
        }
    } catch (err) {
        res.status(500).json(err);
    }

    next();
});

// GET route to show course by id
router.get('/id/:id', async (req, res, next) => {
    try {
        const course = await req.models.course.fetchCourseById(req.params.id);

        // check for errors
        if (course.error == "Input an id") {
            res.status(400).json(course.error);
        } else if (course.error == "Course id not found") {
            res.status(404).json(course.error);
        } else {
            res.status(200).json(course);
        }
    } catch (err) {
        res.status(500).json(err);
    }

    next();
});

// GET route to show course by name
router.get('/name', async (req, res, next) => {
    try {
        const course = await req.models.course.fetchCourseByName(req.body.name);

        // check for errors
        if (course.error == "Input a name") {
            res.status(400).json(course.error);
        } else if (course.error == "Course name not found") {
            res.status(404).json(course.error);
        } else {
            res.status(200).json(course);
        }

    } catch (err) {
        res.status(500).json(err);
    }
    
    next();
});

// POST route to create a course
router.post('/', async (req, res, next) => {
    try {
        const course = await req.models.course.createCourse(req.body.name);

        // check for errors
        if (course.error == "Input a name") {
            res.status(400).json(course.error);
        } else if (course.error == "Course name already exists") {
            res.status(400).json(course.error);
        } else {
            res.status(201).json(course);
        }
    } catch (err) {
        res.status(500).json(err);
    }

    next();
});

// DELETE route to delete a course
router.delete('/:id', async (req, res, next) => {
    try {
        const course = await req.models.course.deleteCourse(req.params.id);

        // check for errors
        if (course) {
            res.status(204).json(course);
        } else {
            res.status(404).json(course.error);
        }
    } catch (err) {
        res.status(500).json(err);
    }

    next();
});

module.exports = router;