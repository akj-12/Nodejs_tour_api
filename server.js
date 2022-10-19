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

// schema define
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A tour must have name']
  },
  price: {
    type: Number,
    required: [true, 'A tour must have price']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});

// schema -> model
const Tour = mongoose.model('Tour', tourSchema);

// model -> document
const newTour = new Tour({
  name: 'The river camper',
  price: 900
  // rating: 4.9
});
newTour
  .save()
  .then(doc => console.log(doc))
  .catch(err => console.log(`ERROR ${err}`));

/**
 * server
 */
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
