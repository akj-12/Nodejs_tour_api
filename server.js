const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// read env var and write into node env
dotenv.config({ path: './config.env' });

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
  .then(() => console.log(`DATABASE Connected successfully  `));

/**
 * server
 */
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
