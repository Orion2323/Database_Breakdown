const sessionController = require('../controllers/session.js');
const userController = require('../controllers/users.js');

const express = require('express');
const router = express.Router();

// POST route to verify is user credentials are valid
router.get('/', async (req, res, next) => {
    try {
        const result = await sessionController.authenticateUser(req.body.email,req.body.password);

        // check for errors
        if (result.error != undefined) {
            res.status(result.status).json(result.error);
        } else {
            res.status(200).json({Token: result});
        }
    } catch (err) {
        res.status(500).json({message: err.toString()});
    }

    next();
});

// POST route to create new user account
router.post('/', async (req, res, next) => {
    try {
        const result = await userController.createNewUser(req.body.name,req.body.email,req.body.password);

        // check if result was successful or not
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

module.exports = router;