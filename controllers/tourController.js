const fs = require("fs");

/**
 * Handler
 */
// reading tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    totalTours: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = (req, res) => {
  res.status(200).json({
    status: "created",
    totalTours: tours.length,
    data: {
      message: "tour is created",
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((e) => e.duration === id);
  res.status(200).json({
    status: "success",
    totalTours: tour.length,
    data: {
      tour,
    },
  });
};

exports.updatetour = (req, res) => {
  res.status(200).json({
    status: "updated",
    totalTours: tours.length,
    data: {
      message: "tour is updated",
    },
  });
};

exports.deletetour = (req, res) => {
  res.status(200).json({
    status: "deleted",
    totalTours: tours.length,
    data: {
      message: "tour is deleted",
    },
  });
};
