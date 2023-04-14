const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    validate: [validator.isEmail, 'Please provide valid email id']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    // this will work only create and save not work on update
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Password are not same!'
    }
  }
});

/**
 * Schema Middleare for password encryption
 */
userSchema.pre('save', async function(next) {
  // Only run this function if password is actually modified
  if (!this.isModified('password')) {
    return next();
  }

  // Hash the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete confirmPassword feild
  this.confirmPassword = undefined; // no need for confirm pass
});

/**
 * Instance Method of schema
 */
userSchema.methods.verifyPassword = async function(
  currentPassword,
  userPassword
) {
  return await bcrypt.compare(userPassword, currentPassword);
};

/**
 * Schema to model
 */
const User = mongoose.model('User', userSchema);
module.exports = User;
