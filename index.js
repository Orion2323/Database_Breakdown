const express = require('express');
const bodyParser = require('body-parser');

// Import route handlers
const studentRoutes = require('./routes/student');
const courseRoutes = require('./routes/course');

// Import middleware
const {createModelMiddleware, disconnectFromDatabaseMiddleware} = require('./middleware/model-middleware.js');

// Define express app instance
const app = express();
const port = 3000;
app.use(bodyParser.json());

app.use(createModelMiddleware);

// health route to verify that connection to database is active
app.get('/health', (req, res, next) => {
    const responseBody = {
        status: 'up',
        port
    };

    res.json(responseBody);
    next();
});

app.use('/student', studentRoutes);
app.use('/course', courseRoutes);

app.use(disconnectFromDatabaseMiddleware);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});