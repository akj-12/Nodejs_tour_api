const Tour = require('../models/tourModel');

/**
 * Handler
 */
exports.getAllTours = async (req, res) => {
  try {
    // 1. BUILD QUERY
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    /**
     * { difficulty: 'easy', duration: { 'gte': '5' } }
     * { difficulty: 'easy', duration: { '$gte': '5' } }
     */
    let queryStringify = JSON.stringify(queryObj);
    queryStringify = queryStringify.replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );
    queryStringify = JSON.parse(queryStringify);

    // 2. EXECUTE QUERY
    const tours = await Tour.find(queryStringify);

    // 3. SEND RESPONSE
    res.status(200).json({
      status: 'success',
      totalTours: tours.length,
      data: {
        tours
      }
    });
  } catch (error) {
    res.status(400).json({
      message: {
        status: 'fail',
        error: error
      }
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      data: {
        status: 'created',
        message: 'tour is created',
        createdData: newTour
      }
    });
  } catch (error) {
    res.status(400).json({
      message: {
        status: 'fail',
        error: error
      }
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); //Tour.findOne({_id : req.param.id})
    res.status(200).json({
      status: 'success',
      totalTours: tour.length,
      data: {
        tour
      }
    });
  } catch (error) {
    res.status(400).json({
      message: {
        status: 'fail',
        error: error
      }
    });
  }
};

exports.updatetour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }); //Tour.findOne({_id : req.param.id})
    res.status(204).json({
      status: 'success',
      totalTours: tour.length,
      data: {
        tour
      }
    });
  } catch (error) {
    res.status(400).json({
      message: {
        status: 'fail',
        error: error
      }
    });
  }
};

exports.deletetour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      message: {
        status: 'fail',
        error: error
      }
    });
  }
};
