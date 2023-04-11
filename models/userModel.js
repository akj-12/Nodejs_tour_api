const mongoose = require('mongoose');
const validator = require('validator');

/**
 * Schema define
 */
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid emial id']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password']
  }
});

/**
 * Schema to model
 */
const User = mongoose.model('User', userSchema);
module.exports = User;
