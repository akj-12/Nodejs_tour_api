const express = require("express");
const router = express.Router();

/**
 * Handler
 */
const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "routes not defined",
  });
};

const createUser = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "routes not defined",
  });
};

const getUser = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "routes not defined",
  });
};

const updateUser = (req, res) => {
  res.status(200).json({
    status: "updated",
    message: "routes not defined",
  });
};

const deleteUser = (req, res) => {
  res.status(200).json({
    status: "deleted",
    message: "routes not defined",
  });
};

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
