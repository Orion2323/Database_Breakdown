const express = require('express');
const {authenticateWithClaims} = require('../middleware/auth.js');
const router = express.Router();

const UserController = require('../controllers/users');
const CourseController = require('../controllers/course');

const enrollModels = require('../models/enrollment');

// GET route to get user info
router.get('/self',authenticateWithClaims("User"),async (req, res, next) => {
    try {
        const result = await UserController.findUser(req.user.email);

        // check for errors
        if (result.error == undefined) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json(result.error);
        }
    } catch (err) {
        res.status(500).json({message: err.toString()});
    }

    next();
});

// GET route fetches all available courses
router.get('/yourCourses',authenticateWithClaims("User"), async (req, res, next) => {
    try {
        const result = await CourseController.fetchYourCourses(req.user.email);

        // check for errors
        if (result.error == undefined) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json(result.error);
        }
    } catch (err) {
        res.status(500).json({message: err.toString()});
    }

    next();
});

// GET route fetches all courses enrolled by user
router.get('/courseEnrollment',authenticateWithClaims("User"),async (req, res, next) => {
    try {
        //const result = await enrollModels.fetchEnrolledCourses(req.user.email);

        // check for errors
        if (result.error == undefined) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json(result.error);
        }
    } catch (err) {
        res.status(500).json({message: err.toString()});
    }

    next();
});

// POST route to enroll in a course
router.post('/createCourse',authenticateWithClaims("User"),async (req,res,next) => {
    try {
        const result = await CourseController.createNewCourse(req.body.courseName,req.user.email);

        if (result.error != undefined) {
            res.status(result.status).json(result.error);
        } else {
            res.status(201).json(result);
        }
    } catch (err) {
        res.status(500).json({message: err.toString()});
    }

    next();
});

// DELETE route to drop a course
router.delete('/dropCourse',authenticateWithClaims("User"),async (req,res,next) => {
    try {
        const result = await CourseController.dropCourse(req.body.courseName,req.user.email);

        if (result.error != undefined) {
            res.status(result.status).json(result.error);
        } else {
            res.status(204).json();
        }
    } catch (err) {
        res.status(500).json({message: err.toString()});
    }

    next();
});

module.exports = router;