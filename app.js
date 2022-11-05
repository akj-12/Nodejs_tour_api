const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');
const ErrorHandler = require('./utils/errorHandler');

const app = express();

/**
 * 1. Middleware
 */
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

/**
 * 2. Routes
 */
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

/**
 * Route error handler
 */
app.all('*', (req, res, next) => {
  //   const err = new Error(`Can't find ${req.originalUrl} on this server !`);
  //   err.statusCode = 404;
  //   err.status = 'fail';
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server !`, 404));
});

// error handler middleware
app.use(errorHandler);
module.exports = app;
