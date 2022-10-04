const fs = require("fs");
const express = require("express");
const router = express.Router();

/**
 * Handler
 */
// reading tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    totalTours: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  res.status(200).json({
    status: "created",
    totalTours: tours.length,
    data: {
      message: "tour is created",
    },
  });
};

const getTour = (req, res) => {
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

const updatetour = (req, res) => {
  res.status(200).json({
    status: "updated",
    totalTours: tours.length,
    data: {
      message: "tour is updated",
    },
  });
};

const deletetour = (req, res) => {
  res.status(200).json({
    status: "deleted",
    totalTours: tours.length,
    data: {
      message: "tour is deleted",
    },
  });
};

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updatetour).delete(deletetour);

module.exports = router;
