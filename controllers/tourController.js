const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

/**
 * Handler
 */
exports.topCheapTourAlias = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFeilds()
      .paginate();

    // 2. EXECUTE QUERY
    const tours = await features.query;

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

exports.tourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: { $toUpper: '$difficulty' }, // this help us grouping by feild
          numOfTours: { $sum: 1 },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          averageRating: { $avg: '$ratingsAverage' },
          averagePrice: { $avg: '$price' },
          numOfratings: { $sum: '$ratingsQuantity' }
        }
      },
      { $sort: { averagePrice: 1 } }
      // { $match: { _id: { $ne: 'EASY' } } }
    ]);
    res.status(200).json({
      status: 'success',
      stats
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

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; // 2021
    const monthlyPlan = await Tour.aggregate([
      { $unwind: '$startDates' },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numOfTours: { $sum: 1 },
          nameOfTours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: { _id: 0 }
      },
      { $sort: { numOfTours: -1 } },
      { $limit: 12 }
    ]);
    res.status(200).json({
      status: 'success',
      monthlyPlan
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
