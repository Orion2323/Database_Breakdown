const express = require('express');
const {authenticateWithClaims} = require('../middleware/auth.js');
const router = express.Router();

const enrollModels = require('../models/enrollment');
const courseModels = require('../models/course');

// GET route to get user info
router.get('/self',authenticateWithClaims("User"),async (req, res, next) => {
    try {
        const result = await req.models.user.findUserByEmail(req.user.email);

        // check for errors
        if (result.error == undefined) {
            const altResult = {name: result[0].name, email: result[0].email};
            res.status(200).json(altResult);
        } else {
            res.status(result.status).json(result.error);
        }
    } catch (err) {
        res.status(500).json({message: err.toString()});
    }

    next();
});

// GET route fetches all available courses
router.get('/allCourses',authenticateWithClaims("User"),async (req, res, next) => {
    try {
        const result = await courseModels.fetchAllCourses();

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
router.get('/transcript',authenticateWithClaims("User"),async (req, res, next) => {
    try {
        const result = await enrollModels.fetchEnrolledCourses(req.user.email);

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
router.post('/newCourse',authenticateWithClaims("User"),async (req,res,next) => {
    try {
        const result = await enrollModels.createNewEnrollment(req.user.email,req.body.courseName);

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
        const result = await enrollModels.dropCourse(req.user.email,req.body.courseName);

        if (result.error != undefined) {
            res.status(result.status).json(result.error);
        } else {
            res.status(204);
        }
    } catch (err) {
        res.status(500).json({message: err.toString()});
    }

    next();
});

module.exports = router;