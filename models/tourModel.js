const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

// schema define
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'A tour must have name'],
      trim: true,
      // only for strings
      maxlength: [40, 'A tour must have less or equal to 40 chars'],
      minlength: [5, 'A tour must have less or equal to 40 chars']
      // validate: [validator.isAlpha, 'A tour name must only contain character'] // validator libraray used
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size.']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      // only for strings
      enums: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Value of difficulty must be easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      // only for strings as well as number
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below or equal to 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have price']
    },
    priceDiscount: {
      type: Number,
      // custom validator
      validate: {
        validator: function(val) {
          // this only points to current doc on new document creation (not on update)
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be low than regular price'
      }
    },
    rating: {
      type: Number,
      default: 4.5
    },
    summary: {
      type: String,
      trim: true, //only work for string
      required: [true, 'A tour must have summary']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date],
    slug: String,
    secreteTour: {
      type: Boolean,
      default: false
    }
  },
  { toJSON: { virtuals: true } },
  { toObject: { virtuals: true } }
);

// virtuals that do not store in DB but avaialble in res after computation
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

/**
 * DOCUMENT MIDDLEWARE
 */
// this middleware will call before save document in DB not on update
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// this middleware will call after save document in DB not on update
tourSchema.post('save', function(doc, next) {
  console.log('Document Created !');
  next();
});

/**
 * QUERY MIDDLEWARE
 */
tourSchema.pre(/^find/, function(next) {
  this.find({ secreteTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

/* 
AGGREGATION MIDDLEWARE
*/
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});

// schema -> model
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
