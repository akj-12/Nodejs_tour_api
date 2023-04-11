const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');

exports.signup = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    data: {
      status: 'created',
      message: 'user is created',
      createdData: newUser
    }
  });
});
