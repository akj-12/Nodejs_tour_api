const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// read env var and write into node env
dotenv.config({ path: './config.env' });

/*
uncaught exception rejection like x = 25 but var is not defined
*/
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

/**
 * Database connection
 */
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log(`DATABASE Connected successfully  `))
  .catch(e => console.log(e));

/**
 * server
 */
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

/*
unhandled rejection like DB password incorrect etc
*/
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
