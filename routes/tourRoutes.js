const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updatetour,
  deletetour,
  topCheapTourAlias,
  tourStats,
  getMonthlyPlan
} = require('../controllers/tourController');

const router = express.Router();

// params middleware
// router.param('id', checkId);

// alias route
router.route('/top-cheap-tours').get(topCheapTourAlias, getAllTours);

// tour stats
router.route('/tour-stats').get(tourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router
  .route('/')
  .get(getAllTours)
  .post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updatetour)
  .delete(deletetour);

module.exports = router;
