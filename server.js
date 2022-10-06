const dotenv = require('dotenv');
const app = require('./app');

// read env var and write into node env
dotenv.config({ path: './config.env' });

/**
 * server
 */
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
