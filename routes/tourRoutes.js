const express = require("express");
const {
  getAllTours,
  createTour,
  getTour,
  updatetour,
  deletetour,
} = require("../controllers/tourController");
const router = express.Router();

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updatetour).delete(deletetour);

module.exports = router;
