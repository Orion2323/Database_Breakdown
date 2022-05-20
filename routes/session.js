const sessionModel = require('../models/session.js');
const express = require('express');
const router = express.Router();

// POST route to create new user account
router.get('/', async (req, res, next) => {
    try {
        const result = await req.models.user.authenticateUser(req.body.email,req.body.password);

        // check if result was successful or not
        if (result.error != undefined) {
            res.status(result.status).json(result.error);
        } else {
            const token = await sessionModel.createAuthToken(req.body.email,"User");
            res.status(200).json({Token: token});
        }
    } catch (err) {
        res.status(500).json({message: err.toString()});
    }

    next();
});

// POST route to verify is user credentials are valid
router.post('/', async (req, res, next) => {
    try {
        const result = await req.models.user.createNewUser(req.body.name,req.body.email,req.body.password);

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