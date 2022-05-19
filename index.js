const express = require('express');
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require('./routes/users')
const sessionRoutes = require('./routes/session');

// Import middleware
const {createModelMiddleware} = require('./middleware/model-middleware.js');
const {authenticateJWT} = require('./middleware/auth.js');

// Define express app instance
const app = express();
const port = 3000;

app.use(createModelMiddleware);
app.use(bodyParser.json());

// health route to verify that connection to database is active
app.get('/health', (req, res, next) => {
    const responseBody = {
        status: 'up',
        port
    };

    res.json(responseBody);
    next();
});

// define route handlers here
app.use('/session', sessionRoutes);
app.use('/user', userRoutes, authenticateJWT);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});