// Importing required modules
const express = require('express'); // I import the Express framework
const path = require('path'); // I import the path module
const logger = require('morgan'); // I import the Morgan logger middleware

// Importing routes
const indexRouter = require('./routes/index'); // I import the index router module

// Creating an Express application instance
const app = express(); // I create an Express application

// Setting views directory and view engine
app.set('views', path.join(__dirname, 'views')); // I set the views directory
app.set('view engine', 'ejs'); // I set the view engine to EJS

// Adding middleware for logging and serving static files
app.use(logger('dev')); // I use Morgan middleware for logging
app.use(express.static(path.join(__dirname, 'public'))); // I serve static files from the public directory

// Mounting indexRouter for handling root path
app.use('/', indexRouter); // I use the index router for handling requests to the root path

// Handling 404 errors
app.use(function(req, res, next) {
    const err = new Error('Not Found'); // I create a new error object for 404 errors
    err.status = 404; // I set the status code of the error to 404
    next(err); // I pass the error to the next middleware
});

// Error handling middleware
app.use(function(err, req, res, next) {
  res.locals.message = err.message; // I set the error message in local variables
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // I conditionally set the error details based on the environment

  res.status(err.status || 500); // I set the response status code
  res.render('error'); // I render the error page
});

// Exporting the Express application instance
module.exports = app; // I export the Express application instance for use in other modules
