const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');

const jwtSignInTokenGenerator = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
  });

exports.signup = asyncHandler(async (req, res, next) => {
  /**
   * create user
   */
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });

  /**
   * create JWT token
   */
  const token = jwtSignInTokenGenerator(newUser._id);

  /**
   * send response
   */
  res.status(201).json({
    data: {
      status: 'created',
      message: 'user is created',
      token,
      createdData: newUser
    }
  });
});

exports.signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) check if email and password exits
  if (!email && !password) {
    return next(new ErrorHandler('please provide email and password!', 400));
  }

  // 2) check if user exits and password is correct
  const user = await User.findOne({ email }).select('+password');
  const verifyPassword = await user.verifyPassword(user.password, password); // instance method used

  if (!user || !verifyPassword) {
    return next(new ErrorHandler('Incorrect email or password!'));
  }

  // 3) if everything ok send token to the client
  const token = jwtSignInTokenGenerator(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});
